'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export type PortalType = 'member' | 'client';

export interface ClientUserData {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  company?: string;
  portalType: PortalType;
  referralCode?: string;
  discountBalanceKES?: number;
}

export interface AuthContextType {
  user: User | null;
  clientUser: ClientUserData | null;
  session: Session | null;
  loading: boolean;
  portalType: PortalType;
  setPortalType: (type: PortalType) => void;
  signOut: () => Promise<void>;
  signInWithDemo: (type: PortalType) => void;
  loginWithOtpUser: (userData: ClientUserData, token?: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  clientUser: null,
  session: null,
  loading: true,
  portalType: 'client',
  setPortalType: () => {},
  signOut: async () => {},
  signInWithDemo: () => {},
  loginWithOtpUser: () => {},
});

export const usePortalAuth = () => useContext(AuthContext);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [clientUser, setClientUser] = useState<ClientUserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalType, setPortalTypeState] = useState<PortalType>(() => {
    if (typeof window === 'undefined') return 'client';
    return (localStorage.getItem('ps_portal_type') as PortalType) || 'client';
  });

  const setPortalType = (type: PortalType) => {
    setPortalTypeState(type);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_portal_type', type);
    }
  };

  useEffect(() => {
    // 1. Check clientUser from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedClient = localStorage.getItem('ps_client_user');
        if (savedClient) {
          const parsed = JSON.parse(savedClient) as ClientUserData;
          setClientUser(parsed);
          const mockAuthUser: User = {
            id: parsed.id,
            email: parsed.email,
            user_metadata: {
              full_name: parsed.fullName,
              phone: parsed.phone,
              company: parsed.company,
              portal_type: parsed.portalType || 'client',
              referral_code: parsed.referralCode,
              discount_balance_kes: parsed.discountBalanceKES || 0,
            },
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as unknown as User;
          setUser(mockAuthUser);
          setSession({ user: mockAuthUser, access_token: 'ps-otp-token' } as unknown as Session);
        }
      } catch (e) {
        console.warn('Error reading saved client user:', e);
      }
    }

    // 2. Check Supabase auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        if (session.user.user_metadata?.portal_type) {
          setPortalType(session.user.user_metadata.portal_type);
        }
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSession(session);
        setUser(session.user);
        if (session.user.user_metadata?.portal_type) {
          setPortalType(session.user.user_metadata.portal_type);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loginWithOtpUser = (userData: ClientUserData, token?: string) => {
    setClientUser(userData);
    setPortalType(userData.portalType || 'client');
    const mockUser: User = {
      id: userData.id,
      email: userData.email,
      user_metadata: {
        full_name: userData.fullName,
        phone: userData.phone,
        company: userData.company,
        portal_type: userData.portalType || 'client',
        referral_code: userData.referralCode,
        discount_balance_kes: userData.discountBalanceKES || 0,
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    setUser(mockUser);
    setSession({ user: mockUser, access_token: token || 'ps-otp-token' } as unknown as Session);

    if (typeof window !== 'undefined') {
      localStorage.setItem('ps_client_user', JSON.stringify(userData));
      localStorage.setItem('ps_portal_type', userData.portalType || 'client');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setClientUser(null);
    setSession(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ps_client_user');
      localStorage.removeItem('ps_portal_type');
    }
  };

  const signInWithDemo = (type: PortalType) => {
    setPortalType(type);
    const demoData: ClientUserData = {
      id: type === 'member' ? 'mem_001' : 'cli_demo_001',
      fullName: 'Alvine Otieno',
      email: type === 'member' ? 'alvine@psa.africa' : 'otienoalvine925@gmail.com',
      phone: '0110486677',
      company: type === 'member' ? 'Pamela Steele Associates' : 'Paper Street Client Hub',
      portalType: type,
      referralCode: 'PS-ALVI8291',
      discountBalanceKES: 1000,
    };
    loginWithOtpUser(demoData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        clientUser,
        session,
        loading,
        portalType,
        setPortalType,
        signOut,
        signInWithDemo,
        loginWithOtpUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
