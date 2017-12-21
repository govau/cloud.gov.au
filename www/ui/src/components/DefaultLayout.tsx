import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import Container from "./Container";

const Wrapper = styled.div`
  min-height: 50vh;
  ${({ theme }) =>
    css`
      background-color: ${theme.contentBgColor};
    `};
`;

interface Props {}

const DefaultLayout: React.StatelessComponent<Props> = ({ children }) => (
  <Wrapper>
    <Container>
      <Flex wrap={true}>
        <Box w={1} pt={3} pb={3}>
          {children}
        </Box>
      </Flex>
    </Container>
  </Wrapper>
);

export default DefaultLayout;
