import { useState } from 'react';
import authFetches from '../../../services/auth-fetch';
import './Register.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  return (
    <>
      <main className='loginMain'>
        <section>
          <div className='wrapper'>
            <form>
              <div>
                <h1 className="login-h1">Register</h1>
                <p>
                  Email:{' '}
                <input
                  className="login-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </p>
              <p>
                Username:{' '}
                <input
                  className="login-input"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </p>
              <p>
                Password:{' '}
                <input
                  className="login-input"
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
                <button type="submit" onClick={() => authFetches.userRegister(formData)}>
                  Register
                </button>
              </p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
