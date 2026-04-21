import { useParking } from '../context/ParkingContext';
import { Icons } from '../components/Icons';

const VICON  = { Car: Icons.Car,  Bike: Icons.Bike,  Truck: Icons.Truck };
const VCOLOR = { Car: 'var(--green)', Bike: 'var(--blue)', Truck: 'var(--orange)' };

function RevenueBar({ type, rev, total, color }) {
  const pct = total > 0 ? (rev / total) * 100 : 0;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{type}</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{Math.round(pct)}%</span>
          <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color }}>{`₹${rev}`}</span>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Revenue({ setActivePage }) {
  const { revenue, revenueHistory, tickets, RATES } = useParking();

  const carRev  = revenueHistory.filter(r => r.vehicleType === 'Car').reduce((a, r) => a + r.fee, 0);
  const bikeRev = revenueHistory.filter(r => r.vehicleType === 'Bike').reduce((a, r) => a + r.fee, 0);
  const truckRev= revenueHistory.filter(r => r.vehicleType === 'Truck').reduce((a, r) => a + r.fee, 0);
  const txTotal  = revenueHistory.length;
  const avgFee   = txTotal > 0 ? Math.round(revenue / txTotal) : 0;

  return (
    <div className="anim-fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={() => setActivePage('dashboard')}>
          <Icons.ArrowLeft width={16} height={16} />
        </button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Revenue</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Earnings summary and transaction history</p>
        </div>
      </div>

      {/* TOP METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total Revenue',    val: `₹${revenue.toLocaleString()}`, icon: <Icons.Revenue width={20} height={20}/>, color: 'var(--green)',  accent: 'green'  },
          { label: 'Transactions',     val: txTotal,                         icon: <Icons.Ticket  width={20} height={20}/>, color: 'var(--blue)',   accent: 'blue'   },
          { label: 'Avg Fee / Vehicle',val: `₹${avgFee}`,                    icon: <Icons.TrendUp width={20} height={20}/>, color: 'var(--orange)', accent: 'orange' },
          { label: 'Active Vehicles',  val: tickets.filter(t=>!t.exitTime).length, icon: <Icons.Car width={20} height={20}/>, color: 'var(--purple)', accent: 'purple' },
        ].map((m, i) => (
          <div key={m.label} className={`stat-card ${m.accent}`} style={{ animationDelay: `${i*0.07}s` }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, marginBottom: 14,
              background: `${m.color}18`, color: m.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{m.icon}</div>
            <div className="font-mono" style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-1)', marginBottom: 4 }}>{m.val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Revenue Breakdown */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.TrendUp width={16} height={16} color="var(--green)" /> Revenue by Type
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <RevenueBar type="Car"   rev={carRev}   total={revenue} color="var(--green)"  />
            <RevenueBar type="Bike"  rev={bikeRev}  total={revenue} color="var(--blue)"   />
            <RevenueBar type="Truck" rev={truckRev} total={revenue} color="var(--orange)" />
          </div>
          {revenue === 0 && (
            <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-3)', fontSize: 13 }}>
              No revenue yet. Exit vehicles to see earnings.
            </div>
          )}
        </div>

        {/* Per-type stats */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.Activity width={16} height={16} color="var(--blue)" /> Type Breakdown
          </div>
          <table className="tbl">
            <thead>
              <tr><th>Type</th><th>Trips</th><th>Rate</th><th>Revenue</th></tr>
            </thead>
            <tbody>
              {['Car','Bike','Truck'].map(vt => {
                const hist = revenueHistory.filter(r => r.vehicleType === vt);
                const Ic = VICON[vt];
                return (
                  <tr key={vt}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: VCOLOR[vt] }}>
                        <Ic width={15} height={15}/> <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{vt}</span>
                      </div>
                    </td>
                    <td><span className="font-mono" style={{ color: 'var(--text-2)' }}>{hist.length}</span></td>
                    <td><span style={{ color: 'var(--text-3)' }}>₹{RATES[vt]}/hr</span></td>
                    <td>
                      <span className="font-mono" style={{ fontWeight: 700, color: VCOLOR[vt] }}>
                        ₹{hist.reduce((a,r)=>a+r.fee,0)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.Clock width={16} height={16} color="var(--orange)" /> Transaction History
          </div>
          <span className="badge badge-orange">{txTotal} total</span>
        </div>
        {revenueHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-3)', fontSize: 14 }}>
            <Icons.Revenue width={32} height={32} color="var(--text-3)" style={{ margin: '0 auto 12px' }} />
            <div>No transactions yet</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr><th>Ticket</th><th>Plate</th><th>Type</th><th>Duration</th><th>Rate</th><th>Fee</th><th>Time</th></tr>
              </thead>
              <tbody>
                {revenueHistory.map(r => {
                  const Ic = VICON[r.vehicleType];
                  return (
                    <tr key={r.id}>
                      <td><span className="font-mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.id}</span></td>
                      <td><span style={{ fontWeight: 600, color: 'var(--text-1)' }}>{r.plate}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: VCOLOR[r.vehicleType] }}>
                          <Ic width={14} height={14}/> {r.vehicleType}
                        </div>
                      </td>
                      <td><span className="font-mono" style={{ color: 'var(--text-2)' }}>{r.hours}h</span></td>
                      <td><span style={{ color: 'var(--text-3)' }}>₹{RATES[r.vehicleType]}/hr</span></td>
                      <td><span className="font-mono" style={{ fontWeight: 700, color: 'var(--green)' }}>₹{r.fee}</span></td>
                      <td><span style={{ fontSize: 12, color: 'var(--text-3)' }}>{r.time.toLocaleTimeString()}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Tickets */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icons.Ticket width={16} height={16} color="var(--purple)" /> All Tickets
          </div>
          <span className="badge badge-purple">{tickets.length} issued</span>
        </div>
        {tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px 0', color: 'var(--text-3)', fontSize: 13 }}>No tickets issued yet</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr><th>ID</th><th>Owner</th><th>Plate</th><th>Type</th><th>Slot</th><th>Entry</th><th>Status</th><th>Fee</th></tr>
              </thead>
              <tbody>
                {tickets.map(t => {
                  const Ic = VICON[t.vehicleType];
                  return (
                    <tr key={t.id}>
                      <td><span className="font-mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{t.id}</span></td>
                      <td><span style={{ color: 'var(--text-1)' }}>{t.ownerName}</span></td>
                      <td><span style={{ fontWeight: 600 }}>{t.licensePlate}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: VCOLOR[t.vehicleType] }}>
                          <Ic width={14} height={14}/> {t.vehicleType}
                        </div>
                      </td>
                      <td>
                        <span className="font-mono" style={{ fontSize: 12, padding: '2px 8px', borderRadius: 6, background: 'var(--navy-600)', color: 'var(--text-2)' }}>{t.slotId}</span>
                      </td>
                      <td><span style={{ fontSize: 12, color: 'var(--text-3)' }}>{t.entryTime.toLocaleTimeString()}</span></td>
                      <td>
                        <span className={`badge badge-${t.status === 'active' ? 'green' : 'blue'}`}>
                          <span className={`dot dot-${t.status === 'active' ? 'green dot-pulse' : 'blue'}`} style={{ width: 5, height: 5 }} />
                          {t.status === 'active' ? 'Parked' : 'Done'}
                        </span>
                      </td>
                      <td>
                        {t.fee != null
                          ? <span className="font-mono" style={{ fontWeight: 700, color: 'var(--green)' }}>₹{t.fee}</span>
                          : <span style={{ color: 'var(--text-3)', fontSize: 12 }}>pending</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
