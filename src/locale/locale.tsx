import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { TokenizedTextRenderer } from './renderers/TokenizedTextRenderer';

export interface TranslateOptions {
  /**
   * Indicates that all custom renderings are ignored and a string is produced.
   * Use this if the text needs to be used in a string format such as HTML attributes.
   */
  ignoreFormatting: boolean;
}

export const t = (text: string, options?: TranslateOptions): React.ReactNode => {
  // If I need to inject some strings, then do it here before parsing the text.
  // What to inject can be passed into this function. Then, the translation string
  // should have a placeholder such as {{...}} so it can be replaced.

  const collectedText: string[] = [];

  const parserOptions = {
    replace: (node): JSX.Element => {
      if (options?.ignoreFormatting) {
        if (node.type === 'text') {
          collectedText.push(node.data);
        }

        return undefined;
      }

      if (node.type === 'tag' && node.name === 'w') {
        return <TokenizedTextRenderer>{domToReact(node.children, parserOptions)}</TokenizedTextRenderer>;
      }
    },
  };

  const parsed = parse(text, parserOptions);

  return options?.ignoreFormatting ? collectedText.join('') : parsed;
};
