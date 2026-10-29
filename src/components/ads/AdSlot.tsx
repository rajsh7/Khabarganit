export default function AdSlot({
  position,
  width,
  height,
  label,
}: {
  position: string;
  width: number;
  height: number;
  label?: string;
}) {
  return (
    <div
      className="ad-placeholder rounded mx-auto"
      style={{ width, height, maxWidth: "100%" }}
      data-ad-position={position}
    >
      <div className="text-center">
        <p className="font-jost text-gray-400 text-xs uppercase tracking-widest mb-1">
          Advertisement
        </p>
        <p className="text-gray-500 text-xs">{label || `${width}×${height}`}</p>
      </div>
    </div>
  );
}
