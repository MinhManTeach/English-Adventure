"""Tops, bottoms and shoes, all fitted to the shared body landmarks."""
from art import *

TOP_BODY = 'M294 530 Q384 500 474 530 Q502 544 500 598 L496 836 Q384 858 272 836 L268 598 Q266 544 294 530 Z'
CREW = 'M338 524 Q384 562 430 524'
SHORT_END = {'L': (283, 628), 'R': (485, 628)}
LONG_END = {'L': (252, 764), 'R': (516, 764)}


def clip(cid, d, inner):
    return f'<clipPath id="{cid}"><path d="{d}"/></clipPath><g clip-path="url(#{cid})">{inner}</g>'


def hem(a, b, width):
    """Outline across the open end of a butt-capped tube from a to b."""
    import math
    (x0, y0), (x1, y1) = a, b
    dx, dy = x1 - x0, y1 - y0
    n = math.hypot(dx, dy) or 1
    px, py = -dy / n * (width / 2 + SW / 2), dx / n * (width / 2 + SW / 2)
    return line(f'M{x1 + px:.1f} {y1 + py:.1f} L{x1 - px:.1f} {y1 - py:.1f}', OUT, SW)


def sleeves(color, kind, cuff=None, width=ARM_W + 22):
    p = ''
    for s in 'LR':
        if kind == 'short':
            p += limb([SHOULDER[s], SHORT_END[s]], width, color, cap='butt')
            if cuff:
                x0, y0 = SHOULDER[s]; x1, y1 = SHORT_END[s]
                p += line(f'M{x0 + (x1 - x0) * .82} {y0 + (y1 - y0) * .82} L{x1} {y1}', cuff, width - 2)
            p += hem(SHOULDER[s], SHORT_END[s], width)
        elif kind == 'long':
            p += limb([SHOULDER[s], ELBOW[s], LONG_END[s]], width - 4, color, cap='butt')
            x, y = LONG_END[s]
            p += limb([(x + (2 if s == 'L' else -2), y - 22), (x, y)], width - 2, cuff or darker(color, .12), cap='butt')
            p += hem((x + (2 if s == 'L' else -2), y - 22), (x, y), width - 2)
    return p


def tee(color, sleeve='short', cuff=None, neck=CREW, body=TOP_BODY, print_='', hem=True, sleeve_color=None):
    p = sleeves(sleeve_color or color, sleeve, cuff)
    p += shape(body, color)
    p += shade('M462 536 Q500 552 498 600 L494 836 L468 840 Q482 700 462 536 Z', darker(color, .5), .14)
    p += shade('M272 800 Q384 824 496 800 L496 836 Q384 858 272 836 Z', darker(color, .4), .18) if hem else ''
    p += print_
    if neck:
        p += path(neck, 'none', OUT, SW)
    return p


def star(cx, cy, r, fill, stroke=OUT, width=5):
    import math
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * .45
        pts.append(f'{cx + rr * math.cos(a):.1f} {cy + rr * math.sin(a):.1f}')
    return path('M' + ' L'.join(pts) + ' Z', fill, stroke, width)


TOPS = {}


def top(name):
    def wrap(fn):
        TOPS[name] = fn
        return fn
    return wrap


@top('top.starter-blue')
def _():
    return svg(tee('#4d96ff', print_=upright(star(384, 650, 46, '#ffd166'), 384, 650)))


@top('top.starter-mint')
def _():
    c = '#7fd8be'
    pocket = path('M418 600 L470 600 L468 656 Q444 666 420 656 Z', lighter(c, .25))
    return svg(tee(c, cuff=darker(c, .1), print_=pocket))


@top('top.sunshine-tee')
def _():
    c = '#ffd96a'
    sun = ''.join(line(f'M{384 + 64 * __import__("math").cos(a * .785):.0f} {660 + 64 * __import__("math").sin(a * .785):.0f} '
                       f'L{384 + 86 * __import__("math").cos(a * .785):.0f} {660 + 86 * __import__("math").sin(a * .785):.0f}', '#ff9f1c', 10) for a in range(8))
    sun += circle(384, 660, 46, '#ff9f1c', OUT, 5) + line('M366 668 Q384 684 402 668', OUT, 5) + circle(368, 650, 5, OUT, None) + circle(400, 650, 5, OUT, None)
    return svg(tee(c, cuff='#ffffff', print_=upright(sun, 384, 660)))


@top('top.coral-stripes')
def _():
    c, s = '#fff4e8', '#ff7f6e'
    stripes = ''.join(f'<rect x="250" y="{y}" width="280" height="26" fill="{s}"/>' for y in range(570, 860, 62))
    sl = ''.join(limb([SHOULDER[k], SHORT_END[k]], ARM_W + 22, s, cap='butt') for k in 'LR')
    return svg(sl + shape(TOP_BODY, c) + clip('stripes', TOP_BODY, stripes) + path(TOP_BODY, 'none') + path(CREW, 'none'))


@top('top.sky-hoodie')
def _():
    c = '#9fd3ff'
    hood = path('M300 540 Q384 476 468 540 Q440 520 384 518 Q328 520 300 540 Z', darker(c, .1))
    pocket = path('M318 716 L450 716 L474 806 L294 806 Z', darker(c, .06)) + line('M318 716 L300 790', OUT, SW) + line('M450 716 L468 790', OUT, SW)
    strings = line('M364 548 L360 620', '#ffffff', 7) + line('M404 548 L408 620', '#ffffff', 7) + circle(360, 626, 7, '#ffffff', OUT, 4) + circle(408, 626, 7, '#ffffff', OUT, 4)
    return svg(tee(c, 'long', cuff=darker(c, .12), neck=None, print_=pocket + hood + strings))


@top('top.library-shirt')
def _():
    c = '#b8cfa5'
    collar = path('M330 524 L384 572 L352 590 L318 548 Z', '#f6f1e6') + path('M438 524 L384 572 L416 590 L450 548 Z', '#f6f1e6')
    buttons = ''.join(circle(384, y, 7, '#f6f1e6', OUT, 4) for y in (620, 680, 740, 800))
    placket = line('M384 572 L384 840', darker(c, .2), 5)
    pocket = path('M412 610 L460 610 L458 660 L414 660 Z', lighter(c, .2))
    return svg(tee(c, cuff=darker(c, .15), neck=None, print_=placket + buttons + pocket + collar))


@top('top.space-sweater')
def _():
    c = '#2d3a6b'
    stars = upright(star(330, 640, 20, '#ffd166'), 330, 640) + upright(star(450, 720, 16, '#ffd166'), 450, 720) + upright(star(420, 610, 10, '#ffffff', None), 420, 610)
    planet = upright(circle(352, 742, 34, '#ff9fb2', OUT, 5) + path('M300 750 Q352 716 404 734', 'none', '#ffd166', 8), 352, 742)
    rib = line('M276 826 Q384 848 492 826', lighter(c, .25), 10)
    return svg(tee(c, 'long', cuff=lighter(c, .2), print_=stars + planet + rib, neck='M332 526 Q384 570 436 526'))


@top('top.castle-jacket')
def _():
    c, g = '#6a4bc4', '#ffcf4a'
    inner = path('M342 524 L426 524 L414 846 L354 846 Z', '#fff8ec')
    p = sleeves(c, 'long', cuff=g)
    p += shape(TOP_BODY, c) + inner
    p += path('M342 524 L392 760 L384 846', 'none', OUT, SW) + path('M426 524 L376 760', 'none')
    p += path('M300 534 L342 524 L374 640 L330 620 Z', darker(c, .15)) + path('M468 534 L426 524 L394 640 L438 620 Z', darker(c, .15))
    p += line('M354 846 L340 600', g, 8) + line('M414 846 L428 600', g, 8)
    p += ''.join(circle(x, y, 8, g, OUT, 4) for x, y in ((326, 700), (326, 770), (442, 700), (442, 770)))
    p += upright(star(384, 640, 22, g), 384, 640)
    return svg(p)


@top('top.lavender-cardigan')
def _():
    c = '#c4b3ff'
    p = sleeves(c, 'long', cuff=darker(c, .12))
    p += shape(TOP_BODY, c)
    p += path('M340 520 L428 520 L392 840 L376 840 Z', '#fffaf2')
    p += path('M340 520 L384 700 L428 520', 'none', OUT, SW)
    p += line('M376 700 L376 846', OUT, SW) + line('M392 700 L392 846', OUT, SW)
    p += ''.join(circle(398, y, 8, '#ffe066', OUT, 4) for y in (720, 770, 816))
    p += line('M276 826 Q384 848 492 826', darker(c, .1), 12)
    p += ''.join(line(f'M{x} 810 L{x} 842', darker(c, .2), 3) for x in range(290, 480, 18))
    p += upright(circle(330, 620, 9, '#ff8fab', None) + circle(318, 612, 9, '#ff8fab', None) + circle(324, 602, 9, '#ff8fab', None), 324, 612)
    return svg(p)


@top('top.varsity-jacket')
def _():
    c, s, a = '#2b2d42', '#f3ead8', '#c6f432'
    p = sleeves(s, 'long', cuff=c)
    for k in 'LR':
        x, y = LONG_END[k]
        p += line(f'M{x - 26} {y - 30} L{x + 26} {y - 30}', a, 6)
    p += shape(TOP_BODY, c)
    p += path('M330 522 Q384 560 438 522 L430 540 Q384 574 338 540 Z', a)
    p += line('M384 560 L384 846', '#000000', 5)
    p += ''.join(circle(370, y, 7, s, OUT, 4) for y in (610, 670, 730, 790))
    p += upright(path('M410 600 L470 600 L470 660 L410 660 Z', a) + f'<text x="440" y="650" font-family="Arial Black,Arial" font-weight="900" font-size="54" text-anchor="middle" fill="{c}">A</text>', 440, 630)
    p += line('M276 826 Q384 848 492 826', a, 8)
    return svg(p)


@top('top.sage-overshirt')
def _():
    c = '#d4825e'
    p = sleeves(c, 'short', cuff=darker(c, .12), width=ARM_W + 26)
    p += shape(TOP_BODY, c)
    p += path('M342 520 L426 520 L414 846 L354 846 Z', '#f4ecdc')
    p += path('M342 520 L360 846', 'none') + path('M426 520 L408 846', 'none')
    p += path('M300 534 L342 520 L366 600 L326 590 Z', darker(c, .12)) + path('M468 534 L426 520 L402 600 L442 590 Z', darker(c, .12))
    p += path('M290 620 L340 620 L338 676 L292 676 Z', lighter(c, .12)) + path('M428 620 L478 620 L476 676 L430 676 Z', lighter(c, .12))
    p += line('M290 640 L340 640', OUT, 4) + line('M428 640 L478 640', OUT, 4)
    p += path('M362 560 Q384 600 406 560', 'none', '#a3b18a', 10)
    return svg(p)


@top('top.soccer-jersey')
def _():
    c = '#e63946'
    p = tee(c, cuff='#ffffff', neck=None)
    p += path('M336 522 L384 590 L432 522', '#ffffff', OUT, SW)
    p += path('M344 524 L384 572 L424 524', c, None)
    p += line('M270 600 L268 836', '#ffffff', 10) + line('M498 600 L496 836', '#ffffff', 10)
    p += upright(f'<text x="384" y="760" font-family="Arial Black,Arial" font-weight="900" font-size="120" text-anchor="middle" fill="#ffffff" stroke="{OUT}" stroke-width="6" paint-order="stroke">10</text>', 384, 716)
    return svg(p)


@top('top.ao-dai')
def _():
    c, g = '#d62839', '#ffcf4a'
    body = 'M294 530 Q384 500 474 530 Q502 544 500 598 L494 790 L516 1030 Q450 1046 400 1036 L384 830 L368 1036 Q318 1046 252 1030 L274 790 L268 598 Q266 544 294 530 Z'
    p = sleeves(c, 'long', cuff=g)
    p += shape(body, c)
    pattern = ''.join(upright(circle(x, y, 10, g, None) + circle(x, y, 4, c, None), x, y) for x, y in ((330, 640), (430, 700), (350, 760), (450, 620), (300, 900), (470, 920), (330, 990), (440, 1000)))
    pattern += path('M384 540 Q420 560 446 600', 'none', g, 6)
    p += clip('aodai', body, pattern) + path(body, 'none')
    p += path('M344 522 Q384 540 424 522 L424 500 Q384 512 344 500 Z', c) + line('M352 516 Q384 528 416 516', g, 5)
    p += path('M384 540 Q440 560 470 600', 'none', OUT, 5)
    return svg(p)


# ---------- bottoms ----------
SHORTS = 'M278 784 L490 784 L498 924 L398 924 L384 884 L370 924 L270 924 Z'
HIPS = 'M278 784 L490 784 L492 880 L384 890 L276 880 Z'
PANT_END = {'L': (340, 1098), 'R': (428, 1098)}
BOTTOMS = {}


def bottom(name):
    def wrap(fn):
        BOTTOMS[name] = fn
        return fn
    return wrap


def waistband(color):
    return path('M278 784 L490 784 L490 812 L278 812 Z', color)


def pants(color, width=LEG_W + 22, cuff=None, end=PANT_END, extra=''):
    p = ''
    for s in 'LR':
        p += limb([LEG_TOP[s], KNEE[s], end[s]], width, color, cap='butt')
    p += shape(HIPS, color) + line('M384 812 L384 884', OUT, SW)
    for s in 'LR':
        x, y = end[s]
        if cuff:
            p += limb([(x, y - 24), (x, y)], width + 4, cuff, cap='butt')
        p += hem((x + 1, y - 24), (x, y), width + (4 if cuff else 0))
    return p + extra


@bottom('bottom.starter-shorts')
def _():
    c = '#e2b45f'
    return svg(shape(SHORTS, c) + waistband(darker(c, .1)) + line('M384 812 L384 880', OUT, 5)
               + path('M300 830 Q330 850 346 830', 'none', darker(c, .3), 5) + path('M468 830 Q438 850 422 830', 'none', darker(c, .3), 5))


@bottom('bottom.starter-jeans')
def _():
    c = '#5a7fbd'
    return svg(pants(c, cuff=lighter(c, .2), extra=waistband(darker(c, .1)) + line('M300 830 Q330 850 346 830', '#ffd166', 4)
                     + line('M468 830 Q438 850 422 830', '#ffd166', 4)))


@bottom('bottom.sand-shorts')
def _():
    c = '#dcc6a0'
    p = shape(SHORTS, c) + waistband('#f6eedd')
    p += line('M370 798 Q366 830 356 840', '#ffffff', 5) + line('M398 798 Q402 830 412 840', '#ffffff', 5)
    p += path('M270 904 L370 904 L370 924 L270 924 Z', darker(c, .1)) + path('M398 904 L498 904 L498 924 L398 924 Z', darker(c, .1))
    return svg(p)


@bottom('bottom.navy-joggers')
def _():
    c = '#2f3e6b'
    p = pants(c, cuff=darker(c, .2), end={'L': (342, 1094), 'R': (426, 1094)})
    p += waistband(darker(c, .15)) + line('M372 798 L368 836', '#ffffff', 5) + line('M396 798 L400 836', '#ffffff', 5)
    p += line('M296 840 Q300 980 312 1070', '#ffffff', 8) + line('M472 840 Q468 980 456 1070', '#ffffff', 8)
    return svg(p)


@bottom('bottom.denim-jeans')
def _():
    c = '#7fa7dc'
    p = pants(c, cuff=darker(c, .15)) + waistband(darker(c, .1))
    p += path('M302 980 Q314 990 322 980', 'none', lighter(c, .4), 6) + path('M440 1010 Q450 1020 460 1010', 'none', lighter(c, .4), 6)
    p += line('M300 830 Q330 850 346 830', '#ffd166', 4) + line('M468 830 Q438 850 422 830', '#ffd166', 4)
    return svg(p)


def skirt(color, trim=None):
    d = 'M282 784 L486 784 L524 946 Q384 972 244 946 Z'
    p = shape(d, color)
    p += ''.join(line(f'M{384 + dx * .5:.0f} 812 L{384 + dx} 960', darker(color, .2), 5) for dx in (-110, -60, 0, 60, 110))
    if trim:
        p += line('M248 940 Q384 966 520 940', trim, 10)
    return p + path('M282 784 L486 784 L486 810 L282 810 Z', darker(color, .1))


@bottom('bottom.plum-skirt')
def _():
    return svg(skirt('#8e5aa8'))


@bottom('bottom.pink-pleated-skirt')
def _():
    return svg(skirt('#ffbfd3', trim='#ffffff') + circle(430, 798, 9, '#ffffff', OUT, 4))


@bottom('bottom.cargo-pants')
def _():
    c = '#7d8650'
    p = pants(c, width=LEG_W + 28, cuff=darker(c, .15)) + waistband(darker(c, .12))
    p += path('M276 930 L318 930 L318 990 L278 990 Z', lighter(c, .12)) + path('M450 930 L492 930 L490 990 L450 990 Z', lighter(c, .12))
    p += line('M276 948 L318 948', OUT, 4) + line('M450 948 L492 948', OUT, 4)
    return svg(p)


@bottom('bottom.camel-chinos')
def _():
    c = '#c99c6a'
    p = pants(c, cuff=darker(c, .1), end={'L': (342, 1080), 'R': (426, 1080)}) + waistband('#6f4e37')
    p += circle(384, 798, 8, '#ffcf4a', OUT, 4)
    p += line('M346 900 L342 1060', darker(c, .2), 4) + line('M422 900 L426 1060', darker(c, .2), 4)
    return svg(p)


@bottom('bottom.track-pants')
def _():
    c = '#2b2d42'
    p = pants(c, end={'L': (342, 1094), 'R': (426, 1094)}) + waistband('#e63946')
    for x0, x1 in ((292, 304), (476, 464)):
        p += line(f'M{x0} 830 Q{x0 + (6 if x0 < 384 else -6)} 980 {x1} 1090', '#ffffff', 7)
        p += line(f'M{x0 + (12 if x0 < 384 else -12)} 830 Q{x0 + (18 if x0 < 384 else -18)} 980 {x1 + (12 if x0 < 384 else -12)} 1090', '#ffffff', 7)
    return svg(p)


@bottom('bottom.silk-pants')
def _():
    c = '#fbf6ec'
    return svg(pants(c, width=LEG_W + 30, cuff=None) + waistband(darker(c, .06)))


# ---------- shoes ----------
SHOE_X = {'L': 330, 'R': 438}
SHOES = {}


def shoe(name):
    def wrap(fn):
        SHOES[name] = fn
        return fn
    return wrap


def sneaker(upper, sole='#f4f4f4', lace='#ffffff', toe=None, stripe=None, top=1094, sole_h=22):
    p = ''
    for s in 'LR':
        x = SHOE_X[s]; d = -1 if s == 'L' else 1
        body = (f'M{x - 44} {1170 - sole_h} Q{x - 50} {top + 10} {x - 30} {top} L{x + 30} {top} '
                f'Q{x + 50} {top + 10} {x + 44 + d * 8} {1170 - sole_h} Z')
        p += shape(body, upper)
        if toe:
            p += path(f'M{x - 44} {1170 - sole_h} Q{x - 40} {1124} {x} {1122} Q{x + 40} {1124} {x + 44 + d * 8} {1170 - sole_h} Z', toe)
        if stripe:
            p += line(f'M{x - 34} {1136} Q{x} {1120} {x + 34} {1132}', stripe, 9)
        p += path(f'M{x - 50} {1166 - sole_h} L{x + 50 + d * 8} {1166 - sole_h} L{x + 52 + d * 8} {1176} Q{x} {1188} {x - 52} {1176} Z', sole)
        p += line(f'M{x - 16} {top + 18} L{x + 16} {top + 18}', lace, 6) + line(f'M{x - 18} {top + 34} L{x + 18} {top + 34}', lace, 6)
    return p


@shoe('shoes.starter-white')
def _():
    return svg(sneaker('#ffffff', sole='#cfd6e0', lace='#9aa8bd'))


@shoe('shoes.starter-navy')
def _():
    return svg(sneaker('#33467a', toe='#ffffff', lace='#ffffff'))


@shoe('shoes.red-sneakers')
def _():
    return svg(sneaker('#ef4444', stripe='#ffffff'))


@shoe('shoes.mint-trainers')
def _():
    return svg(sneaker('#8de0c5', stripe='#ffffff', lace='#2f6f5e'))


@shoe('shoes.sky-high-tops')
def _():
    p = sneaker('#74c0fc', toe='#ffffff', top=1040)
    p += ''.join(circle(SHOE_X[s] + (-26 if s == 'L' else 26), 1070, 13, '#ffffff', OUT, 4) + star(SHOE_X[s] + (-26 if s == 'L' else 26), 1070, 9, '#4d96ff', None) for s in 'LR')
    return svg(p)


@shoe('shoes.castle-boots')
def _():
    p = ''
    for s in 'LR':
        x = SHOE_X[s]; d = -1 if s == 'L' else 1
        p += path(f'M{x - 40} 1000 L{x + 40} 1000 L{x + 44} 1150 Q{x + 52 + d * 8} 1150 {x + 52 + d * 8} 1176 Q{x} 1188 {x - 52} 1176 Q{x - 52} 1150 {x - 44} 1150 Z', '#7b4a2d')
        p += path(f'M{x - 44} 994 L{x + 44} 994 L{x + 44} 1020 L{x - 44} 1020 Z', '#a0673f')
        p += path(f'M{x - 42} 1080 L{x + 42} 1080 L{x + 42} 1098 L{x - 42} 1098 Z', '#4a2c1c')
        p += path(f'M{x - 12} 1078 L{x + 12} 1078 L{x + 12} 1100 L{x - 12} 1100 Z', '#ffcf4a', OUT, 4)
    return svg(p)


@shoe('shoes.chunky-sneakers')
def _():
    return svg(sneaker('#f8f9fa', sole='#2b2d42', stripe='#c6f432', lace='#2b2d42', sole_h=34))


@shoe('shoes.mary-janes')
def _():
    p = ''
    for s in 'LR':
        x = SHOE_X[s]; d = -1 if s == 'L' else 1
        p += path(f'M{x - 46} 1150 Q{x - 46} 1110 {x} 1108 Q{x + 46} 1110 {x + 46 + d * 8} 1150 L{x + 50 + d * 8} 1172 Q{x} 1188 {x - 50} 1172 Z', '#ff8fb1')
        p += line(f'M{x - 38} 1124 L{x + 38} 1118', '#ff8fb1', 14) + line(f'M{x - 38} 1124 L{x + 38} 1118', OUT, 3)
        p += circle(x + 28 * d, 1120, 8, '#ffffff', OUT, 4)
        p += ellipse(x, 1146, 16, 10, '#ffffff', None, extra=' opacity=".45"')
    return svg(p)


@shoe('shoes.brown-loafers')
def _():
    p = ''
    for s in 'LR':
        x = SHOE_X[s]; d = -1 if s == 'L' else 1
        p += path(f'M{x - 46} 1150 Q{x - 48} 1104 {x} 1102 Q{x + 48} 1104 {x + 46 + d * 8} 1150 L{x + 50 + d * 8} 1172 Q{x} 1188 {x - 50} 1172 Z', '#8a5534')
        p += path(f'M{x - 26} 1126 L{x + 26} 1126 L{x + 22} 1142 L{x - 22} 1142 Z', '#5e3620', OUT, 4)
        p += path(f'M{x - 52} 1170 Q{x} 1186 {x + 52 + d * 8} 1170 L{x + 50 + d * 8} 1178 Q{x} 1192 {x - 50} 1178 Z', '#3b2418', None)
    return svg(p)
