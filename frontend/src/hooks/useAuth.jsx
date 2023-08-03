import { useContext } from 'react';
import AuthContext from '../contexts/authProvider';
import authFetches from '../services/auth-fetch';
import { toast } from 'react-toastify';

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  function login(formData) {
    authFetches.userLogin(formData).then((resp) => {
      setAuth((prev) => ({ ...prev, accessToken: resp.accessToken }));
      localStorage.setItem('accessToken', resp.accessToken);
      toast.success('Sikeres bejelentkezés');
      // navigate('/');
    });
  }

  function logout() {
    localStorage.removeItem('accessToken');
    setAuth({ accessToken: null });
    toast.success('Kijelentkezve');
    // navigate('/');
  }

  return { ...auth, login, logout };
};

export default useAuth;
