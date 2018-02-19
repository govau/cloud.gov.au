import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import * as coaLogo from "./coa.svg";
import BaseLink, { LinkProps, RouterLinkProps } from "./Link";
import Container from "./Container";
import HeaderLinks from "./HeaderLinks";

const COALogo = styled.img`
  height: 5rem;
`;

const UnstyledBrandLink: React.StatelessComponent<
  Partial<LinkProps & RouterLinkProps>
> = ({ children, ...rest }) => <BaseLink {...rest}>{children}</BaseLink>;

const BrandLink = styled(UnstyledBrandLink)`
  display: block;
  border-bottom: 0;
`;

const Brand = styled.div`
  margin: 0;
  font-weight: 500;
  font-size: 1.5rem;
`;

const StyledHeader = styled.header`
  ${({ theme }) =>
    css`
      background-color: ${theme.headerColor};
    `};
  color: #ffffff;
`;

interface Props {}

const Header: React.StatelessComponent<Props> = () => (
  <StyledHeader>
    <Container>
      <Flex flexWrap="wrap" pt={3} pb={3} align="center">
        <Box pr={3}>
          <a href="/">
            <COALogo
              src={coaLogo}
              alt="The Australian Government Coat of Arms"
            />
          </a>
        </Box>
        <Box>
          <BrandLink to="/">
            <Brand>cloud.gov.au</Brand>
          </BrandLink>
        </Box>
        <Box w={[1, "auto"]} mt={[2, 0]} ml={[0, "auto"]}>
          <HeaderLinks />
        </Box>
      </Flex>
    </Container>
  </StyledHeader>
);

export default Header;
