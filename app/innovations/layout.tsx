import CircuitBackground from '../components/CircuitBackground';

export default function InnovationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white">
      <CircuitBackground />
      <div className="grid-texture" />
      {children}
    </div>
  );
}
