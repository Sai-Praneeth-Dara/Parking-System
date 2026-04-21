import { useState } from 'react';
import { useParking } from '../context/ParkingContext';
import { Icons } from '../components/Icons';

const VICON  = { Car: Icons.Car,  Bike: Icons.Bike,  Truck: Icons.Truck };
const VCOLOR = { Car: 'var(--green)', Bike: 'var(--blue)', Truck: 'var(--orange)' };

function SlotCard({ slot }) {
  const free = !slot.occupied;
  const Ic = VICON[slot.type];
  return (
    <div className={`slot-card ${free ? 'free' : 'occupied'}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span className="font-mono" style={{
          fontSize: 13, fontWeight: 700,
          color: free ? 'var(--green)' : 'var(--red)',
        }}>{slot.id}</span>
        <div className={`dot ${free ? 'dot-green' : 'dot-red'} ${!free ? 'dot-pulse' : ''}`} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', color: VCOLOR[slot.type], opacity: free ? 0.4 : 0.9 }}>
        <Ic width={28} height={28} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-3)', textAlign: 'center', marginBottom: 8 }}>
        {slot.type}
      </div>
      <div style={{ textAlign: 'center' }}>
        <span className={`badge badge-${free ? 'green' : 'red'}`} style={{ fontSize: 11 }}>
          {free ? 'Available' : 'Occupied'}
        </span>
      </div>
      {slot.vehicle && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,59,92,0.12)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-1)', fontWeight: 600, marginBottom: 2 }}>{slot.vehicle.licensePlate}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{slot.vehicle.ownerName.split(' ')[0]}</div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{slot.vehicle.entryTime.toLocaleTimeString()}</div>
        </div>
      )}
    </div>
  );
}

export default function SlotStatus({ setActivePage }) {
  const { slots, getStats } = useParking();
  const s = getStats();
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Car', 'Bike', 'Truck', 'Available', 'Occupied'];
  const counts = {
    All: slots.length,
    Car: slots.filter(x => x.type === 'Car').length,
    Bike: slots.filter(x => x.type === 'Bike').length,
    Truck: slots.filter(x => x.type === 'Truck').length,
    Available: s.freeSlots,
    Occupied: s.occupiedSlots,
  };

  const visible = slots.filter(sl => {
    if (filter === 'All') return true;
    if (filter === 'Available') return !sl.occupied;
    if (filter === 'Occupied') return sl.occupied;
    return sl.type === filter;
  });

  const occupancyPct = Math.round((s.occupiedSlots / s.totalSlots) * 100);

  return (
    <div className="anim-fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={() => setActivePage('dashboard')}>
          <Icons.ArrowLeft width={16} height={16} />
        </button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>Slot Status</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>Real-time availability · 12 slots total</p>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total',     val: s.totalSlots,    color: 'var(--text-2)' },
          { label: 'Available', val: s.freeSlots,     color: 'var(--green)'  },
          { label: 'Occupied',  val: s.occupiedSlots, color: 'var(--red)'    },
          { label: 'Car Slots', val: `${s.carOccupied}/${s.carTotal}`,     color: 'var(--green)' },
          { label: 'Occupancy', val: `${occupancyPct}%`,                   color: occupancyPct > 70 ? 'var(--red)' : occupancyPct > 40 ? 'var(--orange)' : 'var(--green)' },
        ].map(c => (
          <div key={c.label} className="card-2" style={{ padding: '16px 18px', textAlign: 'center' }}>
            <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: c.color, marginBottom: 4 }}>{c.val}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Occupancy mini-map */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icons.Gauge width={14} height={14} color="var(--green)" /> Visual Map
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { type: 'Car',   icon: Icons.Car,   typeSlots: slots.filter(sl => sl.type === 'Car'),   color: 'var(--green)'  },
            { type: 'Bike',  icon: Icons.Bike,  typeSlots: slots.filter(sl => sl.type === 'Bike'),  color: 'var(--blue)'   },
            { type: 'Truck', icon: Icons.Truck, typeSlots: slots.filter(sl => sl.type === 'Truck'), color: 'var(--orange)' },
          ].map(({ type, icon: Ic, typeSlots, color }) => (
            <div key={type}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Ic width={16} height={16} color={color} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{type}</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 'auto' }}>
                  {typeSlots.filter(x => x.occupied).length}/{typeSlots.length}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {typeSlots.map(sl => (
                  <div
                    key={sl.id}
                    title={sl.occupied ? `${sl.id}: ${sl.vehicle?.licensePlate}` : `${sl.id}: Free`}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700,
                      background: sl.occupied ? 'var(--red-dim)' : 'var(--green-dim)',
                      border: `1px solid ${sl.occupied ? 'rgba(255,59,92,0.25)' : 'rgba(0,230,118,0.25)'}`,
                      color: sl.occupied ? 'var(--red)' : 'var(--green)',
                      cursor: 'default',
                      transition: 'all 0.15s',
                    }}
                  >
                    {sl.id.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              background: filter === f ? 'var(--green-dim)' : 'var(--card-2)',
              border: `1px solid ${filter === f ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`,
              color: filter === f ? 'var(--green)' : 'var(--text-2)',
              transition: 'all 0.15s',
            }}
          >
            {f}
            <span style={{
              marginLeft: 6, fontSize: 11, padding: '1px 6px', borderRadius: 5,
              background: 'rgba(255,255,255,0.06)', color: 'var(--text-3)',
            }}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Slot Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
        {visible.map((slot, i) => (
          <div key={slot.id} className="anim-fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
            <SlotCard slot={slot} />
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-3)', fontSize: 14 }}>
          No slots match this filter
        </div>
      )}

      {/* Legend */}
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-2)' }}>
          <div className="dot dot-green" /> Available Slot
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-2)' }}>
          <div className="dot dot-red dot-pulse" /> Occupied Slot
        </div>
      </div>
    </div>
  );
}
