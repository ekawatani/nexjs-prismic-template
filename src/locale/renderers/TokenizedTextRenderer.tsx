import React from 'react';
import styles from './TokenizedTextRenderer.module.scss';

export const TokenizedTextRenderer: React.FunctionComponent = props => {
  return (
    <span className={styles.text}>{props.children}</span>
  );
};
