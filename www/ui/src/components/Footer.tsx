import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import * as coaLogo from "./coa.svg";
import * as dtaLogo from "./dta.svg";
import Container from "./Container";
import Link from "./Link";

const COALogo = styled.img`
  height: 5rem;
`;

const DTALogo = styled.img`
  height: 3rem;
`;

interface LogoSeparatorProps {
  className?: string;
}

const UnstyledLogoSeparator: React.StatelessComponent<LogoSeparatorProps> = ({
  className
}) => (
  <React.Fragment>
    <Box width={[1 / 16]} className={className} />
    <Box width={[1 / 16]} />
  </React.Fragment>
);

const LogoSeparator = styled(UnstyledLogoSeparator)`
  height: 3rem;
  ${({ theme }) =>
    css`
      border-right: 2px solid ${theme.footerLogoDividerColor};
    `};
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
              <COALogo src={coaLogo} alt="" />
            </Box>
            <LogoSeparator />
            <Box>
              <a href="https://www.dta.gov.au/">
                <DTALogo src={dtaLogo} alt="DTA" />
              </a>
            </Box>
          </Flex>
        </Box>
        <Box w={[1, 1 / 2, 2 / 3]}>
          <p>
            <Link href="http://status.cloud.gov.au/">Status</Link>
          </p>
          <p>
            <Link href="https://github.com/govau/cloud.gov.au">
              cloud.gov.au on GitHub
            </Link>
          </p>
          <p>
            Have a question about cloud.gov.au? Contact DTA:{" "}
            <Link href="mailto:support@cloud.gov.au">support@cloud.gov.au</Link>
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
