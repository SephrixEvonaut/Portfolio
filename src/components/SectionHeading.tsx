interface Props {
  label: string;
  id: string;
}

export default function SectionHeading({ label, id }: Props) {
  return (
    <div id={id} className="scroll-mt-24 mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{label}</h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-blue-500" />
    </div>
  );
}
