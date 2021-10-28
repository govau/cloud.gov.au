import * as React from "react";
import Helmet from "react-helmet";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import Container from "../components/Container";
import Link from "../components/Link";
import Header from "../components/HomePage/Header";


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
          <Flex wrap={true} px={2} pt={3} pb={0}>
            <Box w={[1, 1]} pt={[1, 1]} pr={[0, 1]}>
              <FeatureHeading>
                Cloud.gov.au has been decommissioned
              </FeatureHeading>
            </Box>
          </Flex>
          <Flex wrap={true} px={2} pt={0} pb={4}>
            <FeatureP>
              The cloud.gov.au platform closed on 30 September 2021 and no longer provides whole-of-government hosting services.
            </FeatureP>
            <FeatureP>
              All materials created while the service was in operation can be found in our <Link href="https://github.com/govau">GitHub open-source code</Link> repository.
            </FeatureP>
            <FeatureP>
              Information about cloud.gov.au can be found on the <Link href="https://www.dta.gov.au/our-projects/about-cloudgovau">Digital Transformation Agency website</Link>.
            </FeatureP>
            <FeatureP>
              To source cloud services for government, please visit the <Link href="https://www.buyict.gov.au/sp?id=buyer&kb=KB0010616">Cloud Marketplace</Link>.
            </FeatureP>
          </Flex>
        </Container>
      </Ribbon1>
    </Content>
  </React.Fragment>
);

export default HomePage;
