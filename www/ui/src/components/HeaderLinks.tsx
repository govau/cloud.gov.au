import * as React from "react";
import styled from "../styled-components";
import { space, responsiveStyle } from "styled-system";

import BaseLink, { LinkProps, RouterLinkProps } from "./Link";

const mediaDisplay = responsiveStyle({
  cssProperty: "display"
});

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

interface LiProps {
  display: string[];
  m: number[];
}

const UnstyledLi: React.StatelessComponent<
  LiProps & React.HTMLProps<HTMLLIElement>
> = ({ children, ...rest }) => <li {...rest}>{children}</li>;

const StyledLi = styled(UnstyledLi)`
  ${mediaDisplay};
  ${space};
`;

const Li: React.StatelessComponent<{}> = ({ children }) => (
  <StyledLi display={["block", "inline-block"]} m={[1]}>
    {children}
  </StyledLi>
);

const UnstyledLink: React.StatelessComponent<
  Partial<LinkProps & RouterLinkProps>
> = ({ children, ...rest }) => <BaseLink {...rest}>{children}</BaseLink>;

const Link = styled(UnstyledLink)``;

interface Props {}

const HeaderLinks: React.StatelessComponent<Props> = () => (
  <Ul>
    <Li>
      <Link href="https://docs.cloud.gov.au/">Docs</Link>
    </Li>
  </Ul>
);

export default HeaderLinks;
