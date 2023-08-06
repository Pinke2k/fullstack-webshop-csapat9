import { useState } from 'react';
import authFetches from '../../../services/auth-fetch';
import { useNavigate } from 'react-router';
import {toast} from 'react-toastify'
import './Register.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    authFetches.userRegister(formData)
      .then(() => {
        toast.success('Sikeres regisztráció!');
        navigate('/');
      })
      .catch((error) => {
        toast.error('Hiba történt a regisztráció során.');
        console.error(error);
      });
  }

  return (
    <>
      <main className='loginMain'>
        <section>
          <div className='wrapper'>
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="register-h1">Regisztráció</h1>
                <div className='inputs'>
                <p>
                  E-mail:{' '}
                  
                <input
                  className="register-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </p>
              <p>
                Felhasználónév:{' '}
                <input
                  className="register-input"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </p>
              <p>
                Jelszó:{' '}
                <input
                  className="register-input"
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    console.log(formData);
                  }}
                  required
                />
              </p>
              </div>
              <p>
                <button type="submit" className='register-button'>
                  Regisztráció
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
