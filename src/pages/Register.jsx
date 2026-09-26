import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const userExists = existingUsers.some(user => user.email === formData.email);
    if (userExists) {
      setError('User already exists with this email.');
      return;
    }

    existingUsers.push(formData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Auto-login the user after registration
    localStorage.setItem('currentUser', JSON.stringify({ name: formData.name, email: formData.email }));
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input 
          type="text" name="name" placeholder="Full Name" required
          className="border p-2 rounded focus:outline-blue-500"
          onChange={handleChange}
        />
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
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
      </p>
    </div>
  );
}