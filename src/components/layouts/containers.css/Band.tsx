import React from 'react';
import classnames from 'classnames';

export interface BandProps {
  className?: string;
}

export const Band: React.FunctionComponent<BandProps> = props => {
  return (
    <div className={classnames('containers-Band', props.className)}>{props.children}</div>
  );
};
