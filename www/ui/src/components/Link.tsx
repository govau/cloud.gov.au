import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "../styled-components";

import Theme from "../theme";
import { LinkProps as ReactRouterLinkProps } from "react-router-dom";

export interface BaseLinkProps {
  className?: string;
}

export interface RouterLinkProps extends BaseLinkProps, ReactRouterLinkProps {}

export interface LinkProps extends BaseLinkProps {
  href?: string;
}

export const isRouterLink = (
  link: Partial<RouterLinkProps>
): link is RouterLinkProps => link.to !== undefined;

const styles = ({ theme }: { theme: Theme }) =>
  css`
    color: ${theme.linkColor};
    border-bottom: solid 1px ${theme.linkUnderlineColor};
    &:hover {
      color: ${theme.linkHoverColor};
      background-color: ${theme.linkHoverBgColor};
      border-bottom-color: ${theme.linkHoverBgColor};
    }
  `;

const StyledLink = styled.a`
  transition: 0.25s;
  text-decoration: none;
  ${styles};
`;

const StyledRouterLink = styled(RouterLink)`
  transition: 0.25s;
  text-decoration: none;
  ${styles};
`;

const Link: React.StatelessComponent<LinkProps | RouterLinkProps> = props => {
  const { children, className } = props;
  if (isRouterLink(props)) {
    const { to, ...rest } = props;
    return (
      <StyledRouterLink className={className} to={to} {...rest}>
        {children}
      </StyledRouterLink>
    );
  }
  const { href } = props;
  return (
    <StyledLink className={className} href={href}>
      {children}
    </StyledLink>
  );
};

export default Link;
