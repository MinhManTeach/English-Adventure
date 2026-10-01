/**
 * Pure testable answer validation and normalization.
 */

export function normalizeAnswerText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    // Remove terminal punctuation
    .replace(/[.?!,;:]+$/g, '')
    // Collapse multiple whitespace
    .replace(/\s+/g, ' ')
    // Normalize apostrophes (curly vs straight)
    .replace(/[’‘`]/g, "'");
}

export function checkAnswer(userAnswer: string | string[], expectedAnswer: string | string[]): boolean {
  // If user answer is an array of words (e.g. from SentenceBuilder)
  const normalizedUser = Array.isArray(userAnswer)
    ? normalizeAnswerText(userAnswer.join(' '))
    : normalizeAnswerText(userAnswer);

  if (Array.isArray(expectedAnswer)) {
    return expectedAnswer.some(ans => normalizeAnswerText(ans) === normalizedUser);
  }

  return normalizeAnswerText(expectedAnswer) === normalizedUser;
}

/**
 * Checks if a partial word bank sentence has potential or has reached full length
 */
export function joinWords(words: string[]): string {
  return words.join(' ');
}
