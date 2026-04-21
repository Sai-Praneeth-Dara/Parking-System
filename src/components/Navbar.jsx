import { Icons } from './Icons';

const navItems = [
  { id: 'dashboard', label: 'Dashboard',    Icon: Icons.Dashboard },
  { id: 'park',      label: 'Park Vehicle', Icon: Icons.Park },
  { id: 'exit',      label: 'Exit Vehicle', Icon: Icons.Exit },
  { id: 'slots',     label: 'Slot Status',  Icon: Icons.Slots },
  { id: 'revenue',   label: 'Revenue',      Icon: Icons.Revenue },
];

export default function Navbar({ activePage, setActivePage }) {
  return (
    <header className="topbar">
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>

        {/* Brand */}
        <div
          onClick={() => setActivePage('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icons.Gauge width={18} height={18} color="#060b18" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>SRM Parking Management</div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '0.5px' }}>SMART SLOT MONITORING SYSTEM</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`nav-item ${activePage === id ? 'active' : ''}`}
            >
              <Icon width={15} height={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div className="dot dot-green dot-pulse" />
          <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>Live</span>
        </div>
      </div>
    </header>
  );
}
