import React from 'react';
import styles from './Layout.module.scss';
import { Masthead } from '../components/Masthead';
import { Content } from './containers.css/Content';

export const Layout: React.FunctionComponent = props => {
  return (
    <div className={styles['layout']}>
      <Content>
        <Masthead />
      </Content>
      {props.children}
    </div>
  );
};
