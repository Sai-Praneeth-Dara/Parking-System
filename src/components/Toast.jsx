import { useEffect } from 'react';
import { Icons } from './Icons';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4200);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const cfg = {
    success: { icon: <Icons.Check width={16} height={16} />, color: 'var(--green)',  cls: 'toast-success' },
    error:   { icon: <Icons.Alert width={16} height={16} />, color: 'var(--red)',    cls: 'toast-error' },
    info:    { icon: <Icons.Activity width={16} height={16} />, color: 'var(--blue)', cls: 'toast-info' },
  };
  const c = cfg[toast.type] || cfg.info;

  return (
    <div className={`toast ${c.cls}`}>
      <div style={{ color: c.color, flexShrink: 0, marginTop: 1 }}>{c.icon}</div>
      <div style={{ flex: 1 }}>
        {toast.title && (
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 2 }}>{toast.title}</div>
        )}
        <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{toast.message}</div>
      </div>
      <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 2 }}>
        <Icons.X width={14} height={14} />
      </button>
    </div>
  );
}
