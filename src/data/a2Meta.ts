// A2 worlds (chapters 15–28) and their units, read from each chapter's meta.ts.
import type { UnitInfo } from '../types';
import type { WorldConfig } from './worlds';
import * as m15 from './chapters/chapter15/meta';
import * as m16 from './chapters/chapter16/meta';
import * as m17 from './chapters/chapter17/meta';
import * as m18 from './chapters/chapter18/meta';
import * as m19 from './chapters/chapter19/meta';
import * as m20 from './chapters/chapter20/meta';
import * as m21 from './chapters/chapter21/meta';
import * as m22 from './chapters/chapter22/meta';
import * as m23 from './chapters/chapter23/meta';
import * as m24 from './chapters/chapter24/meta';
import * as m25 from './chapters/chapter25/meta';
import * as m26 from './chapters/chapter26/meta';
import * as m27 from './chapters/chapter27/meta';
import * as m28 from './chapters/chapter28/meta';
const METAS: { units: UnitInfo[]; world: WorldConfig | null }[] = [m15, m16, m17, m18, m19, m20, m21, m22, m23, m24, m25, m26, m27, m28];
/** Only worlds whose content is written; the rest stay hidden. */
const READY = METAS.filter(m => m.world);
export const A2_WORLDS: WorldConfig[] = READY.map(m => m.world!);
export const A2_UNITS: UnitInfo[] = READY.flatMap(m => m.units);
