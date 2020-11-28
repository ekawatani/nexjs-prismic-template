import React from 'react';
import { UnreachableCaseError } from 'ts-essentials';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading: React.FunctionComponent<HeadingProps> = props => {
  const Tag = getHeadingTag(props.level);
  return (
    <Tag>{props.children}</Tag>
  );
};

const getHeadingTag = (level: 1 | 2 | 3 | 4 | 5 | 6): keyof JSX.IntrinsicElements => {
  switch (level) {
    case 1:
      return 'h1';
    case 2:
      return 'h2';
    case 3:
      return 'h3';
    case 4:
      return 'h4';
    case 5:
      return 'h5';
    case 6:
      return 'h6';
    default:
      throw new UnreachableCaseError(level);
  }
};
