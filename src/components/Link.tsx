import React from 'react';

export interface LinkProps {
  href: string;
  target?: '_self' | '_blank';
}

export const Link: React.FunctionComponent<LinkProps> = props => {
  return (
    <a href={props.href} target={props.target}>{props.children}</a>
  );
};
