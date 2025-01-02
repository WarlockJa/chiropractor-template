import Link from "next/link";

export default function A(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  return (
    // @ts-ignore
    <Link {...props} target="_blank" className="hover:text-accent" />
  );
}
