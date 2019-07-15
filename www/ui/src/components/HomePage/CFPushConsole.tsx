import * as React from "react";
import styled, { css } from "../../styled-components";

import { Console } from "../Window";

const Label = styled.span`
  font-weight: 600;
`;

const BinaryLabel = styled(Label)`
  ${({ theme }) =>
    css`
      color: ${theme.console.labels.binaryColor};
    `};
`;

const CFAppLabel = styled(Label)`
  ${({ theme }) =>
    css`
      color: ${theme.console.labels.cfAppColor};
    `};
`;

const OKLabel = styled(Label)`
  ${({ theme }) =>
    css`
      color: ${theme.console.labels.okColor};
    `};
`;

const CFAppStartedLabel = styled(Label)`
  ${({ theme }) =>
    css`
      color: ${theme.console.labels.cfAppStartedColor};
    `};
`;

const Prompt = styled.span`
  ${({ theme }) =>
    css`
      color: ${theme.console.promptColor};
    `};
`;

const Caret = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 1rem;
  vertical-align: middle;

  ${({ theme }) =>
    css`
      border-bottom: 1px solid ${theme.console.caretColor};
    `};
`;

const CFPushConsole: React.StatelessComponent = () => (
  <Console.Window>
    <Console.Header>bash</Console.Header>
    <Console.Body>
      ▲ <Prompt>~/my-app $</Prompt> ls
      <br />
      Procfile main.go manifest.yml <BinaryLabel>my-app</BinaryLabel>
      <br />▲ <Prompt>~/my-app $</Prompt> cf push
      <br />
      Uploading <CFAppLabel>my-app</CFAppLabel>...
      <br />
      Uploading 2.1M, 3 files
      <br />
      Done uploading
      <br />
      <OKLabel>OK</OKLabel>
      <br />
      1 of 1 instances running
      <br />
      <CFAppStartedLabel>App started</CFAppStartedLabel>
      <br />▲ <Prompt>~/my-app</Prompt> $ <Caret />
    </Console.Body>
  </Console.Window>
);

export default CFPushConsole;
