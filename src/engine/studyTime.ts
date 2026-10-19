// Study time counts only while the game is on screen and the child has touched it lately.
export const STUDY_TICK_MS = 10_000;
/** No tap or key for this long: the child has stepped away. */
export const IDLE_AFTER_MS = 60_000;
export const studySecondsForTick = (visible: boolean, lastInputAt: number, now: number): number =>
  visible && now - lastInputAt < IDLE_AFTER_MS ? STUDY_TICK_MS / 1000 : 0;
