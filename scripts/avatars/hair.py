"""Hair styles. Each returns {'hair': svg, 'behind-body': svg?}."""
from art import *

BLACK, DARK, BROWN, CHESTNUT = '#2f2229', '#47302a', '#6a4331', '#8c5634'


def cap(fringe, color, top=136, side=352, extra=''):
    """Hair cap over the skull; `fringe` runs from the right temple to the left temple."""
    d = f'M212 {side} Q190 {top + 34} 384 {top} Q578 {top + 34} 556 {side} {fringe} Z'
    return shape(d, color) + extra


def shine(color, d='M300 196 Q384 160 468 196'):
    return line(d, lighter(color, .35), 12)


def strands(color, ds):
    return ''.join(line(d, darker(color, .25), 6) for d in ds)


def back(d, color, extra=''):
    return svg(shape(d, color) + extra)


STYLES = {}


def style(name):
    def wrap(fn):
        STYLES[name] = fn
        return fn
    return wrap


@style('hair.starter-boy')
def starter_boy(c=BLACK):
    fringe = ('L548 300 Q540 262 516 250 Q500 286 470 262 Q452 296 420 258 Q396 292 368 256 '
              'Q342 290 316 258 Q296 288 268 262 Q244 272 222 304')
    return {'hair': svg(cap(fringe, c), shine(c), strands(c, ['M420 182 Q440 220 420 258', 'M330 186 Q326 224 316 258']))}


@style('hair.soft-crop')
def soft_crop(c=DARK):
    fringe = 'L552 330 Q548 270 520 262 Q470 284 384 280 Q298 284 248 262 Q220 270 216 330'
    return {'hair': svg(cap(fringe, c, top=132), shine(c), strands(c, ['M300 230 Q320 258 316 278', 'M450 230 Q448 258 456 278', 'M384 210 L384 278']))}


@style('hair.short-curls')
def short_curls(c=BROWN):
    blobs = [(248, 230), (300, 186), (360, 166), (420, 166), (480, 188), (528, 236), (230, 290), (540, 292),
             (280, 250), (340, 226), (400, 222), (460, 240), (510, 262)]
    p = cap('L548 290 Q520 262 480 270 Q430 250 384 262 Q338 250 288 270 Q248 262 220 290', c, top=146)
    p += ''.join(circle(x, y, 34, c) for x, y in blobs)
    p += ''.join(line(f'M{x - 14} {y - 6} Q{x} {y - 18} {x + 14} {y - 6}', lighter(c, .3), 7) for x, y in blobs[:6])
    return {'hair': svg(p)}


@style('hair.side-sweep')
def side_sweep(c=DARK):
    fringe = 'L550 300 Q536 250 500 232 Q470 270 420 286 Q350 300 290 286 Q250 278 226 300'
    p = cap(fringe, c, top=130)
    p += shape('M500 232 Q430 200 300 220 Q260 230 240 258 Q300 250 360 262 Q440 270 500 232 Z', lighter(c, .12))
    p += shine(c, 'M300 190 Q400 158 480 200') + strands(c, ['M480 226 Q420 262 330 262', 'M500 250 Q440 286 360 290'])
    return {'hair': svg(p)}


@style('hair.wavy-short')
def wavy_short(c=CHESTNUT):
    fringe = ('L554 330 Q560 290 534 270 Q516 300 488 272 Q466 300 436 268 Q410 298 384 266 '
              'Q358 298 332 268 Q302 300 280 272 Q252 300 234 270 Q208 290 214 330')
    p = cap(fringe, c, top=130) + shine(c)
    p += strands(c, ['M300 180 Q280 220 300 260', 'M384 162 Q366 210 384 256', 'M468 180 Q488 220 470 258'])
    return {'hair': svg(p)}


@style('hair.tidy-spikes')
def tidy_spikes(c=BLACK):
    top = ('M212 352 Q196 220 236 170 L230 110 L290 146 L310 82 L356 132 L392 64 L424 130 L470 84 L482 146 '
           'L544 112 L534 176 Q574 230 556 352 '
           'L548 296 Q530 262 506 254 L492 290 L462 258 L440 296 L414 258 L392 296 L368 258 L344 296 L322 258 L298 290 L278 256 Q244 266 222 300 Z')
    p = shape(top, c) + strands(c, ['M310 100 L330 180', 'M392 80 L394 170', 'M470 100 L452 180']) + shine(c, 'M290 200 Q384 170 478 200')
    return {'hair': svg(p)}


@style('hair.korean-fringe')
def korean_fringe(c=BLACK):
    fringe = ('L556 336 Q560 300 540 278 Q520 304 498 300 Q470 296 448 270 Q426 300 398 302 L384 252 '
              'L370 302 Q342 300 320 270 Q298 296 270 300 Q248 304 228 278 Q208 300 212 336')
    p = cap(fringe, c, top=128)
    p += strands(c, ['M384 160 L384 250', 'M350 180 Q322 230 300 290', 'M418 180 Q446 230 468 290'])
    p += shine(c, 'M296 192 Q384 154 472 192')
    return {'hair': svg(p)}


@style('hair.textured-quiff')
def textured_quiff(c=BROWN):
    fringe = 'L552 320 Q548 272 522 258 Q480 262 440 250 Q400 262 360 252 Q310 262 262 256 Q224 270 216 320'
    p = cap(fringe, c, top=126)
    p += shape('M262 262 Q238 160 330 116 Q420 82 492 126 Q448 120 410 150 Q440 160 470 196 Q400 180 352 206 Q300 228 262 262 Z', lighter(c, .1))
    p += strands(c, ['M300 220 Q320 160 380 130', 'M350 200 Q380 160 440 140'])
    p += line('M320 140 Q380 104 450 116', lighter(c, .4), 10)
    return {'hair': svg(p)}


@style('hair.starter-girl')
def starter_girl(c=DARK):
    fringe = ('L566 470 Q544 492 516 474 L520 300 Q500 270 488 252 Q450 290 400 282 Q380 250 360 284 '
              'Q300 290 266 252 Q256 280 248 300 L252 474 Q224 492 202 470')
    p = cap(fringe, c, top=132) + shine(c)
    p += strands(c, ['M536 320 L540 456', 'M232 320 L228 456'])
    p += circle(520, 222, 18, '#ff8fab') + circle(540, 210, 12, '#ffb3c6', SW - 1)
    return {'hair': svg(p)}


@style('hair.pony-tail')
def pony_tail(c=DARK):
    fringe = 'L552 322 Q548 270 516 254 Q480 282 430 270 Q400 290 384 266 Q368 290 338 270 Q288 282 252 254 Q220 270 216 322'
    p = cap(fringe, c, top=136) + shine(c)
    p += ellipse(540, 210, 22, 16, '#ffd166') + shine(c, 'M310 194 Q384 168 460 192')
    tail = 'M520 196 Q610 190 622 290 Q632 400 590 500 Q576 540 548 548 Q566 470 560 400 Q552 320 506 262 Z'
    return {'hair': svg(p), 'behind-body': back(tail, c, strands(c, ['M590 290 Q600 380 572 470', 'M560 260 Q584 330 566 420']))}


@style('hair.twist-braids')
def twist_braids(c=BLACK):
    fringe = 'L552 330 Q548 278 520 262 Q470 280 404 268 L384 244 L364 268 Q298 280 248 262 Q220 278 216 330'
    p = cap(fringe, c, top=136) + line('M384 140 L384 244', darker(c, .3), 6)
    for x0, dx in ((220, -1), (548, 1)):
        for i in range(6):
            y = 360 + i * 44
            p += ellipse(x0 + dx * (8 + i * 4), y, 26 - i, 24, c)
            p += line(f'M{x0 + dx * (8 + i * 4) - 16} {y - 6} Q{x0 + dx * (8 + i * 4)} {y + 10} {x0 + dx * (8 + i * 4) + 16} {y - 6}', lighter(c, .25), 5)
        p += ellipse(x0 + dx * 32, 626, 16, 12, '#ff6b6b')
    return {'hair': svg(p)}


@style('hair.wavy-bob')
def wavy_bob(c=CHESTNUT):
    fringe = 'L556 380 Q540 300 512 262 Q460 300 384 284 Q308 300 256 262 Q228 300 212 380'
    p = cap(fringe, c, top=130) + shine(c)
    p += strands(c, ['M520 300 Q548 340 530 384', 'M248 300 Q220 340 238 384', 'M330 180 Q300 230 320 270'])
    bk = 'M190 380 Q170 170 384 152 Q598 170 578 380 Q600 450 560 490 Q534 470 512 500 Q470 470 384 480 Q298 470 256 500 Q234 470 208 490 Q168 450 190 380 Z'
    return {'hair': svg(p), 'behind-body': back(bk, c)}


@style('hair.long-waves')
def long_waves(c=DARK):
    fringe = 'L558 400 Q560 300 528 258 Q500 296 440 286 Q404 276 392 240 Q372 290 318 292 Q266 290 242 258 Q206 300 210 400'
    p = cap(fringe, c, top=128) + shine(c, 'M300 190 Q384 156 470 190')
    p += strands(c, ['M536 300 Q564 360 540 420', 'M232 300 Q204 360 228 420'])
    bk = ('M186 380 Q160 160 384 148 Q608 160 582 380 Q612 460 586 540 Q606 610 568 680 Q540 650 520 690 '
          'Q480 640 384 650 Q288 640 248 690 Q228 650 200 680 Q162 610 182 540 Q156 460 186 380 Z')
    return {'hair': svg(p), 'behind-body': back(bk, c, strands(c, ['M214 460 Q190 540 220 620', 'M554 460 Q578 540 548 620']))}


@style('hair.space-buns')
def space_buns(c=BROWN):
    fringe = 'L552 330 Q548 276 520 258 Q480 290 428 276 Q400 300 384 270 Q368 300 340 276 Q288 290 248 258 Q220 276 216 330'
    p = ''.join(circle(x, 150, 64, c) + line(f'M{x - 36} 130 Q{x} 104 {x + 36} 130', lighter(c, .3), 9) for x in (250, 518))
    p += cap(fringe, c, top=140) + shine(c)
    p += ''.join(path(f'M{x - 56} 196 Q{x} 214 {x + 56} 196', 'none', '#ff8fab', 14) for x in (262, 506))
    return {'hair': svg(p)}
