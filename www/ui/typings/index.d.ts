declare module "loadable-components";
declare module "grid-styled";
declare module "styled-system";
declare module "@nivo/line";
declare module "@nivo/pie";

declare module "*.svg" {
  const content: string;
  export = content;
}
