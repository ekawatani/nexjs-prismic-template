import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { TokenizedTextRenderer } from './renderers/TokenizedTextRenderer';

const parseText = (text: string): [React.ReactNode, string[]] => {
  const collectedText: string[] = [];

  const parserOptions = {
    replace: (node): JSX.Element => {
      if (node.type === 'text') {
        collectedText.push(node.data);
      }

      if (node.type === 'tag') {
        if (node.name === 'w') {
          return <TokenizedTextRenderer>{domToReact(node.children, parserOptions)}</TokenizedTextRenderer>;
        }
      }
    },
  };

  const parsed = parse(text, parserOptions);

  return [parsed, collectedText];
};

export const t = (text: string): React.ReactNode => {
  const [parsed] = parseText(text);
  return parsed;
};

export const tStr = (text: string): string => {
  const [, collectedText] = parseText(text);
  return collectedText.join('');
};
