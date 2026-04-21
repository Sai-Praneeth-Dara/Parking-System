// Flat minimal SVG icon library
export const Icons = {
  Dashboard: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity=".9"/>
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity=".5"/>
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity=".5"/>
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity=".9"/>
    </svg>
  ),
  Park: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 17V7h4a3 3 0 010 6H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Exit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Slots: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="7" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="13" y="7" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M7 10h2M16 10h2M7 14h2M16 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Revenue: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 6v2M12 16v2M9.5 9.5C9.5 8.12 10.62 7 12 7s2.5 1.12 2.5 2.5-2.5 2.5-2.5 2.5-2.5 1.12-2.5 2.5S10.62 17 12 17s2.5-1.12 2.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Car: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 11l1.5-4.5A2 2 0 018.4 5h7.2a2 2 0 011.9 1.5L19 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="2" y="11" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="7" cy="18" r="2" fill="currentColor"/>
      <circle cx="17" cy="18" r="2" fill="currentColor"/>
      <path d="M2 14h20" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
    </svg>
  ),
  Bike: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="5.5" cy="17.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="18.5" cy="17.5" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M5.5 17.5L9 10l3 2 2.5-5H18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7l2-3h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Truck: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M1 3h14v11H1zM15 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  TrendUp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Alert: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  Check: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  ChevronRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowLeft: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <polyline points="15 18 9 12 15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Activity: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
      <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Ticket: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v1.5a2.5 2.5 0 000 5V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-1.5a2.5 2.5 0 000-5V9z" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="9" y1="7" x2="9" y2="17" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
    </svg>
  ),
  Gauge: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <path d="M6 16a7 7 0 0112 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4"/>
    </svg>
  ),
};
