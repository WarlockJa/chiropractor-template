export default function compareAsStrings(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
