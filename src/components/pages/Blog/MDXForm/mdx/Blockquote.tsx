export default function Blockquote({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <blockquote className="rounded-lg bg-accent/40 py-1">{children}</blockquote>
  );
}
