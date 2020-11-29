import React from 'react';
import { Heading } from './Heading';
import { Band } from './layouts/containers.css/Band';
import { Content } from './layouts/containers.css/Content';

export interface MastheadProps {
  title: () => React.ReactNode;
  subtitle: () => React.ReactNode;
}

export const Masthead: React.FunctionComponent<MastheadProps> = props => {
  return (
    <Band>
      <Content>

      <Heading level={1}>
        {props.title()}
      </Heading>

      <div>
        {props.subtitle()}
      </div>

      <div>{props.children}</div>

      </Content>
    </Band>
  );
};
