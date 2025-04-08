export default function PanelLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <section>
      {children}
    </section>
  );
}
