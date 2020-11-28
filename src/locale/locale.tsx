import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { TokenizedTextRenderer } from './renderers/TokenizedTextRenderer';

export const t = (text: string): React.ReactNode => {
  // If I need to inject some strings, then do it here before parsing the text.
  // What to inject can be passed into this function. Then, the translation string
  // should have a placeholder such as {{...}} so it can be replaced.

  const options = {
    replace: (node): JSX.Element => {
      if (node.type === 'tag' && node.name === 'w') {
        return <TokenizedTextRenderer>{domToReact(node.children, options)}</TokenizedTextRenderer>;
      }
    },
  };

  return parse(text, options);
};
