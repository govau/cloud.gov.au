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

const RetiringTag = styled.span`
  ${({ theme }) =>
  css`
    background-color: #000;
    color: #ffffff;
    font-weight: bold;
    vertical-align: middle;
    padding:3px;
  `};
`;

const StyledRetiring = styled.div`
  ${({ theme }) =>
    css`
      background-color: #45c2f0;
    `};
`;

interface Props {}

const Disclaimer: React.StatelessComponent<Props> = () => (
  <>
    <StyledRetiring>
      <Container>
        <Flex wrap={true} pt={1} pb={1}>
          <Box w={[1, "auto"]} pr={2}>
            <BrandLink href="/">
              <RetiringTag>Important</RetiringTag>
            </BrandLink>
          </Box>
          <Box w={[1, "auto"]} mt={[1, 0]}>
            <Official>Cloud.gov.au will be decommissioned by September 2021. Contact our <a href="mailto:support@cloud.gov.au">support</a> team for any questions.</Official>
          </Box>
        </Flex>
      </Container>
    </StyledRetiring>
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
  </>
);

export default Disclaimer;
