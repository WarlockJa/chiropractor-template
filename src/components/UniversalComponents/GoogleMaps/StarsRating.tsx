export default function StarsRating({
  rating,
  size,
}: {
  rating: number;
  size?: number;
}) {
  const content = [...Array(5)].map((_, index) =>
    rating - index >= 1 ? (
      <img key={index} className="h-full" src="/star_rate.png" />
    ) : rating - index > 0 ? (
      <img key={index} className="h-full" src="/star_rate_half.png" />
    ) : (
      <img key={index} className="h-full" src="/star_rate_empty.png" />
    ),
  );

  return (
    <div className="flex" style={{ height: `${size}em` }}>
      {content}
    </div>
  );
}
