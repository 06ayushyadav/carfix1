import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios.js';

export default function Dashboard(){
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Welcome, {user?.name}</h1>
      <p className="mt-2">Role: {user?.role}</p>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">Logout</button>
    </div>
  );
}
