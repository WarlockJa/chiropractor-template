export default function Blockquote({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <blockquote className="rounded-lg py-1 md:mx-20 md:pl-10 md:pr-8">
      {children}
    </blockquote>
  );
}
