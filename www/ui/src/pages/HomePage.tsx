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
                Cloud.gov.au will be decommissioned
              </FeatureHeading>
            </Box>
          </Flex>
          <Flex wrap={true} px={2} pt={0} pb={4}>
            <Box w={[1, 1 / 2]} pt={[1, 1]} pb={[1, 3]} pr={[0, 3]}>
              <FeatureP>
                The cloud.gov.au platform is being decommissioned by the DTA and will no longer provide whole-of-government hosting services. 
              </FeatureP>
              <FeatureP>
                We appreciate your support of the cloud.gov.au platform. The DTA will contact current users of the platform and provide more information.
              </FeatureP>
            </Box>
            <Box w={[1, 1 / 2]} pt={[1, 1]} pb={[1, 3]} pr={[0, 3]}>
              <FeatureP>
                For further details or if you have any questions, please contact our support team at <Link href="mailto:support@cloud.gov.au">support@cloud.gov.au</Link>.
              </FeatureP>
              <FeatureP>
                To source a Cloud platform and cloud services for government, please <Link href="https://www.buyict.gov.au/sp?id=buyer&kb=KB0010616">visit the Cloud Marketplace</Link>.
              </FeatureP>
              <FeatureP>
                Thank you for your support of Cloud.gov.au.
              </FeatureP>
            </Box>
          </Flex>
        </Container>
      </Ribbon1>
    </Content>
  </React.Fragment>
);

export default HomePage;
