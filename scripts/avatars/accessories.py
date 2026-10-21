"""Accessories: headwear, glasses, wearables. Return {'accessory-front': svg, 'behind-body': svg?}."""
from art import *
from clothes import star

ACCESSORIES = {}


def acc(name):
    def wrap(fn):
        ACCESSORIES[name] = fn
        return fn
    return wrap


@acc('accessory.round-glasses')
def _():
    f = '#2b2d42'
    p = ''.join(circle(x, 352, 44, '#cfe8ff', f, 8, ' fill-opacity=".25"') for x in (320, 448))
    p += line('M364 346 Q384 334 404 346', f, 8) + line('M276 344 L232 334', f, 8) + line('M492 344 L536 334', f, 8)
    p += line('M296 330 Q306 318 320 316', '#ffffff', 6)
    return {'accessory-front': svg(p)}


@acc('accessory.sun-cap')
def _():
    c = '#ffd166'
    p = path('M220 262 Q216 118 384 112 Q552 118 548 262 Q384 236 220 262 Z', c)
    p += path('M228 254 Q384 222 560 252 Q600 262 612 284 Q480 262 384 268 Q300 270 222 280 Z', darker(c, .12))
    p += line('M384 114 L384 246', darker(c, .25), 5) + circle(384, 112, 12, darker(c, .2), OUT, 4)
    p += circle(330, 190, 22, '#ff7f6e', OUT, 4)
    return {'accessory-front': svg(p)}


@acc('accessory.star-headband')
def _():
    p = path('M220 290 Q230 150 384 142 Q538 150 548 290', 'none', OUT, 30) + path('M220 290 Q230 150 384 142 Q538 150 548 290', 'none', '#ff8fab', 18)
    p += star(466, 168, 40, '#ffd166', OUT, 6) + star(330, 160, 18, '#ffffff', OUT, 4)
    return {'accessory-front': svg(p)}


@acc('accessory.music-headphones')
def _():
    c = '#7b61ff'
    p = path('M218 340 Q206 120 384 112 Q562 120 550 340', 'none', OUT, 36) + path('M218 340 Q206 120 384 112 Q562 120 550 340', 'none', c, 22)
    for x in (212, 556):
        p += path(f'M{x - 30} 300 Q{x - 34} 352 {x - 24} 404 L{x + 24} 404 Q{x + 30} 352 {x + 24} 300 Z', c)
        p += ellipse(x, 352, 14, 36, lighter(c, .3), None)
    return {'accessory-front': svg(p)}


@acc('accessory.school-backpack')
def _():
    c = '#ff7f50'
    bag = path('M248 560 Q248 520 300 516 L468 516 Q520 520 520 560 L528 820 Q384 846 240 820 Z', c)
    bag += path('M236 700 L272 700 L272 800 L238 800 Z', darker(c, .12)) + path('M496 700 L532 700 L530 800 L496 800 Z', darker(c, .12))
    straps = line('M312 540 Q300 640 296 760', OUT, 34) + line('M312 540 Q300 640 296 760', '#2b2d42', 22)
    straps += line('M456 540 Q468 640 472 760', OUT, 34) + line('M456 540 Q468 640 472 760', '#2b2d42', 22)
    straps += path('M286 700 L308 700 L308 716 L286 716 Z', '#ffd166', OUT, 3) + path('M460 700 L482 700 L482 716 L460 716 Z', '#ffd166', OUT, 3)
    return {'behind-body': svg(bag), 'accessory-front': svg(straps)}


@acc('accessory.library-badge')
def _():
    p = circle(440, 630, 34, '#ffd166', OUT, 6) + circle(440, 630, 24, '#4d96ff', None)
    p += path('M424 618 L440 624 L456 618 L456 644 L440 650 L424 644 Z', '#ffffff', OUT, 3) + line('M440 624 L440 650', OUT, 3)
    p += path('M424 660 L416 690 L430 682 L440 694 L440 664 Z', '#ff6b6b', OUT, 3) + path('M456 660 L464 690 L450 682 L440 694 L440 664 Z', '#ff6b6b', OUT, 3)
    return {'accessory-front': svg(upright(p, 440, 650))}


@acc('accessory.castle-crown')
def _():
    g = '#ffcf4a'
    p = path('M282 200 L272 96 L330 146 L384 70 L438 146 L496 96 L486 200 Q384 214 282 200 Z', g)
    p += line('M282 184 Q384 198 486 184', darker(g, .2), 8)
    p += circle(384, 150, 16, '#ff4d6d', OUT, 4) + circle(318, 170, 11, '#4dabf7', OUT, 4) + circle(450, 170, 11, '#51cf66', OUT, 4)
    p += circle(272, 96, 10, g, OUT, 4) + circle(384, 70, 10, g, OUT, 4) + circle(496, 96, 10, g, OUT, 4)
    return {'accessory-front': svg(p)}


@acc('accessory.time-watch')
def _():
    x, y = 252, 772
    p = line(f'M{x - 36} {y + 4} L{x + 36} {y - 4}', OUT, 30) + line(f'M{x - 36} {y + 4} L{x + 36} {y - 4}', '#4dabf7', 18)
    face = circle(x, y, 24, '#ffcf4a', OUT, 6) + circle(x, y, 15, '#ffffff', None)
    face += line(f'M{x} {y} L{x} {y - 10}', OUT, 4) + line(f'M{x} {y} L{x + 8} {y + 3}', OUT, 4)
    return {'accessory-front': svg(p + upright(face, x, y))}


@acc('accessory.bucket-hat')
def _():
    c = '#e9dcc0'
    p = path('M190 268 Q220 220 268 214 L500 214 Q548 220 578 268 Q384 296 190 268 Z', darker(c, .08))
    p += path('M262 222 Q262 120 384 116 Q506 120 506 222 Q384 240 262 222 Z', c)
    p += line('M266 206 Q384 222 502 206', '#2b2d42', 14)
    p += ''.join(line(f'M{x} 140 L{x + 10} 196', darker(c, .2), 3) for x in (310, 360, 410, 460))
    return {'accessory-front': svg(p)}


@acc('accessory.bow-clip')
def _():
    c = '#ff6fa5'
    p = path('M520 210 Q470 150 452 196 Q440 244 520 224 Z', c) + path('M520 210 Q570 150 588 196 Q600 244 520 224 Z', c)
    p += path('M508 220 L490 278 L512 268 Z', c) + path('M532 220 L550 278 L528 268 Z', c)
    p += circle(520, 216, 16, darker(c, .15), OUT, 5)
    p += ''.join(circle(x, y, 5, '#ffffff', None) for x, y in ((472, 190), (566, 190), (480, 214), (558, 214)))
    return {'accessory-front': svg(p)}


@acc('accessory.beret')
def _():
    c = '#c8553d'
    p = path('M214 236 Q200 140 330 118 Q470 98 560 170 Q582 210 540 236 Q384 214 214 236 Z', c)
    p += path('M226 232 Q384 206 544 230 L540 252 Q384 230 224 254 Z', darker(c, .18))
    p += line('M400 106 L410 86', OUT, 10) + line('M400 106 L410 86', c, 4)
    p += path('M300 150 Q360 128 430 132', 'none', lighter(c, .3), 8)
    return {'accessory-front': svg(p)}


@acc('accessory.cat-ears')
def _():
    c, inner = '#b197fc', '#ffc2d4'
    p = path('M222 280 Q230 150 384 142 Q538 150 546 280', 'none', OUT, 28) + path('M222 280 Q230 150 384 142 Q538 150 546 280', 'none', c, 16)
    for x, d in ((286, -1), (482, 1)):
        p += path(f'M{x - 44} 176 L{x + d * 6} 76 L{x + 44} 158 Z', c)
        p += path(f'M{x - 24} 164 L{x + d * 6} 106 L{x + 24} 154 Z', inner, None)
    return {'accessory-front': svg(p)}
