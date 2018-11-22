import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";
import { responsiveStyle } from "styled-system";

import * as coaLogo from "./coa.svg";
import BaseLink, { LinkProps, RouterLinkProps } from "./Link";
import Container from "./Container";
import HeaderLinks from "./HeaderLinks";

const mediaDisplay = responsiveStyle({
  cssProperty: "display"
});

const COABox = styled(Box)`
  ${mediaDisplay};
`;

const COALogo = styled.img`
  height: 5rem;
  padding-right: 1rem;
  ${({ theme }) =>
    css`
      border-right: 1px solid ${theme.coaDividerColor};
    `};
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
      <Flex wrap={true} pt={3} pb={3} align="center">
        <COABox pr={2} display={["none", "block"]}>
          <a href="/">
            <COALogo
              src={coaLogo}
              alt="The Australian Government Coat of Arms"
            />
          </a>
        </COABox>
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
