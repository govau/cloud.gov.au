import * as React from "react";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import Container from "../components/Container";
import Link from "../components/Link";
import Header from "../components/HomePage/Header";

const subject = "Enquiry about cloud.gov.au";
const body = "\n\n---\nSource: cloud.gov.au home page";

const Content = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.contentBgColor};
    `};
`;

const P = styled.p`
  font-size: 1.5rem;
`;

interface Props {}

const HomePage: React.StatelessComponent<Props> = () => (
  <React.Fragment>
    <Header />
    <Content>
      <Container>
        <Flex wrap={true}>
          <Box w={1} pt={3} pb={3}>
            <P>
              <Link to="/docs/">
                <strong>Link to docs (TODO remove)</strong>
              </Link>{" "}
            </P>
            <P>
              <Link to="/">
                <strong>cloud.gov.au</strong>
              </Link>{" "}
              is a faster, safer, standard way to change web apps without
              impacting users. It makes it easier for government to release,
              monitor and grow user-facing digital services, freeing up teams to
              focus on writing code that meets user needs.
            </P>
            <P>
              As of December 2017, cloud.gov.au has 26 apps in production, and
              81 apps in development across our programs of work.
            </P>
            <P>
              DTA services running on cloud.gov.au include the{" "}
              <Link href="https://www.dta.gov.au/what-we-do/platforms/marketplace/">
                Digital Marketplace
              </Link>, the{" "}
              <Link href="https://www.dta.gov.au/what-we-do/platforms/performance/">
                Performance Dashboard
              </Link>, the{" "}
              <Link href="https://smart-cities.dashboard.gov.au/">
                National Cities Performance Framework Dashboard
              </Link>, and the australia.gov.au{" "}
              <Link href="https://media.australia.gov.au">
                Media Release Service
              </Link>.
            </P>

            <P>
              We{" "}
              <Link href="http://status.cloud.gov.au">
                publish real time performance statistics
              </Link>{" "}
              of both the cloud.gov.au platform itself, and the apps running on
              cloud.gov.au.
            </P>

            <P>
              If you are interested in building new digital services on
              cloud.gov.au, please{" "}
              <Link
                href={`mailto:support@cloud.gov.au?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`}
              >
                get in contact with us
              </Link>.
            </P>
          </Box>
        </Flex>
      </Container>
    </Content>
  </React.Fragment>
);

export default HomePage;
