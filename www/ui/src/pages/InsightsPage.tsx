import * as React from "react";
import Helmet from "react-helmet";
import styled, { css } from "../styled-components";
import { Flex, Box } from "grid-styled";

import { Vector } from "../vector";
import TotalApps from "../components/TotalApps";
import DeploymentsChart from "../components/DeploymentsChart";
import BuildpacksChart from "../components/BuildpacksChart";

const defaultErrorMessage = "An error occurred.";

const Wrapper = styled.div``;

const PageHeader = styled.h1`
  margin-top: 0;
  margin-bottom: 2rem;
  font-weight: 400;
  font-size: 2rem;
`;

const EnvWrapper = styled.div`
  ${({ theme }) =>
    css`
      border-top: 1px solid ${theme.borderColor};
    `};
`;

interface State {
  isFetching: boolean;
  error: any;
  total_non_system_cf_apps_staging: Vector;
  total_non_system_cf_apps_prev_week_staging: Vector;
  total_non_system_cf_apps_production: Vector;
  total_non_system_cf_apps_prev_week_production: Vector;
  buildpacks_staging: Vector;
  buildpacks_production: Vector;
  total_deployments_staging: Vector;
  total_deployments_production: Vector;
}

class InsightsPage extends React.Component<{}, Partial<State>> {
  state: Partial<State> = {};

  componentDidMount() {
    this.load();
  }

  async load() {
    this.setState(() => ({ isFetching: true, error: null }));

    const metrics = [
      "total_non_system_cf_apps_staging",
      "total_non_system_cf_apps_prev_week_staging",
      "total_non_system_cf_apps_production",
      "total_non_system_cf_apps_prev_week_production",
      "buildpacks_staging",
      "buildpacks_production",
      "total_deployments_staging",
      "total_deployments_production"
    ];
    const ps = metrics.map(m => {
      return fetch(
        `${process.env.REACT_APP_API_ENDPOINT ||
          ""}/api/get-stat/?id=${encodeURIComponent(m)}`,
        {
          headers: {
            Accept: "application/json"
          },
          credentials: "same-origin"
        }
      ).then(resp => ({
        m,
        resp
      }));
    });
    try {
      const resps = await Promise.all(ps);
      for (const { m, resp } of resps) {
        const body = await resp.json();
        this.setState(() => ({
          [m]: body
        }));
      }
    } catch (e) {
      console.error(e);
      this.setState(() => ({ error: e.message || defaultErrorMessage }));
    } finally {
      this.setState(() => ({ isFetching: false }));
    }
  }

  render() {
    const {
      isFetching,
      error,
      total_non_system_cf_apps_staging,
      total_non_system_cf_apps_prev_week_staging,
      total_non_system_cf_apps_production,
      total_non_system_cf_apps_prev_week_production,
      buildpacks_staging,
      buildpacks_production,
      total_deployments_staging,
      total_deployments_production
    } = this.state;

    const helmet = (
      <Helmet>
        <title>Insights</title>
      </Helmet>
    );

    if (isFetching) {
      return (
        <Wrapper>
          {helmet}
          <Box width={[1]} py={3}>
            <div>Loading...</div>
          </Box>
        </Wrapper>
      );
    }

    if (error) {
      return (
        <React.Fragment>
          {helmet}
          <PageHeader>Could not load insights</PageHeader>
          {error === defaultErrorMessage ? (
            <p>That's all we know.</p>
          ) : (
            <React.Fragment>
              <p>What we know:</p>
              <pre>{JSON.stringify(error)}</pre>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }

    return (
      <Wrapper>
        {helmet}
        <PageHeader>Insights</PageHeader>
        <EnvWrapper>
          <Flex wrap={true} align="center">
            {total_non_system_cf_apps_staging &&
            total_non_system_cf_apps_prev_week_staging ? (
              <Box width={[1, 1 / 3]}>
                <TotalApps
                  label="staging"
                  total={total_non_system_cf_apps_staging}
                  totalPrevWeek={total_non_system_cf_apps_prev_week_staging}
                />
              </Box>
            ) : null}
            {total_deployments_staging ? (
              <Box width={[1, 2 / 3]}>
                <DeploymentsChart
                  label="staging"
                  data={total_deployments_staging}
                />
              </Box>
            ) : null}
          </Flex>
          {buildpacks_staging ? (
            <Flex wrap={true}>
              <Box width={1} p={[0, 3]}>
                <BuildpacksChart label="staging" data={buildpacks_staging} />
              </Box>
            </Flex>
          ) : null}
        </EnvWrapper>
        <EnvWrapper>
          <Flex wrap={true} align="center">
            {total_non_system_cf_apps_production &&
            total_non_system_cf_apps_prev_week_production ? (
              <Box width={[1, 1 / 3]}>
                <TotalApps
                  label="production"
                  total={total_non_system_cf_apps_production}
                  totalPrevWeek={total_non_system_cf_apps_prev_week_production}
                />
              </Box>
            ) : null}
            {total_deployments_production ? (
              <Box width={[1, 2 / 3]}>
                <DeploymentsChart
                  label="production"
                  data={total_deployments_production}
                />
              </Box>
            ) : null}
          </Flex>
          {buildpacks_production ? (
            <Flex wrap={true}>
              <Box width={1} p={[0, 3]}>
                <BuildpacksChart
                  label="production"
                  data={buildpacks_production}
                />
              </Box>
            </Flex>
          ) : null}
        </EnvWrapper>
      </Wrapper>
    );
  }
}

export default InsightsPage;
