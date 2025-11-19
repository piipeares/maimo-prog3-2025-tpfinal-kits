export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-neutral-100">{title}</h2>
    </div>
  );
}