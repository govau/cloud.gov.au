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
  margin: 1rem 1rem 0 0;
`;

const UnstyledLink: React.StatelessComponent<
  Partial<LinkProps & RouterLinkProps>
> = ({ children, ...rest }) => <BaseLink {...rest}>{children}</BaseLink>;

const Link = styled(UnstyledLink)``;

interface Props {}

const FooterLinks: React.StatelessComponent<Props> = () => (
  <Ul>
    <Li>
      <Link href="https://console.system.b.cld.gov.au/">
        Production console
      </Link>
    </Li>
    <Li>
      <Link href="https://console.system.y.cld.gov.au/">Staging console</Link>
    </Li>
    <Li>
      <Link href="http://status.cloud.gov.au/">Status</Link>
    </Li>
  </Ul>
);

export default FooterLinks;
