"""Draws every avatar master as SVG, exports lossless WebP layers and thumbnails, and rewrites the manifests.

Run from the repo root:  python3 scripts/avatars/build.py
Needs Pillow and Playwright's Chromium (set PLAYWRIGHT_MODULE / CHROMIUM_PATH if not installed locally).
"""
import hashlib, json, os, subprocess, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from PIL import Image
import art, body, hair, clothes, accessories

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
RIG = os.path.join(ROOT, 'assets', 'avatar-rig-v1')
PUB = os.path.join(ROOT, 'public')
STARTERS = ['hair.starter-boy', 'hair.starter-girl', 'top.starter-blue', 'top.starter-mint',
            'bottom.starter-shorts', 'bottom.starter-jeans', 'shoes.starter-white', 'shoes.starter-navy']
BOY_ONLY = {'hair.starter-boy', 'hair.side-sweep', 'hair.wavy-short', 'hair.tidy-spikes', 'hair.korean-fringe', 'hair.textured-quiff'}
GIRL_ONLY = {'hair.starter-girl', 'hair.pony-tail', 'hair.twist-braids', 'hair.wavy-bob', 'hair.long-waves', 'hair.space-buns',
             'bottom.plum-skirt', 'bottom.pink-pleated-skirt', 'shoes.mary-janes', 'accessory.bow-clip'}
HEAD_WEAR = {'accessory.round-glasses', 'accessory.sun-cap', 'accessory.star-headband', 'accessory.music-headphones',
             'accessory.castle-crown', 'accessory.bucket-hat', 'accessory.bow-clip', 'accessory.beret', 'accessory.cat-ears'}


def items():
    out = {}
    for k, f in hair.STYLES.items(): out[k] = f()
    for k, f in clothes.TOPS.items(): out[k] = {'top': f()}
    for k, f in clothes.BOTTOMS.items(): out[k] = {'bottom': f()}
    for k, f in clothes.SHOES.items(): out[k] = {'shoes': f()}
    for k, f in accessories.ACCESSORIES.items(): out[k] = f()
    # Hair and headwear follow the enlarged chibi head; everything else follows the short body.
    return {k: {plane: art.zoned(text, 'head' if k.startswith('hair.') or k in HEAD_WEAR else 'body')
                for plane, text in planes.items()} for k, planes in out.items()}


def folder(item_id):
    return 'boy' if item_id in BOY_ONLY else 'girl' if item_id in GIRL_ONLY else 'shared'


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f: f.write(text)


def webp(png, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    Image.open(png).convert('RGBA').save(dest, 'WEBP', lossless=True, quality=100, method=6, exact=False)
    data = open(dest, 'rb').read()
    return hashlib.sha256(data).hexdigest(), len(data)


def merged_bbox(pngs):
    im = Image.new('RGBA', (768, 1280))
    for p in pngs: im.alpha_composite(Image.open(p).convert('RGBA'))
    return im.getbbox()


def thumbnail(layers, dest, size, base=None):
    # Back hair sits behind the mannequin head, front layers on top of it.
    pngs = [p for _, p in layers]
    im = Image.new('RGBA', (768, 1280))
    for p in [p for plane, p in layers if plane == 'behind-body']: im.alpha_composite(Image.open(p).convert('RGBA'))
    if base:
        im.alpha_composite(Image.open(base).convert('RGBA'))
    for p in [p for plane, p in layers if plane != 'behind-body']: im.alpha_composite(Image.open(p).convert('RGBA'))
    l, t, r, b = merged_bbox(pngs + ([base] if base else []))
    side = int(max(r - l, b - t) * 1.12)
    cx, cy = (l + r) // 2, (t + b) // 2
    canvas = Image.new('RGBA', (side, side))
    canvas.alpha_composite(im.crop((cx - side // 2, cy - side // 2, cx - side // 2 + side, cy - side // 2 + side)))
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    canvas.resize((size, size), Image.LANCZOS).save(dest, 'WEBP', lossless=True, quality=100, method=6)


def main():
    tmp = tempfile.mkdtemp()
    layers = []  # (id, kind, plane, svg_path, url)
    for g in ('boy', 'girl'):
        p = os.path.join(RIG, f'body-{g}.svg'); write(p, body.body(g))
        layers.append((f'body-{g}', 'body', 'body', p, f'/avatars/v1/bodies/{g}/base.webp'))
    for item_id, planes in items().items():
        key = folder(item_id)
        for plane, text in planes.items():
            side = 'back' if plane == 'behind-body' else 'front'
            if item_id in STARTERS:
                assert side == 'front', item_id
                p = os.path.join(RIG, f'{item_id}.svg')
            else:
                p = os.path.join(RIG, 'cosmetics', item_id, key, f'{side}.svg')
            write(p, text)
            layers.append((item_id, 'starter' if item_id in STARTERS else 'item', plane, p, f'/avatars/v1/items/{item_id}/{key}/{side}.webp'))
    jobs = [[p, os.path.join(tmp, f'{i}.png')] for i, (_, _, _, p, _) in enumerate(layers)]
    head = os.path.join(tmp, 'mannequin.svg'); write(head, body.mannequin_head())
    jobs.append([head, os.path.join(tmp, 'mannequin.png')])
    with open(os.path.join(tmp, 'jobs.json'), 'w') as f: json.dump(jobs, f)
    subprocess.run(['node', os.path.join(os.path.dirname(__file__), 'render.cjs'), os.path.join(tmp, 'jobs.json')], check=True)

    verified, cosmetic, pack, by_item = [], [], {}, {}
    for (item_id, kind, plane, svg_path, url), (_, png) in zip(layers, jobs):
        sha, size = webp(png, PUB + url)
        if kind in ('body', 'starter'):
            verified.append({'name': item_id, 'url': url, 'width': 768, 'height': 1280, 'sha256': sha, 'bytes': size})
        else:
            cosmetic.append({'id': item_id, 'gender': folder(item_id), 'plane': plane, 'url': url,
                             'source': os.path.relpath(svg_path, ROOT), 'width': 768, 'height': 1280, 'sha256': sha, 'bytes': size})
            pack.setdefault(item_id, []).append({'plane': plane, 'src': url})
        if kind != 'body':
            by_item.setdefault(item_id, []).append((plane, png))
    order = {'behind-body': 0, 'bottom': 1, 'shoes': 2, 'top': 3, 'hair': 4, 'accessory-front': 5}
    for item_id, pngs in by_item.items():
        pngs.sort(key=lambda x: order[x[0]])
        thumbnail(pngs, f'{PUB}/avatars/v1/previews/{item_id}.webp', 216 if item_id in STARTERS else 192,
                  os.path.join(tmp, 'mannequin.png') if item_id.startswith('hair.') else None)

    write(os.path.join(RIG, 'verified-exports.json'), json.dumps({'rig': 'v1', 'canvas': [768, 1280], 'entries': verified}, indent=2) + '\n')
    write(os.path.join(RIG, 'cosmetics', 'exports.json'), json.dumps({'rig': 'v1', 'canvas': [768, 1280],
          'workflow': 'SVG masters drawn by scripts/avatars/build.py; Chromium render; lossless Pillow WebP export',
          'entries': cosmetic}, indent=2) + '\n')
    ts = ('import type { AvatarAssetLayer } from \'../types/cosmetics\';\n\n'
          '// Generated by scripts/avatars/build.py. Hashes and SVG masters: assets/avatar-rig-v1/cosmetics/exports.json.\n'
          'export const COSMETIC_ASSET_PACK: Readonly<Record<string, readonly AvatarAssetLayer[]>> = '
          + json.dumps(pack, indent=2) + ';\n')
    write(os.path.join(ROOT, 'src', 'data', 'cosmeticAssetPack.ts'), ts)
    print(f'{len(verified)} verified layers, {len(cosmetic)} cosmetic layers, {len(pack)} cosmetic items, {len(by_item)} thumbnails')


if __name__ == '__main__':
    main()
