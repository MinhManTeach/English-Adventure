"""Boy and girl base bodies: chibi proportions (big head, short body), glossy eyes, neutral base clothes."""
from art import *

BASE_TOP, BASE_BOTTOM = '#f5f1ea', '#c3cbd6'


def head_shape():
    # mochi face: wide cheeks, soft chin
    return 'M214 318 Q214 164 384 164 Q554 164 554 318 Q556 432 490 474 Q440 502 384 502 Q328 502 278 474 Q212 432 214 318 Z'


def eye(cx, cy, sign, girl):
    p = ellipse(cx, cy, 30, 38, '#2a1a2e', None)
    p += f'<ellipse cx="{cx}" cy="{cy + 8}" rx="24" ry="27" fill="url(#iris)"/>'
    p += ellipse(cx, cy + 4, 13, 15, '#1d1222', None)
    # three sparkles make the eyes read as glossy at small sizes
    p += circle(cx - 10, cy - 14, 11, '#ffffff', None) + circle(cx + 11, cy + 14, 5.5, '#ffffff', None)
    p += circle(cx + 13, cy - 16, 3.5, '#ffffff', None, extra=' opacity=".85"')
    p += path(f'M{cx - 32} {cy - 18} Q{cx} {cy - 50} {cx + 32} {cy - 18}', 'none', '#2a1a2e', 8)
    if girl:
        ox = cx + sign * 28
        p += line(f'M{ox} {cy - 22} Q{ox + sign * 12} {cy - 30} {ox + sign * 16} {cy - 42}', '#2a1a2e', 6)
        p += line(f'M{ox + sign * 2} {cy - 10} Q{ox + sign * 16} {cy - 14} {ox + sign * 22} {cy - 24}', '#2a1a2e', 5)
    return p


def face(gender):
    girl = gender == 'girl'
    p = ['<defs><linearGradient id="iris" x1="0" y1="0" x2="0" y2="1">'
         '<stop offset="0" stop-color="#3b2433"/><stop offset=".55" stop-color="#7a4a34"/><stop offset="1" stop-color="#d49a5c"/></linearGradient>'
         '<radialGradient id="blush"><stop offset="0" stop-color="#ff7d8c" stop-opacity=".7"/>'
         '<stop offset="1" stop-color="#ff7d8c" stop-opacity="0"/></radialGradient></defs>']
    p.append(eye(316, 372, -1, girl)); p.append(eye(452, 372, 1, girl))
    brow = '#5a3a2c'
    p.append(line('M292 304 Q314 294 336 300', brow, 7)); p.append(line('M432 300 Q454 294 476 304', brow, 7))
    # tiny nose, small open smile, soft blush with two strokes each
    p.append(ellipse(384, 420, 5, 3.5, SKIN_SHADE, None))
    p.append(path('M362 440 Q384 464 406 440 Q400 470 384 470 Q368 470 362 440 Z', '#b9425e', OUT, 5))
    p.append(ellipse(384, 462, 9, 5, '#ff8fa0', None))
    p.append(ellipse(268, 430, 36, 22, 'url(#blush)', None)); p.append(ellipse(500, 430, 36, 22, 'url(#blush)', None))
    p += [line(f'M{x} 424 L{x - 6} 436', BLUSH, 3.5) for x in (258, 272, 494, 508)]
    return ''.join(p)


def head(gender):
    p = [path('M354 440 L414 440 L416 520 Q384 534 352 520 Z', SKIN)]
    p.append(circle(216, 360, 28, SKIN)); p.append(circle(552, 360, 28, SKIN))
    p.append(circle(218, 362, 12, SKIN_SHADE, None, extra=' opacity=".5"'))
    p.append(circle(550, 362, 12, SKIN_SHADE, None, extra=' opacity=".5"'))
    p.append(shape(head_shape(), SKIN))
    p.append(face(gender))
    return svg(*p)


def body(gender):
    p = []
    waist = 'M282 804 Q384 826 486 804' if gender == 'boy' else 'M286 804 Q384 824 482 804'
    # legs and bare feet (shoes always cover them in play)
    for s in 'LR':
        p.append(limb([LEG_TOP[s], KNEE[s], ANKLE[s]], LEG_W, SKIN))
        x, y = ANKLE[s]
        p.append(ellipse(x + (-8 if s == 'L' else 8), y + 44, 44, 24, SKIN))
    # arms behind the torso, hands in front
    for s in 'LR':
        p.append(limb([SHOULDER[s], ELBOW[s], WRIST[s]], ARM_W, SKIN))
    for s in 'LR':
        x, y = HAND[s]
        # pre-stretched so the hands come out round after the body squash
        p.append(ellipse(x, y - 6, 30, round(30 * BODY_SCALE[0] / BODY_SCALE[1]), SKIN))
        p.append(line(f'M{x + (12 if s == "L" else -12)} {y - 10} Q{x + (16 if s == "L" else -16)} {y + 2} {x + (10 if s == "L" else -10)} {y + 14}', SKIN_SHADE, 5))
    # base clothes: soft tank top and light shorts
    p.append(path('M284 790 L484 790 L490 900 L394 900 L384 868 L374 900 L278 900 Z', BASE_BOTTOM))
    p.append(shape(TORSO, BASE_TOP))
    p.append(path('M336 528 Q384 566 432 528', 'none', OUT, SW))
    p.append(shade('M282 760 Q384 784 486 760 L486 804 Q384 826 282 804 Z', '#b9b0a2', .35))
    body_layer = zoned(svg(*p), 'body')
    head_layer = zoned(head(gender), 'head')
    return body_layer[:-len('</svg>')] + head_layer[head_layer.index('>') + 1:]


def mannequin_head():
    """Faint head used only behind hair thumbnails so the style reads as hair."""
    c = '#f3e6dc'
    return zoned(svg(circle(216, 360, 28, c, '#d9c6b8'), circle(552, 360, 28, c, '#d9c6b8'), path(head_shape(), c, '#d9c6b8')), 'head')
