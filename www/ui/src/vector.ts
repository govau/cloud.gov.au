interface Metric {
  [key: string]: string;
}

export interface Sample {
  metric: Metric;
  value: [number, string];
}

export interface Vector extends Array<Sample> {}

export const isValidVectorNumber = (v: Vector): boolean => {
  if (v.length !== 1) {
    return false;
  }
  const { value: values } = v[0];
  if (values.length !== 2) {
    return false;
  }
  return true;
};

export const vectorToNumber = (v: Vector): number => {
  if (v.length !== 1) {
    return 0;
  }
  const { value: values } = v[0];
  if (values.length !== 2) {
    return 0;
  }
  return Number(values[1]);
};
