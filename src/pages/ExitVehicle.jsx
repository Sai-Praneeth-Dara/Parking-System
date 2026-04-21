import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { Icons } from '../components/Icons';

const VICON = { Car: Icons.Car, Bike: Icons.Bike, Truck: Icons.Truck };
const VCOLOR = { Car: 'var(--green)', Bike: 'var(--blue)', Truck: 'var(--orange)' };

export default function ExitVehicle({ onToast, setActivePage }) {
  const { exitVehicle, tickets, RATES } = useParking();
  const active = tickets.filter(t => !t.exitTime);

  const [plate, setPlate] = useState('');
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const preview = plate.length >= 3 ? active.find(t => t.licensePlate === plate.toUpperCase()) : null;
  const estFee = preview ? Math.max(1, Number(hours)) * RATES[preview.vehicleType] : 0;

  const handlePlate = (val) => {
    setPlate(val.toUpperCase());
    setReceipt(null);
  };

  const handleExit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const res = exitVehicle({ licensePlate: plate, simulatedHours: Number(hours) });
    setLoading(false);
    if (res.success) {
      setReceipt(res.ticket);
      setPlate(''); setHours(1);
      onToast({ type: 'success', title: 'Vehicle Exited', message: `Fee: ₹${res.fee} collected` });
    } else {
      onToast({ type: 'error', title: 'Not Found', message: res.message });
    }
  };

  return (
    <div className="anim-fade-up" style={{ maxWidth: 860, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={() => setActivePage('dashboard')}>
          <Icons.ArrowLeft width={16} height={16} />
        </button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Exit Vehicle</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Process departure and generate bill</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

        {/* FORM */}
        <div className="card" style={{ padding: 28 }}>
          <form onSubmit={handleExit}>
            {/* Plate input */}
            <div style={{ marginBottom: 20 }}>
              <label className="lbl" htmlFor="exitPlate">License Plate</label>
              <input
                id="exitPlate" className={`inp ${plate.length >= 3 && !preview ? 'inp-error' : ''}`}
                placeholder="e.g. MH12AB1234"
                value={plate}
                onChange={e => handlePlate(e.target.value)}
                required maxLength={15}
              />
              {plate.length >= 3 && !preview && (
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icons.Alert width={12} height={12} /> No active vehicle found
                </div>
              )}
            </div>

            {/* Vehicle preview */}
            {preview && (() => {
              const Ic = VICON[preview.vehicleType];
              return (
                <div className="anim-scale-in" style={{
                  marginBottom: 20, padding: '16px 18px', borderRadius: 12,
                  background: 'var(--green-dim)', border: '1px solid rgba(0,230,118,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ color: VCOLOR[preview.vehicleType] }}><Ic width={20} height={20} /></div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Vehicle Found</div>
                    <span className="font-mono" style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-2)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>
                      {preview.slotId}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: 13 }}>
                    {[['Owner', preview.ownerName], ['Vehicle', preview.vehicleType], ['Entry', preview.entryTime.toLocaleTimeString()], ['Ticket', preview.id]].map(([k, v]) => (
                      <div key={k}>
                        <span style={{ color: 'var(--text-3)' }}>{k}: </span>
                        <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Duration slider */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label className="lbl" style={{ marginBottom: 0 }}>Parking Duration</label>
                <span className="font-mono" style={{
                  padding: '4px 12px', borderRadius: 8,
                  background: 'var(--navy-600)', color: 'var(--text-1)',
                  fontSize: 14, fontWeight: 600,
                }}>{hours}h</span>
              </div>
              <input
                type="range" min="1" max="24" value={hours}
                onChange={e => setHours(e.target.value)}
                style={{
                  width: '100%', height: 6, borderRadius: 4, appearance: 'none', cursor: 'pointer',
                  background: `linear-gradient(90deg, var(--green) 0%, var(--green) ${((hours-1)/23)*100}%, rgba(255,255,255,0.1) ${((hours-1)/23)*100}%)`,
                  accentColor: 'var(--green)',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-3)', marginTop: 5 }}>
                <span>1 hr</span><span>24 hrs</span>
              </div>

              {preview && (
                <div style={{
                  marginTop: 14, padding: '12px 16px', borderRadius: 10,
                  background: 'var(--navy-800)', border: '1px solid var(--border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Estimated Fee</span>
                  <span className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)' }}>₹{estFee}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-red"
              disabled={loading || !preview}
              style={{ width: '100%', padding: '13px 0', fontSize: 14 }}
            >
              {loading ? (
                <svg style={{ animation: 'spin 0.8s linear infinite' }} width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" opacity=".75"/>
                </svg>
              ) : <Icons.Exit width={16} height={16} />}
              {loading ? 'Processing...' : 'Exit & Generate Bill'}
            </button>
          </form>
        </div>

        {/* SIDE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ACTIVE LIST */}
          <div className="card" style={{ padding: 22, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 14 }}>
              Parked Vehicles ({active.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto' }}>
              {active.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', fontSize: 13, color: 'var(--text-3)' }}>No vehicles parked</div>
              ) : active.map(t => {
                const Ic = VICON[t.vehicleType];
                const isSelected = plate === t.licensePlate;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handlePlate(t.licensePlate)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                      background: isSelected ? 'var(--green-dim)' : 'var(--card-2)',
                      border: `1px solid ${isSelected ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`,
                      transition: 'all 0.15s', textAlign: 'left',
                    }}
                  >
                    <div style={{ color: VCOLOR[t.vehicleType], flexShrink: 0 }}><Ic width={16} height={16} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{t.licensePlate}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{t.ownerName.split(' ')[0]} · Slot {t.slotId}</div>
                    </div>
                    <div className="dot dot-green dot-pulse" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Receipt */}
          {receipt && (
            <div className="card anim-scale-in" style={{ padding: 22, borderColor: 'rgba(0,230,118,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Icons.Check width={16} height={16} color="var(--green)" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Payment Receipt</span>
              </div>
              {[
                ['Ticket',   receipt.id],
                ['Plate',    receipt.licensePlate],
                ['Duration', `${receipt.hours} hr${receipt.hours > 1 ? 's' : ''}`],
                ['Rate',     `₹${RATES[receipt.vehicleType]}/hr`],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-3)' }}>{k}</span>
                  <span style={{ color: 'var(--text-1)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Total Collected</span>
                <span className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)' }}>₹{receipt.fee}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
