import React, { useState, useEffect } from 'react';
import api from '../Service/api';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

export default function Admin() {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const allRegisteredUsers = await api
        .get('/manage', {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => response)
        .catch((response) => response);
      setAllUsers(allRegisteredUsers.data);
    };
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <RegisterForm />
    </div>
  );
}
