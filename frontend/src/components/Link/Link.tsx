import * as React from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((
  itemProps,
  ref,
) => {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});
