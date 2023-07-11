import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(formData);
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Email:{' '}
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </p>
        <p>
          Password:{' '}
          <input
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              console.log(formData);
            }}
            required
          />
        </p>
        <p>
          <button type="submit">Login</button>
        </p>
      </form>
    </>
  );
}
