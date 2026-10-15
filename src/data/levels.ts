import type { CEFRLevel } from '../types';

/** A1 is Units 1–42 (chapters 1–14). A2 continues as Units 43–84 (chapters 15–28). */
export const A1_LAST_UNIT = 42;
export const A1_LAST_CHAPTER = 14;
export const levelOfUnit = (unit: number): CEFRLevel => (unit > A1_LAST_UNIT ? 'A2' : 'A1');
export const levelOfChapter = (chapter: number): CEFRLevel => (chapter > A1_LAST_CHAPTER ? 'A2' : 'A1');
/** The unit number printed in the book: A2 Unit 1 is unit id 43. */
export const bookUnitNumber = (unit: number) => (unit > A1_LAST_UNIT ? unit - A1_LAST_UNIT : unit);
