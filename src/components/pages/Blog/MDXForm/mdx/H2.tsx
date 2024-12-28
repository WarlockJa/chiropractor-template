export default function H2({ children }: { children?: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-4 self-start px-2 font-sans text-3xl font-medium text-foreground">
      {children}
    </h2>
  );
}
