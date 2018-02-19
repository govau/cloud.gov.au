import * as React from "react";
import styled, { css } from "../../styled-components";
import { Flex, Box } from "grid-styled";

import Container from "../Container";

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4rem;
  font-weight: 700;
`;

const Subheading = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const StyledHeader = styled.div`
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
      <Flex flexWrap="wrap" pt={2} pb={3}>
        <Box>
          <Heading>Cloud</Heading>
          <Subheading>
            A platform to make delivering and operating Government digital
            services easier.
          </Subheading>
        </Box>
      </Flex>
    </Container>
  </StyledHeader>
);

export default Header;
