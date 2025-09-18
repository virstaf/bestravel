'use client';
import { useEffect } from 'react';
import useUserStore from '@/user.store';

export default function ClientLayout({ user, children }) {
  const setUser = useUserStore(state => state.setUser);
  const setIsAuthenticated = useUserStore(state => state.setIsAuthenticated);

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [user, setUser, setIsAuthenticated]);

  return <>{children}</>;
}