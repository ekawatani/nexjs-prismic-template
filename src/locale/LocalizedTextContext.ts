import React from 'react';
import { LocalizedText } from './LocalizedText';

export interface ILocalizedTextContext {
  text: LocalizedText;
}

export const LocalizedTextContext = React.createContext<ILocalizedTextContext>({ text: {} as LocalizedText });
