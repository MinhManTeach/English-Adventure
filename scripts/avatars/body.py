"""Boy and girl base bodies: chibi proportions, big sparkling eyes, neutral base clothes."""
from art import *

BASE_TOP, BASE_BOTTOM = '#f5f1ea', '#c3cbd6'


def head_shape():
    return 'M218 326 Q218 168 384 168 Q550 168 550 326 Q550 446 472 478 Q384 504 296 478 Q218 446 218 326 Z'


def face(gender):
    p = []
    # eyes: dark ovals, warm brown lower iris and two sparkles
    for cx, sign in ((320, -1), (448, 1)):
        p.append(ellipse(cx, 352, 25, 32, '#2c1c2b', None))
        p.append(ellipse(cx, 366, 17, 14, '#7a4a34', None, extra=' opacity=".75"'))
        p.append(circle(cx - 8, 338, 9.5, '#ffffff', None))
        p.append(circle(cx + 9, 368, 4.5, '#ffffff', None))
        if gender == 'girl':
            ox = cx + sign * 22
            p.append(line(f'M{ox} 334 Q{ox + sign * 12} 326 {ox + sign * 18} 316', '#2c1c2b', 7))
            p.append(line(f'M{ox + sign * 2} 346 Q{ox + sign * 16} 342 {ox + sign * 24} 334', '#2c1c2b', 6))
    # brows
    brow = '#4b3026'
    p.append(line('M292 296 Q318 282 346 292', brow, 9 if gender == 'boy' else 7))
    p.append(line('M422 292 Q450 282 476 296', brow, 9 if gender == 'boy' else 7))
    # nose and smile
    p.append(line('M380 392 Q374 404 388 406', SKIN_SHADE, 6))
    p.append(path('M350 424 Q384 448 418 424 Q412 462 384 462 Q356 462 350 424 Z', '#a83f57', OUT, 6))
    p.append(path('M358 430 Q384 444 410 430 L406 440 Q384 448 362 440 Z', '#ffffff', None))
    p.append(ellipse(384, 452, 14, 6.5, '#f07f8a', None))
    # cheeks
    p.append(ellipse(280, 412, 27, 15, BLUSH, None, extra=' opacity=".45"'))
    p.append(ellipse(488, 412, 27, 15, BLUSH, None, extra=' opacity=".45"'))
    return ''.join(p)


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
        p.append(circle(x, y, 31, SKIN))
        p.append(line(f'M{x + (12 if s == "L" else -12)} {y - 10} Q{x + (16 if s == "L" else -16)} {y + 2} {x + (10 if s == "L" else -10)} {y + 14}', SKIN_SHADE, 5))
    # base clothes: soft tank top and light shorts
    p.append(path('M284 790 L484 790 L490 900 L394 900 L384 868 L374 900 L278 900 Z', BASE_BOTTOM))
    p.append(shape(TORSO, BASE_TOP))
    p.append(path('M336 528 Q384 566 432 528', 'none', OUT, SW))
    p.append(shade('M282 760 Q384 784 486 760 L486 804 Q384 826 282 804 Z', '#b9b0a2', .35))
    # neck, ears and head
    p.append(path('M352 456 L416 456 L418 536 Q384 556 350 536 Z', SKIN))
    p.append(shade('M352 470 Q384 500 416 470 L416 500 Q384 520 352 500 Z', SKIN_SHADE, .55))
    p.append(circle(220, 352, 30, SKIN)); p.append(circle(548, 352, 30, SKIN))
    p.append(circle(222, 354, 13, SKIN_SHADE, None, extra=' opacity=".5"'))
    p.append(circle(546, 354, 13, SKIN_SHADE, None, extra=' opacity=".5"'))
    p.append(shape(head_shape(), SKIN))
    p.append(face(gender))
    return svg(*p)


def mannequin_head():
    """Faint head used only behind hair thumbnails so the style reads as hair."""
    c = '#f3e6dc'
    return svg(circle(220, 352, 30, c, '#d9c6b8'), circle(548, 352, 30, c, '#d9c6b8'), path(head_shape(), c, '#d9c6b8'))
