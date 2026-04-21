import { useParking } from '../context/ParkingContext';
import { Icons } from '../components/Icons';

function StatCard({ icon, label, value, sub, accent, delay = 0 }) {
  return (
    <div className={`stat-card ${accent}`} style={{ animationDelay: `${delay}s` }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div
          className="icon-box"
          style={{
            width: 40, height: 40,
            background: accent === 'green' ? 'var(--green-dim)' : accent === 'red' ? 'var(--red-dim)' : accent === 'orange' ? 'var(--orange-dim)' : accent === 'blue' ? 'var(--blue-dim)' : 'var(--purple-dim)',
            color: accent === 'green' ? 'var(--green)' : accent === 'red' ? 'var(--red)' : accent === 'orange' ? 'var(--orange)' : accent === 'blue' ? 'var(--blue)' : 'var(--purple)',
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{sub}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.1, marginBottom: 5 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{label}</div>
    </div>
  );
}

function QuickAction({ icon, label, sub, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'var(--card-2)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '18px 20px',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '44';
        e.currentTarget.style.background = color + '0a';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--card-2)';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 10, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{sub}</div>
      </div>
      <Icons.ChevronRight width={16} height={16} color="var(--text-3)" />
    </button>
  );
}

function OccupancyBar({ type, icon, occupied, total, color }) {
  const pct = total > 0 ? (occupied / total) * 100 : 0;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ color, opacity: 0.8 }}>{icon}</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>{type}</span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--text-2)' }}>
          <span style={{ color, fontWeight: 600 }}>{occupied}</span>/{total} occupied
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Dashboard({ setActivePage }) {
  const { getStats, revenue, tickets, RATES } = useParking();
  const s = getStats();
  const recent = tickets.slice(0, 6);
  const occupancyPct = Math.round((s.occupiedSlots / s.totalSlots) * 100);

  const alertCount = s.carOccupied === s.carTotal ? 1 : 0
    + (s.bikeOccupied === s.bikeTotal ? 1 : 0)
    + (s.truckOccupied === s.truckTotal ? 1 : 0);

  return (
    <div className="anim-fade-up">
      {/* PAGE HEADER */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>Real-time parking slot overview · 12 total slots</p>
        </div>
        {alertCount > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            background: 'var(--orange-dim)', border: '1px solid rgba(255,140,66,0.25)',
            borderRadius: 10, color: 'var(--orange)', fontSize: 13, fontWeight: 500,
          }}>
            <Icons.Alert width={15} height={15} />
            {alertCount} slot type{alertCount > 1 ? 's' : ''} full
          </div>
        )}
      </div>

      {/* STATS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard icon={<Icons.Slots width={20} height={20}/>} label="Total Parking Slots" value={s.totalSlots} sub="Capacity" accent="blue" delay={0} />
        <StatCard icon={<Icons.Check width={20} height={20}/>} label="Available Slots" value={s.freeSlots} sub="Free" accent="green" delay={0.05} />
        <StatCard icon={<Icons.Car width={20} height={20}/>} label="Occupied Slots" value={s.occupiedSlots} sub="In Use" accent="red" delay={0.1} />
        <StatCard icon={<Icons.Ticket width={20} height={20}/>} label="Active Tickets" value={s.activeTickets} sub="Live" accent="orange" delay={0.15} />
        <StatCard icon={<Icons.Revenue width={20} height={20}/>} label="Total Revenue" value={`₹${revenue.toLocaleString()}`} sub="Earnings" accent="purple" delay={0.2} />
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>

        {/* LEFT: Occupancy + Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* OCCUPANCY */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Gauge width={16} height={16} color="var(--green)" />
                Slot Occupancy
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  className="badge"
                  style={{
                    background: occupancyPct >= 80 ? 'var(--red-dim)' : occupancyPct >= 50 ? 'var(--orange-dim)' : 'var(--green-dim)',
                    color: occupancyPct >= 80 ? 'var(--red)' : occupancyPct >= 50 ? 'var(--orange)' : 'var(--green)',
                    border: `1px solid ${occupancyPct >= 80 ? 'rgba(255,59,92,.25)' : occupancyPct >= 50 ? 'rgba(255,140,66,.25)' : 'rgba(0,230,118,.25)'}`,
                    fontSize: 13, fontWeight: 700,
                  }}
                >
                  {occupancyPct}% Full
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <OccupancyBar type="Cars" icon={<Icons.Car width={16} height={16}/>} occupied={s.carOccupied} total={s.carTotal} color="var(--green)" />
              <OccupancyBar type="Bikes" icon={<Icons.Bike width={16} height={16}/>} occupied={s.bikeOccupied} total={s.bikeTotal} color="var(--blue)" />
              <OccupancyBar type="Trucks" icon={<Icons.Truck width={16} height={16}/>} occupied={s.truckOccupied} total={s.truckTotal} color="var(--orange)" />
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Activity width={16} height={16} color="var(--blue)" />
                Recent Activity
              </div>
              <button onClick={() => setActivePage('revenue')} style={{ fontSize: 12, color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                View all →
              </button>
            </div>
            {recent.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '28px 0', color: 'var(--text-3)', fontSize: 13 }}>
                No activity yet. Park a vehicle to get started.
              </div>
            ) : (
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Ticket</th><th>Plate</th><th>Type</th><th>Slot</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map(t => (
                    <tr key={t.id}>
                      <td><span className="font-mono" style={{ fontSize: 12, color: 'var(--text-2)' }}>{t.id}</span></td>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{t.licensePlate}</span></td>
                      <td>
                        <span style={{ color: t.vehicleType === 'Car' ? 'var(--green)' : t.vehicleType === 'Bike' ? 'var(--blue)' : 'var(--orange)', fontSize: 13 }}>
                          {t.vehicleType}
                        </span>
                      </td>
                      <td>
                        <span className="font-mono" style={{
                          fontSize: 12, padding: '2px 8px', borderRadius: 6,
                          background: 'var(--navy-600)', color: 'var(--text-2)',
                        }}>{t.slotId}</span>
                      </td>
                      <td>
                        <span className={`badge badge-${t.status === 'active' ? 'green' : 'purple'}`}>
                          <span className={`dot dot-${t.status === 'active' ? 'green' : 'pulse'}`} style={{ width: 5, height: 5 }} />
                          {t.status === 'active' ? 'Active' : 'Done'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* RIGHT: Quick Actions + Pricing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* QUICK ACTIONS */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16 }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <QuickAction icon={<Icons.Park width={20} height={20}/>} label="Park Vehicle" sub="Allocate a new slot" color="var(--green)" onClick={() => setActivePage('park')} />
              <QuickAction icon={<Icons.Exit width={20} height={20}/>} label="Exit Vehicle" sub="Process departure" color="var(--red)" onClick={() => setActivePage('exit')} />
              <QuickAction icon={<Icons.Slots width={20} height={20}/>} label="View Slots" sub="Check availability" color="var(--blue)" onClick={() => setActivePage('slots')} />
              <QuickAction icon={<Icons.Revenue width={20} height={20}/>} label="Revenue" sub="Earnings summary" color="var(--purple)" onClick={() => setActivePage('revenue')} />
            </div>
          </div>

          {/* PRICING CARD */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Revenue width={16} height={16} color="var(--purple)" />
              Pricing Rates
            </div>
            {[
              { type: 'Car',   icon: <Icons.Car   width={18} height={18}/>, rate: RATES.Car,   color: 'var(--green)'  },
              { type: 'Bike',  icon: <Icons.Bike  width={18} height={18}/>, rate: RATES.Bike,  color: 'var(--blue)'   },
              { type: 'Truck', icon: <Icons.Truck width={18} height={18}/>, rate: RATES.Truck, color: 'var(--orange)' },
            ].map(r => (
              <div key={r.type} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid var(--border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: r.color }}>{r.icon}
                  <span style={{ fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}>{r.type}</span>
                </div>
                <div>
                  <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: r.color }}>₹{r.rate}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 3 }}>/hr</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--orange-dim)', borderRadius: 8, border: '1px solid rgba(255,140,66,0.2)' }}>
              <div style={{ fontSize: 11, color: 'var(--orange)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.Alert width={12} height={12} />
                Minimum billing: 1 hour applied
              </div>
            </div>
          </div>

          {/* SLOT MINI SUMMARY */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 14 }}>Slot Summary</div>
            {[
              { type: 'Car',   icon: <Icons.Car   width={15} height={15}/>, free: s.carTotal - s.carOccupied,     total: s.carTotal,   color: 'var(--green)'  },
              { type: 'Bike',  icon: <Icons.Bike  width={15} height={15}/>, free: s.bikeTotal - s.bikeOccupied,   total: s.bikeTotal,  color: 'var(--blue)'   },
              { type: 'Truck', icon: <Icons.Truck width={15} height={15}/>, free: s.truckTotal - s.truckOccupied, total: s.truckTotal, color: 'var(--orange)' },
            ].map(r => (
              <div key={r.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: r.color }}>{r.icon}
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{r.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={`badge badge-${r.free === 0 ? 'red' : 'green'}`} style={{ fontSize: 11 }}>
                    {r.free} free
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>/ {r.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
