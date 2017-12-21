import * as React from "react";
import styled from "../styled-components";
import { ResponsivePie } from "@nivo/pie";

import { theme } from "../theme";
import { Vector, Sample } from "../vector";

const sortFn = (a: Sample, b: Sample): number => {
  return Number(b.value[1]) - Number(a.value[1]);
};

const Wrapper = styled.div`
  height: 400px;
`;

interface Props {
  label: string;
  data: Vector;
}

const BuildpacksChart: React.StatelessComponent<Props> = ({ label, data }) => (
  <Wrapper>
    <ResponsivePie
      data={data.sort(sortFn).map((s: Sample) => ({
        id: s.metric.buildpack,
        label: s.metric.buildpack,
        value: Number(s.value[1]),
        color: theme.primaryColor
      }))}
      margin={{
        top: 40,
        right: 80,
        bottom: 80,
        left: 80
      }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={[theme.primaryColor, theme.secondaryColor]}
      borderColor="inherit:darker(0.6)"
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor={theme.textColor}
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor="inherit"
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#ffffff"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </Wrapper>
);

export default BuildpacksChart;
