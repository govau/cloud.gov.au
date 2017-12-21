import * as React from "react";
import styled from "../styled-components";

import BaseLink, { LinkProps, RouterLinkProps } from "./Link";

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Li = styled.li`
  display: inline-block;
  margin: 1rem;
`;

const UnstyledLink: React.StatelessComponent<
  Partial<LinkProps & RouterLinkProps>
> = ({ children, ...rest }) => <BaseLink {...rest}>{children}</BaseLink>;

const Link = styled(UnstyledLink)``;

interface Props {}

const HeaderLinks: React.StatelessComponent<Props> = () => (
  <Ul>
    <Li>
      <Link to="/insights/">Insights</Link>
    </Li>
    <Li>
      <Link to="/about/">About</Link>
    </Li>
    <Li>
      <Link href="https://docs.cloud.gov.au/">Docs</Link>
    </Li>
    <Li>
      <Link href="https://support.cloud.gov.au/">Support</Link>
    </Li>
  </Ul>
);

export default HeaderLinks;
