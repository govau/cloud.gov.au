import * as React from "react";
import styled from "../../styled-components";
import { Flex, Box } from "grid-styled";

const WindowWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Window: React.StatelessComponent<{}> = ({ children }) => (
  <WindowWrapper>{children}</WindowWrapper>
);

const ConsoleWrapper = styled.div`
  background-color: #000000;
  color: #ffffff;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.3);
  border: 1px solid #000000;
  border-radius: 0.3125rem;
`;

const ConsoleWindow: React.StatelessComponent<{}> = ({ children }) => (
  <ConsoleWrapper>
    <Window>{children}</Window>
  </ConsoleWrapper>
);

const HeaderWrapper = styled.div`
  font-size: 0.875rem;
`;

const Icon = styled.span`
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
`;

const CloseIcon = styled(Icon)`
  margin-left: 0;
  background-color: #ff5f56;
`;

const MinimizeIcon = styled(Icon)`
  background-color: #ffbd2e;
`;

const FullscreenIcon = styled(Icon)`
  margin-right: 0;
  background-color: #27c93f;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

const Header: React.StatelessComponent<{}> = ({ children }) => (
  <HeaderWrapper>
    <Flex wrap={true} p={2} align="flex-end">
      <CloseIcon />
      <MinimizeIcon />
      <FullscreenIcon />
      <TitleWrapper>{children}</TitleWrapper>
    </Flex>
  </HeaderWrapper>
);

const ConsoleHeader: React.StatelessComponent<{}> = ({ children }) => (
  <Header>{children}</Header>
);

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Body: React.StatelessComponent<{}> = ({ children }) => (
  <BodyWrapper>
    <Flex wrap={true} p={2} pt={0} pb={3}>
      <Box>{children}</Box>
    </Flex>
  </BodyWrapper>
);

const Pre = styled.pre`
  margin: 0;
  line-height: 1.25rem;
`;

const ConsoleBody: React.StatelessComponent<{}> = ({ children }) => (
  <Body>
    <Pre>{children}</Pre>
  </Body>
);

export { ConsoleWindow, ConsoleHeader, ConsoleBody };
