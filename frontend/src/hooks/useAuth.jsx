import { useContext, useDebugValue, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../contexts/authProvider';
import authFetches from '../services/auth-fetch';

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  useEffect(() => {
    if (auth.token) {
      const user = jwtDecode(auth.token);
      setAuth((prev) => ({ ...prev, user }));
    }
  }, [auth.token]);
  function login(formData) {
    authFetches.userLogin(formData).then((resp) => {
      setAuth({ token: resp.accessToken });
      localStorage.setItem('accessToken', resp.accessToken);
    });
  }
  return { ...auth, login };
};
export default useAuth;
