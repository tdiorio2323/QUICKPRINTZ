import { ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

// Minimal client-side gate using a localStorage flag set after passcode entry.
export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const isAuthed = useMemo(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('portal_auth') === 'true';
    } catch (_) {
      return false;
    }
  }, []);

  useEffect(() => {
    // Ensure consistent hydration before deciding
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!isAuthed) {
    const params = new URLSearchParams(location.search);
    const search = params.toString();
    const to = `/bagman${search ? `?${search}` : ''}`;
    return <Navigate to={to} replace />;
  }
  return <>{children}</>;
}

