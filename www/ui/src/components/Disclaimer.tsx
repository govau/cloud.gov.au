import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import * as star from "./star.svg";
import Container from "./Container";

const BrandLink = styled.a`
  text-decoration: none;
`;

const Star = styled.img`
  height: 1.25rem;
  margin-right: 0.5rem;
  vertical-align: middle;
`;

const Brand = styled.span`
  color: #ffffff;
  font-weight: 500;
  vertical-align: middle;
`;

const Official = styled.span`
  color: #ffffff;
  vertical-align: middle;
`;

const StyledDisclaimer = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.disclaimerColor};
    `};
`;

interface Props {}

const Disclaimer: React.StatelessComponent<Props> = () => (
  <StyledDisclaimer>
    <Container>
      <Flex wrap={true} pt={1} pb={1}>
        <Box w={[1, "auto"]} pr={2}>
          <BrandLink href="/">
            <Star src={star} alt="" />
            <Brand>GOV.AU</Brand>
          </BrandLink>
        </Box>
        <Box w={[1, "auto"]} mt={[1, 0]}>
          <Official>Official Australian Government website</Official>
        </Box>
      </Flex>
    </Container>
  </StyledDisclaimer>
);

export default Disclaimer;
