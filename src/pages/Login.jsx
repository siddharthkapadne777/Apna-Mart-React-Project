import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const validUser = existingUsers.find(
      user => user.email === credentials.email && user.password === credentials.password
    );

    if (!validUser) {
      setError('Invalid email or password.');
      return;
    }

    // Set active session
    localStorage.setItem('currentUser', JSON.stringify({ name: validUser.name, email: validUser.email }));
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          type="email" name="email" placeholder="Email Address" required
          className="border p-2 rounded focus:outline-blue-500"
          onChange={handleChange}
        />
        <input 
          type="password" name="password" placeholder="Password" required
          className="border p-2 rounded focus:outline-blue-500"
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
      </p>
    </div>
  );
}