import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import * as dtaWorkmark from "./dta-wordmark-white.svg";
import Container from "./Container";
import Link from "./Link";
import FooterLinks from "./FooterLinks";

const subject = "Enquiry about cloud.gov.au";
const body = "\n\n---\nSource: cloud.gov.au footer";

const DTAWordmark = styled.img`
  height: 3rem;
`;

const Copyright = styled.p`
  ${({ theme }) =>
    css`
      color: ${theme.footerTextColor};
    `};
`;

const StyledFooter = styled.footer`
  ${({ theme }) =>
    css`
      background-color: ${theme.footerColor};
    `};
  color: #ffffff;
`;

interface Props {}

const Footer: React.StatelessComponent<Props> = () => (
  <StyledFooter>
    <Container>
      <Flex wrap={true} pt={3} pb={3} align="center">
        <Box w={[1, 1 / 2, 1 / 3]}>
          <Flex wrap={true} pt={3} pb={2} align="center">
            <Box>
              <a href="https://www.dta.gov.au/">
                <DTAWordmark src={dtaWorkmark} alt="DTA" />
              </a>
            </Box>
          </Flex>
        </Box>
        <Box w={[1, 1 / 2, 2 / 3]}>
          <FooterLinks />
          <p>
            <Link href="https://github.com/govau/cloud.gov.au">
              cloud.gov.au on GitHub
            </Link>
          </p>
          <p>
            Have a question about cloud.gov.au? Contact DTA:{" "}
            <Link
              href={`mailto:support@cloud.gov.au?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`}
            >
              support@cloud.gov.au
            </Link>
          </p>
          <Copyright>
            © Commonwealth of Australia. With the exception of the Commonwealth
            Coat of Arms and where otherwise noted, this work is licensed under
            the CC BY 4.0 license.
          </Copyright>
        </Box>
      </Flex>
    </Container>
  </StyledFooter>
);

export default Footer;
