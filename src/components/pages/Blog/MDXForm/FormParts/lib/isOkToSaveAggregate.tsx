interface IIsOkToSaveAggregateProps {
  aggregate: { [key: string]: boolean };
  current: { [key: string]: boolean };
  override?: { value: boolean };
}

// this function aggregates states of the part primitives and defines if the whole part is allowed to save
export default function isOkToSaveAggregate({
  aggregate,
  current,
  override,
}: IIsOkToSaveAggregateProps): boolean {
  const currentEntry = Object.entries(current)[0];
  const { [currentEntry[0]]: _, ...rest } = aggregate;

  // an override is a field(s) that takes priority over the rest
  // example: HeroPart image primitive. If image is not chosen then the rest of the part changes are irrelevant
  if (override && !override.value) return false;

  return currentEntry[1]
    ? true
    : Object.values(rest).reduce((acc, cur) => (acc += Number(cur)), 0) > 0;
}
