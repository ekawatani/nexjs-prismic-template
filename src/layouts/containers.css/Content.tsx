import React from 'react';
import classnames from 'classnames';

export interface ContentProps {
  className?: string;
}

export const Content: React.FunctionComponent<ContentProps> = props => {
  return (
    <div className={classnames('containers-Content', props.className)}>{props.children}</div>
  );
};
