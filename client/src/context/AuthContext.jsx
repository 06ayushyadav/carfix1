import React from "react";
import { createContext, useEffect, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 When app loads, check if user is logged in
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}




// import React, { createContext, useState, useEffect } from 'react';
// import api from '../api/axios.js';

// // eslint-disable-next-line react-refresh/only-export-components
// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchMe() {
//     try {
//       const res = await api.get('/auth/me');
//       setUser(res.data.user);
//     } catch (err) {
//       setUser(null);
//       return err
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { fetchMe(); }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, fetchMe }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
