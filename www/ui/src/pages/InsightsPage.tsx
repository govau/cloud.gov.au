import * as React from "react";
import Helmet from "react-helmet";
import styled from "../styled-components";
import { Flex, Box } from "grid-styled";

import { Vector } from "../vector";
import TotalApps from "../components/TotalApps";
import DeploymentsChart from "../components/DeploymentsChart";
import BuildpacksChart from "../components/BuildpacksChart";

const defaultErrorMessage = "An error occurred.";

const Wrapper = styled.div`
  text-align: center;
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
      return fetch(`/api/get-stat/?id=${encodeURIComponent(m)}`, {
        credentials: "same-origin"
      }).then(resp => ({
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

    const helmet = <Helmet title="Insights" />;

    if (isFetching) {
      return (
        <Wrapper>
          {helmet}
          <Flex wrap={true}>
            <Box width={[1]} p={3}>
              <div>Loading...</div>
            </Box>
          </Flex>
        </Wrapper>
      );
    }

    // TODO(jonathaningram): this gets server rendered, need to fix.
    if (error) {
      return (
        <React.Fragment>
          {helmet}
          <h2>Could not load insights</h2>
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
        {total_non_system_cf_apps_staging &&
        total_non_system_cf_apps_prev_week_staging ? (
          <TotalApps
            label="staging"
            total={total_non_system_cf_apps_staging}
            totalPrevWeek={total_non_system_cf_apps_prev_week_staging}
          />
        ) : null}
        <Flex wrap={true}>
          <Box width={[1]} p={[0, 3]}>
            {total_deployments_staging && (
              <DeploymentsChart
                label="staging"
                data={total_deployments_staging}
              />
            )}
          </Box>
        </Flex>
        {buildpacks_staging ? (
          <Flex wrap={true}>
            <Box width={1} p={3}>
              <h2>Staging apps distribution</h2>
              <BuildpacksChart label="staging" data={buildpacks_staging} />
            </Box>
          </Flex>
        ) : null}
        {total_non_system_cf_apps_production &&
        total_non_system_cf_apps_prev_week_production ? (
          <TotalApps
            label="production"
            total={total_non_system_cf_apps_production}
            totalPrevWeek={total_non_system_cf_apps_prev_week_production}
          />
        ) : null}
        <Flex wrap={true}>
          <Box width={[1]} p={[0, 3]}>
            {total_deployments_production && (
              <DeploymentsChart
                label="production"
                data={total_deployments_production}
              />
            )}
          </Box>
        </Flex>
        {buildpacks_production ? (
          <Flex wrap={true}>
            <Box width={1} p={3}>
              <h2>Production apps distribution</h2>
              <BuildpacksChart
                label="production"
                data={buildpacks_production}
              />
            </Box>
          </Flex>
        ) : null}
        {!"TODO" ? (
          <Flex wrap>
            <Box width={[1, 1 / 2]} p={3}>
              <h2>Domains</h2>
              <ul>
                <li>marketplace</li>
                <li>guides</li>
                <li>smart-cities</li>
                <li>dashboard</li>
                <li>dashboard</li>
                <li>gold</li>
              </ul>
            </Box>
          </Flex>
        ) : null}
      </Wrapper>
    );
  }
}

export default InsightsPage;
