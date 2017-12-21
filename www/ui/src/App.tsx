import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider, css } from "./styled-components";

import { theme } from "./theme";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import InsightsPage from "./pages/InsightsPage";
import NotFoundPage from "./pages/NotFoundPage";
import DefaultLayout from "./components/DefaultLayout";
import Disclaimer from "./components/Disclaimer";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Wrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.bgColor};
    `};
`;

const Main = styled.main``;

interface Props {}

const App: React.StatelessComponent<Props> = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Disclaimer />
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={() => <HomePage />} />
            <Route
              exact
              path="/about/"
              component={() => (
                <DefaultLayout>
                  <AboutPage />
                </DefaultLayout>
              )}
            />
            <Route
              exact
              path="/insights/"
              component={() => (
                <DefaultLayout>
                  <InsightsPage />
                </DefaultLayout>
              )}
            />
            <Route
              path="*"
              component={() => (
                <DefaultLayout>
                  <NotFoundPage />
                </DefaultLayout>
              )}
            />
          </Switch>
        </Main>
        <Footer />
      </Wrapper>
    </ThemeProvider>
  </Router>
);

export default App;
