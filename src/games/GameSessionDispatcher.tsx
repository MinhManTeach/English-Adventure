import { TimeAttack } from './TimeAttack';
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
  onAnswerSubmit: (isCorrect: boolean, answer?: string) => void;
}

export const GameSessionDispatcher: React.FC<GameSessionDispatcherProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  switch (question.type) {
    case 'time-attack':
      return <TimeAttack key={question.id} question={question} onNext={onNext} onAnswerSubmit={onAnswerSubmit} />;
    case 'sentence-builder':
      return (
        <SentenceBuilder
          key={question.id}
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'matching':
      return (
        <PictureMatch
          key={question.id}
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'fill-gap':
      return (
        <FillGap
          key={question.id}
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );

    case 'error-hunter':
      return (
        <ErrorHunter
          key={question.id}
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
          key={question.id}
          question={question}
          onNext={onNext}
          onAnswerSubmit={onAnswerSubmit}
        />
      );
  }
};
