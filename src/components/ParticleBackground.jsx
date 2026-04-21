// Minimal animated background — subtle dot grid only
export default function ParticleBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* dot grid */}
      <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      {/* top gradient accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 280,
        background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,230,118,0.055) 0%, transparent 100%)',
      }} />
      {/* bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(to top, rgba(6,11,24,0.8), transparent)',
      }} />
    </div>
  );
}
