import { TChartPrimitiveErrorsMatrix } from "../chartPrimitive";

export default function getNoErrors(errors: TChartPrimitiveErrorsMatrix) {
  return !Boolean(errors.find((row) => row.find((value) => value)));
}
