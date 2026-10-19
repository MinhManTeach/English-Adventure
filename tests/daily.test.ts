import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState } from '../src/services/storage';
import { xpEarnedOn, weekActivity, sentenceOfTheDay } from '../src/engine/daily';
import { LEARN_CARDS_DATA } from '../src/data/learnContent';
import { IDLE_AFTER_MS, studySecondsForTick } from '../src/engine/studyTime';

const log = (completedAt: string, xpEarned: number) => ({ id: completedAt, unitId: 1, stageId: 'practice', completedAt, score: 5, total: 6, xpEarned, coinsEarned: 5, accuracy: 83, durationSeconds: 30 });

test('daily XP only counts lessons finished that day', () => {
  const state = { ...createDefaultState(), attemptLogs: [log('2026-10-12T09:00:00', 20), log('2026-10-12T15:00:00', 15), log('2026-10-11T09:00:00', 40), log('bad', 99)] };
  assert.equal(xpEarnedOn(state, '2026-10-12'), 35);
  assert.equal(xpEarnedOn(state, '2026-10-10'), 0);
});

test('the week runs Monday to Sunday and marks practice days', () => {
  const state = { ...createDefaultState(), activeDays: ['2026-10-12', '2026-10-14', '2026-10-05'] };
  const week = weekActivity(state, '2026-10-14'); // a Wednesday
  assert.deepEqual(week.map(d => d.date), ['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18']);
  assert.deepEqual(week.map(d => d.active), [true, false, true, false, false, false, false]);
  assert.equal(week.find(d => d.isToday)?.label, 'T4');
});

test('the sentence of the day comes from the unit and stays the same all day', () => {
  const first = sentenceOfTheDay(11, '2026-10-12');
  assert.deepEqual(sentenceOfTheDay(11, '2026-10-12'), first);
  assert.ok(LEARN_CARDS_DATA[11].some(card => card.examples.includes(first)));
});

test('study time counts only while the game is on screen and the child is active', () => {
  const now = 1_000_000;
  assert.equal(studySecondsForTick(true, now - 5_000, now), 10);
  assert.equal(studySecondsForTick(false, now - 5_000, now), 0); // another tab, or the screen is off
  assert.equal(studySecondsForTick(true, now - IDLE_AFTER_MS, now), 0); // left open on the home screen
});
