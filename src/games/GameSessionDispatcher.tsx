import React from 'react';
import { Question } from '../types';
import { ChooseGame } from './ChooseGame';
import { SentenceBuilder } from './SentenceBuilder';
import { PictureMatch } from './PictureMatch';
import { FillGap } from './FillGap';
import { ErrorHunter } from './ErrorHunter';

interface GameSessionDispatcherProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

export const GameSessionDispatcher: React.FC<GameSessionDispatcherProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  switch (question.type) {
    case 'sentence-builder':
      return (
        <SentenceBuilder
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'matching':
      return (
        <PictureMatch
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'fill-gap':
      return (
        <FillGap
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'error-hunter':
      return (
        <ErrorHunter
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'multiple-choice':
    case 'listen-choice':
    default:
      return (
        <ChooseGame
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );
  }
};
