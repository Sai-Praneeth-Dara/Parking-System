import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { Icons } from '../components/Icons';

const V_TYPES = [
  { value: 'Car',   icon: Icons.Car,   color: 'var(--green)',  rate: 50  },
  { value: 'Bike',  icon: Icons.Bike,  color: 'var(--blue)',   rate: 20  },
  { value: 'Truck', icon: Icons.Truck, color: 'var(--orange)', rate: 100 },
];

export default function ParkVehicle({ onToast, setActivePage }) {
  const { parkVehicle, getStats, RATES } = useParking();
  const s = getStats();
  const freeMap = { Car: s.carTotal - s.carOccupied, Bike: s.bikeTotal - s.bikeOccupied, Truck: s.truckTotal - s.truckOccupied };

  const [form, setForm] = useState({ vehicleType: 'Car', licensePlate: '', ownerName: '' });
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);

  const sel = V_TYPES.find(v => v.value === form.vehicleType);
  const noSlots = freeMap[form.vehicleType] === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const res = parkVehicle({ vehicleType: form.vehicleType, licensePlate: form.licensePlate, ownerName: form.ownerName });
    setLoading(false);
    if (res.success) {
      setTicket(res.ticket);
      setForm({ vehicleType: 'Car', licensePlate: '', ownerName: '' });
      onToast({ type: 'success', title: 'Vehicle Parked', message: `${res.ticket.licensePlate} → Slot ${res.slotId}` });
    } else {
      onToast({ type: 'error', title: 'Failed', message: res.message });
    }
  };

  return (
    <div className="anim-fade-up" style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={() => setActivePage('dashboard')}>
          <Icons.ArrowLeft width={16} height={16} />
        </button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Park Vehicle</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Assign a slot and generate a parking ticket</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

        {/* FORM */}
        <div className="card" style={{ padding: 28 }}>
          <form onSubmit={handleSubmit}>
            {/* Vehicle Type */}
            <div style={{ marginBottom: 22 }}>
              <label className="lbl">Vehicle Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {V_TYPES.map(({ value, icon: Ic, color, rate }) => {
                  const free = freeMap[value];
                  const active = form.vehicleType === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, vehicleType: value }))}
                      style={{
                        padding: '16px 12px',
                        borderRadius: 12,
                        border: `1.5px solid ${active ? color : 'var(--border)'}`,
                        background: active ? `${color}12` : 'var(--card-2)',
                        cursor: 'pointer',
                        transition: 'all 0.18s',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ color: active ? color : 'var(--text-3)', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                        <Ic width={24} height={24} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--text-1)' : 'var(--text-2)', marginBottom: 3 }}>{value}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>₹{rate}/hr</div>
                      <div style={{
                        marginTop: 8, fontSize: 11, fontWeight: 600,
                        color: free === 0 ? 'var(--red)' : 'var(--green)',
                      }}>
                        {free === 0 ? 'Full' : `${free} free`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {noSlots && (
                <div style={{
                  marginTop: 10, padding: '10px 14px', borderRadius: 8,
                  background: 'var(--red-dim)', border: '1px solid rgba(255,59,92,.2)',
                  display: 'flex', alignItems: 'center', gap: 8, color: 'var(--red)', fontSize: 13,
                }}>
                  <Icons.Alert width={14} height={14} />
                  No {form.vehicleType} slots available
                </div>
              )}
            </div>

            <hr className="divider" />

            {/* License Plate */}
            <div style={{ marginBottom: 16 }}>
              <label className="lbl" htmlFor="plate">License Plate Number</label>
              <input
                id="plate" className="inp"
                placeholder="e.g. MH12AB1234"
                value={form.licensePlate}
                onChange={e => setForm(f => ({ ...f, licensePlate: e.target.value.toUpperCase() }))}
                required maxLength={15}
              />
            </div>

            {/* Owner */}
            <div style={{ marginBottom: 26 }}>
              <label className="lbl" htmlFor="owner">Owner Name</label>
              <input
                id="owner" className="inp"
                placeholder="e.g. Arjun Mehta"
                value={form.ownerName}
                onChange={e => setForm(f => ({ ...f, ownerName: e.target.value }))}
                required maxLength={50}
              />
            </div>

            <button
              type="submit"
              className="btn btn-green"
              disabled={loading || noSlots}
              style={{ width: '100%', padding: '13px 0', fontSize: 14 }}
            >
              {loading ? (
                <svg className="animate-spin" width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25"/>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" opacity=".75"/>
                </svg>
              ) : <Icons.Park width={16} height={16} />}
              {loading ? 'Allocating Slot...' : 'Park Vehicle'}
            </button>
          </form>
        </div>

        {/* SIDE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Fee Preview */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 14 }}>Billing Preview</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ color: sel.color }}><sel.icon width={24} height={24} /></div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>{sel.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Rate: ₹{sel.rate}/hr</div>
              </div>
            </div>
            <div style={{ padding: '12px 0', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>
                <span>Min charge (1 hr)</span>
                <span className="font-mono" style={{ color: 'var(--text-1)', fontWeight: 600 }}>₹{sel.rate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)' }}>
                <span>Free slots left</span>
                <span style={{ color: freeMap[form.vehicleType] === 0 ? 'var(--red)' : 'var(--green)', fontWeight: 600 }}>
                  {freeMap[form.vehicleType]}/{V_TYPES.find(v => v.value === form.vehicleType).value === 'Truck' ? 2 : 5}
                </span>
              </div>
            </div>
          </div>

          {/* Issued Ticket */}
          {ticket && (
            <div className="card anim-scale-in" style={{ padding: 22, borderColor: 'rgba(0,230,118,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ color: 'var(--green)' }}><Icons.Ticket width={16} height={16} /></div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>Ticket Issued</div>
              </div>
              {[
                ['Ticket ID', ticket.id],
                ['Plate',     ticket.licensePlate],
                ['Owner',     ticket.ownerName],
                ['Slot',      ticket.slotId],
                ['Entry',     ticket.entryTime.toLocaleTimeString()],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-3)' }}>{k}</span>
                  <span className={k === 'Ticket ID' || k === 'Slot' ? 'font-mono' : ''} style={{ color: 'var(--text-1)', fontWeight: 500, fontSize: k === 'Ticket ID' ? 12 : 13 }}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
