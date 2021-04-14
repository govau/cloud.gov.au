import * as React from "react";
import Helmet from "react-helmet";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import Container from "../components/Container";
import Link from "../components/Link";
import Header from "../components/HomePage/Header";
import CFPushConsole from "../components/HomePage/CFPushConsole";
import DevEnvOne from "../components/DevEnvironment/DevEnvOne"
import DevEnvTwo from "../components/DevEnvironment/DevEnvTwo"

const body = "\n\n---\nSource: cloud.gov.au home page";

const Content = styled.div`
  ${({ theme }) =>
    css`
      border-top: 6px solid ${theme.headerDividerColor};
      background-color: ${theme.contentBgColor};
    `};
`;

const P = styled.p`
  font-size: 1.5rem;
`;

const Ribbon1 = styled.section`
  background: #fafafa;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: #eaeaea;
`;

const FeatureHeading = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
`;

const FeatureList = styled.ul`
  font-size: 1rem;
  line-height: 1.5rem;
`;

const FeatureP = styled(P)`
  font-size: 1rem;
  color: #666666;
`;

const HomePage: React.StatelessComponent = () => (
  <React.Fragment>
    <Helmet>
      <title />
    </Helmet>
    <Header />
    <Content>
      <Ribbon1>
        <Container px={0}>
          <Flex wrap={true} px={2} pt={[2, 4]} pb={4}>
            <Box w={[1, 1 / 2]} pt={[1, 3]} pb={[1, 3]} pr={[0, 3]}>
              <FeatureHeading>
                Focus on your <strong>services</strong>, not your servers
              </FeatureHeading>
              <FeatureP>
                Install{" "}
                <Link href="https://docs.cloudfoundry.org/cf-cli/">
                  Cloud Foundry CLI tools
                </Link>{" "}
                and deploy with ease
              </FeatureP>
              <FeatureList>
                <li>Write your code in any programming language</li>
                <li>Automatic HTTPS / certificates</li>
                <li>Deploy instantly, deploy often</li>
              </FeatureList>
            </Box>
            <Box w={[1, 1 / 2]} pt={[1, 3]} pb={[1, 3]} pl={[0, 3]}>
              <CFPushConsole />
            </Box>
          </Flex>
        </Container>
      </Ribbon1>

      <Container px={0}>
        <Flex wrap={true} px={2} pt={[0, 4]} pb={4}>
          <Box w={[1, 1 / 2]} pt={[1, 3]} pb={[1, 3]} pr={[0, 10]}>
            <DevEnvOne />
          </Box>
          <Box w={[1, 1 / 2]} pt={[2, 3]} pb={[1, 3]} pr={[0, 3]}>
            <DevEnvTwo />
          </Box>
        </Flex>
      </Container>

      <Container px={0}>
        <Flex wrap={true} px={2} py={[2, 4]}>
          <Box w={[1, 1 / 3]} pr={[0, 3]}>
            <FeatureHeading>Automatically secure</FeatureHeading>
            <FeatureP>
              We provision and renew SSL certificates automatically.
            </FeatureP>
            <FeatureP>
              Thanks to{" "}
              <Link href="https://letsencrypt.org/">Let’s Encrypt</Link>, you
              get security at zero cost, for as many domains as you want.
            </FeatureP>
          </Box>
          <Box w={[1, 1 / 3]} px={[0, 3]}>
            <FeatureHeading>Programming languages</FeatureHeading>
            <FeatureP>
              Supported languages and frameworks include Go, Java, .NET,
              Node.js, PHP, Python, Ruby, static files and binaries.
            </FeatureP>
            <FeatureP>
              Learn about{" "}
              <Link href="https://docs.cloudfoundry.org/buildpacks/">
                Cloud Foundry buildpacks
              </Link>
              .
            </FeatureP>
          </Box>
          <Box w={[1, 1 / 3]} pl={[0, 3]}>
            <FeatureHeading>Services</FeatureHeading>
            <FeatureP>
              Seamlessly connect your application to backend services.
            </FeatureP>
            <FeatureP>
              Available services include Postgres, MySQL and ElasticSearch.
            </FeatureP>
            <FeatureP>
              <Link
                href={`mailto:support@cloud.gov.au?subject=${encodeURIComponent(
                  "Enquiry about cloud.gov.au - interested in missing service"
                )}&body=${encodeURIComponent(body)}`}
              >
                Get in contact with us
              </Link>{" "}
              if we’re missing a service that you need.
            </FeatureP>
          </Box>
        </Flex>
      </Container>
    </Content>
  </React.Fragment>
);

export default HomePage;
