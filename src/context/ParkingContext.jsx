import { createContext, useContext, useState, useCallback } from 'react';

const ParkingContext = createContext(null);

// Pricing
const RATES = { Car: 50, Bike: 20, Truck: 100 };

// Slot layout: 5 Car (C1-C5), 5 Bike (B1-B5), 2 Truck (T1-T2)
const generateSlots = () => {
  const slots = [];
  for (let i = 1; i <= 5; i++) slots.push({ id: `C${i}`, type: 'Car', occupied: false, vehicle: null });
  for (let i = 1; i <= 5; i++) slots.push({ id: `B${i}`, type: 'Bike', occupied: false, vehicle: null });
  for (let i = 1; i <= 2; i++) slots.push({ id: `T${i}`, type: 'Truck', occupied: false, vehicle: null });
  return slots;
};

let ticketCounter = 1000;

export function ParkingProvider({ children }) {
  const [slots, setSlots] = useState(generateSlots());
  const [tickets, setTickets] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [revenueHistory, setRevenueHistory] = useState([]);

  const generateTicketId = () => `TKT-${++ticketCounter}`;

  const parkVehicle = useCallback(({ vehicleType, licensePlate, ownerName, simulatedHours = 1 }) => {
    // Validate input
    if (!licensePlate.trim() || !ownerName.trim()) {
      return { success: false, message: 'Please fill all required fields.' };
    }

    // Check duplicate plate
    const existing = tickets.find(t => t.licensePlate === licensePlate.toUpperCase() && !t.exitTime);
    if (existing) {
      return { success: false, message: `Vehicle ${licensePlate.toUpperCase()} is already parked (Slot ${existing.slotId}).` };
    }

    // Find free slot
    const freeSlot = slots.find(s => s.type === vehicleType && !s.occupied);
    if (!freeSlot) {
      return { success: false, message: `No ${vehicleType} slots available! All ${vehicleType} slots are occupied.` };
    }

    const ticketId = generateTicketId();
    const entryTime = new Date();

    const newTicket = {
      id: ticketId,
      vehicleType,
      licensePlate: licensePlate.toUpperCase().trim(),
      ownerName: ownerName.trim(),
      slotId: freeSlot.id,
      entryTime,
      exitTime: null,
      fee: null,
      status: 'active',
    };

    setSlots(prev => prev.map(s =>
      s.id === freeSlot.id
        ? { ...s, occupied: true, vehicle: newTicket }
        : s
    ));

    setTickets(prev => [newTicket, ...prev]);

    return {
      success: true,
      message: `Vehicle parked successfully!`,
      ticket: newTicket,
      slotId: freeSlot.id,
    };
  }, [slots, tickets]);

  const exitVehicle = useCallback(({ licensePlate, simulatedHours }) => {
    const plate = licensePlate.toUpperCase().trim();
    const ticket = tickets.find(t => t.licensePlate === plate && !t.exitTime);

    if (!ticket) {
      return { success: false, message: `No active parking found for ${plate}.` };
    }

    const exitTime = new Date();
    const hours = Math.max(1, Math.ceil(simulatedHours || 1));
    const fee = hours * RATES[ticket.vehicleType];

    const updatedTicket = { ...ticket, exitTime, fee, hours, status: 'completed' };

    setTickets(prev => prev.map(t => t.id === ticket.id ? updatedTicket : t));

    setSlots(prev => prev.map(s =>
      s.id === ticket.slotId
        ? { ...s, occupied: false, vehicle: null }
        : s
    ));

    setRevenue(prev => prev + fee);

    setRevenueHistory(prev => [
      { id: updatedTicket.id, plate, vehicleType: ticket.vehicleType, fee, hours, time: exitTime },
      ...prev
    ]);

    return {
      success: true,
      message: `Vehicle ${plate} exited. Fee: ₹${fee}`,
      ticket: updatedTicket,
      fee,
      hours,
    };
  }, [tickets]);

  const getStats = useCallback(() => {
    const totalSlots = slots.length;
    const occupiedSlots = slots.filter(s => s.occupied).length;
    const freeSlots = totalSlots - occupiedSlots;
    const carSlots = slots.filter(s => s.type === 'Car');
    const bikeSlots = slots.filter(s => s.type === 'Bike');
    const truckSlots = slots.filter(s => s.type === 'Truck');

    return {
      totalSlots,
      occupiedSlots,
      freeSlots,
      carOccupied: carSlots.filter(s => s.occupied).length,
      carTotal: carSlots.length,
      bikeOccupied: bikeSlots.filter(s => s.occupied).length,
      bikeTotal: bikeSlots.length,
      truckOccupied: truckSlots.filter(s => s.occupied).length,
      truckTotal: truckSlots.length,
      activeTickets: tickets.filter(t => !t.exitTime).length,
      completedTickets: tickets.filter(t => t.exitTime).length,
    };
  }, [slots, tickets]);

  return (
    <ParkingContext.Provider value={{
      slots,
      tickets,
      revenue,
      revenueHistory,
      parkVehicle,
      exitVehicle,
      getStats,
      RATES,
    }}>
      {children}
    </ParkingContext.Provider>
  );
}

export const useParking = () => {
  const ctx = useContext(ParkingContext);
  if (!ctx) throw new Error('useParking must be used within ParkingProvider');
  return ctx;
};
