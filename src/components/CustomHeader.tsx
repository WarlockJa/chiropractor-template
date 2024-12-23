export default function CustomHeader({
  text,
  fontSizeRem = 1,
  className,
}: {
  text: string;
  fontSizeRem?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className={"relative font-bold"}>
        <div
          className={`absolute left-0 top-0 opacity-10`}
          style={{
            fontSize: `${fontSizeRem * 2}rem`,
            transform: `translate(-${fontSizeRem * 10}px, -${fontSizeRem * 16}px)`,
          }}
        >
          {text.slice(0, 1)}
        </div>
        <h1 style={{ fontSize: `${fontSizeRem}rem` }}>{text}</h1>
      </div>
    </div>
  );
}
