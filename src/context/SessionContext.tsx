import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  loadToken,
  clearToken,
  saveToken,
  loadSessionId,
  saveSessionId,
  clearSessionId,
} from '../libs/tokenStorage';
import { AuthService } from '../services/authService';

type User = {
  id: string;
  username: string;
  email: string;
  // thêm các field khác nếu cần
};

type ResponseData<T> = {
  data: T[];
  message: string;
  code: number;
};

type SessionContextType = {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithUsername: (
    username: string,
    password: string
  ) => Promise<ResponseData<any> | boolean>;
  loginWithEmail: (
    email: string,
    password: string,
    otp_code?: string
  ) => Promise<ResponseData<any> | boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Khi app load, thử lấy /auth/me nếu có token
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const token = await loadToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await AuthService.me(token);
        // API /me trả về { message: "...", data: { user object } }
        setUser(res.data.data);
      } catch (error) {
        console.error('Failed to load session:', error);
        await clearToken();
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  // ================== Hàm login ==================
  const loginWithUsername = async (username: string, password: string) => {
    try {
        console.log('Attempting login with username:', username);
      const res = await AuthService.loginWithUsername(username, password);
      console.log('res', res);
      // Hàm này có vẻ đúng vì bạn lấy user từ res.data.data.user
      const { access_token, session_id, user } = res.data.data;

      console.log('user', user);

      await saveToken(access_token);
      await saveSessionId(session_id);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login with username failed:', error);
      return false;
    }
  };

  const loginWithEmail = async (
    email: string,
    password: string,
    otp_code?: string
  ) => {
    try {
      const res = await AuthService.loginWithEmail(email, password, otp_code);
      // Cần đảm bảo cấu trúc response này là đúng
      const { access_token, user, session_id } = res.data.data;

      await saveToken(access_token);
      await saveSessionId(session_id);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login with email failed:', error);
      return false;
    }
  };

  // ================== Hàm logout ==================
  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      // ignore lỗi
      console.error('Logout API failed:', error);
    }
    await clearToken();
    await clearSessionId();
    setUser(null);
  };

  // ================== Refresh session ==================
  const refreshSession = async () => {
    setLoading(true);
    try {
      const session_id = await loadSessionId();
      if (!session_id) throw new Error('No session');

      const res = await AuthService.refresh(session_id);

      const { access_token } = res.data.data;
      await saveToken(access_token);

      // Sau khi có access_token mới → gọi /me
      const me = await AuthService.me(access_token);
      setUser(me.data.data);
    } catch (error) {
      console.error('Refresh session failed:', error);
      await clearToken();
      await clearSessionId();
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        loading,
        isLoading: loading,
        isAuthenticated: !!user,
        loginWithUsername,
        loginWithEmail,
        logout,
        refreshSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
};
