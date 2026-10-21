"""Shared drawing kit for the avatar rig: canvas, palette and outlined shapes.

Every garment is drawn from the same body landmarks, so clothes always fit the body.
Canvas 768x1280, feet baseline 1184 (unchanged Rig V1 contract); see ZONE for the chibi placement.
"""
W, H = 768, 1280
OUT = '#3b2838'          # soft plum outline, warmer than pure black
SW = 7                   # outline width

SKIN, SKIN_SHADE, BLUSH = '#f6c7a1', '#e3a17c', '#ff8f8f'

# Body landmarks
HEAD_C = (384, 330)
SHOULDER = {'L': (306, 566), 'R': (462, 566)}
ELBOW = {'L': (264, 676), 'R': (504, 676)}
WRIST = {'L': (250, 786), 'R': (518, 786)}
HAND = {'L': (248, 812), 'R': (520, 812)}
HIP_Y, CROTCH_Y = 792, 858
LEG_TOP = {'L': (346, 820), 'R': (422, 820)}
KNEE = {'L': (343, 968), 'R': (425, 968)}
ANKLE = {'L': (341, 1112), 'R': (427, 1112)}
ARM_W, LEG_W = 60, 72

# Chibi zones. Garments and hair are drawn on the landmarks above, then each layer is placed by zone:
# the body is squashed towards the feet, the head is enlarged and seated on the shorter neck.
ZOOM = 1.16                 # whole figure, around the feet
BODY_SCALE = (1.0, 0.6)     # (x, y) for everything below the neck
HEAD_SCALE = 1.24
NECK_Y = 470                # head pivot in landmark space


def _around_feet(t):
    return f'translate(384 1184) scale({ZOOM}) translate(-384 -1184) {t}'


ZONE = {
    'body': _around_feet(f'translate(384 1184) scale({BODY_SCALE[0]} {BODY_SCALE[1]}) translate(-384 -1184)'),
    'head': _around_feet(f'translate(384 {1184 - (1184 - NECK_Y) * BODY_SCALE[1]:.1f}) scale({HEAD_SCALE}) translate(-384 -{NECK_Y})'),
}


def zoned(text, zone):
    """Wrap a finished layer SVG so its contents land in the chibi `zone` ('head' or 'body')."""
    head, rest = text.split('>', 1)
    return f'{head}><g transform="{ZONE[zone]}">{rest[:-len("</svg>")]}</g></svg>'


def upright(inner, cx, cy):
    """Pre-stretch a round print/badge so it stays round after the body squash."""
    k = BODY_SCALE[0] / BODY_SCALE[1]
    return f'<g transform="translate({cx} {cy}) scale(1 {k:.4f}) translate({-cx} {-cy})">{inner}</g>'


TORSO = 'M300 536 Q384 510 468 536 Q494 548 492 598 L486 804 Q384 826 282 804 L276 598 Q274 548 300 536 Z'


def svg(*parts, view=f'0 0 {W} {H}', size=(W, H)):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size[0]}" height="{size[1]}" viewBox="{view}">'
            f'<g stroke-linejoin="round" stroke-linecap="round">{"".join(parts)}</g></svg>')


def path(d, fill='none', stroke=OUT, width=SW, extra=''):
    s = f' stroke="{stroke}" stroke-width="{width}"' if stroke else ' stroke="none"'
    return f'<path d="{d}" fill="{fill}"{s}{extra}/>'


def shape(d, fill):
    return path(d, fill)


def shade(d, fill, opacity=0.35):
    return path(d, fill, None, extra=f' opacity="{opacity}"')


def line(d, color, width):
    return path(d, 'none', color, width)


def ellipse(cx, cy, rx, ry, fill, stroke=OUT, width=SW, extra=''):
    s = f' stroke="{stroke}" stroke-width="{width}"' if stroke else ''
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}"{s}{extra}/>'


def circle(cx, cy, r, fill, stroke=OUT, width=SW, extra=''):
    return ellipse(cx, cy, r, r, fill, stroke, width, extra)


def limb(points, width, fill, outline=True, cap='round'):
    """A tube through 2-3 points: outline stroke underneath, colour on top."""
    (x0, y0), *rest = points
    d = f'M{x0} {y0} ' + (f'Q{rest[0][0]} {rest[0][1]} {rest[1][0]} {rest[1][1]}' if len(rest) == 2 else f'L{rest[0][0]} {rest[0][1]}')
    c = f' stroke-linecap="{cap}"'
    out = path(d, 'none', OUT, width + 2 * SW, c) if outline else ''
    return out + path(d, 'none', fill, width, c)


def mix(a, b, t):
    """Blend two hex colours; t=0 gives a, t=1 gives b."""
    pa = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    pb = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return '#' + ''.join(f'{round(x + (y - x) * t):02x}' for x, y in zip(pa, pb))


def darker(c, t=0.22):
    return mix(c, '#2a1a2a', t)


def lighter(c, t=0.45):
    return mix(c, '#ffffff', t)
