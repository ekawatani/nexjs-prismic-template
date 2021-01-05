import React from 'react';
import NextLink from 'next/link';

export interface LinkProps {
  href: string;
  className?: string;
  theme?: string;
  attrs?: React.AriaAttributes;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps & { children: React.ReactNode }>(function Link(props, ref) {
  return (
    <NextLink href={props.href}>
      <a
        className={props.className}
        {...props.attrs}
        ref={ref}
      >
        {props.children}
      </a>
    </NextLink>
  );
});
