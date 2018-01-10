declare module "loadable-components";
declare module "grid-styled";
declare module "styled-system";
declare module "@nivo/line";
declare module "@nivo/pie";
declare module "marksy";
declare module "marksy/components";
declare module "yamljs";

declare module "*.svg" {
  const content: string;
  export = content;
}

declare module "*.md" {
  const content: string;
  export = content;
}

declare module "*.yml" {
  const content: string;
  export = content;
}
