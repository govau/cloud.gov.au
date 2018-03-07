import * as React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";
import styled, { ThemeProvider, css } from "./styled-components";

import { theme } from "./theme";
import AnalyticsListener, { sendPageview } from "./AnalyticsListener";
import * as Routes from "./Routes";
import DefaultLayout from "./components/DefaultLayout";
import Disclaimer from "./components/Disclaimer";
import Header from "./components/Header";
import Footer from "./components/Footer";

const history = createBrowserHistory();

history.listen(sendPageview);

const title = "cloud.gov.au";

const Wrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.bgColor};
    `};
`;

const Main = styled.main``;

interface Props {}

const App: React.StatelessComponent<Props> = () => (
  <Router history={history}>
    <React.Fragment>
      <AnalyticsListener />
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Helmet titleTemplate={`%s - ${title}`}>
            {process.env.REACT_APP_META_ROBOTS && (
              <meta name="robots" content={process.env.REACT_APP_META_ROBOTS} />
            )}
          </Helmet>
          <Disclaimer />
          <Header />
          <Main>
            <Switch>
              <Route exact path="/" component={() => <Routes.HomePage />} />
              <Route
                exact
                path="/code/"
                component={() => (
                  <DefaultLayout>
                    <Routes.CodePage />
                  </DefaultLayout>
                )}
              />
              <Route
                exact
                path="/insights/"
                component={() => (
                  <DefaultLayout>
                    <Routes.InsightsPage />
                  </DefaultLayout>
                )}
              />
              <Route
                exact
                path="/terms-of-service/"
                component={() => (
                  <DefaultLayout>
                    <Routes.TermsPage />
                  </DefaultLayout>
                )}
              />
              <Route
                path="*"
                component={() => (
                  <DefaultLayout>
                    <Routes.NotFoundPage />
                  </DefaultLayout>
                )}
              />
            </Switch>
          </Main>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </React.Fragment>
  </Router>
);

export default App;
