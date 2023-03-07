import React, { useState, useEffect } from 'react';
import api from '../Service/api';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

export default function Admin() {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const [allUsers, setAllUsers] = useState([]);

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

  useEffect(() => {
    getUsers();
  }, []);

  const deleteHandler = async ({ target: { value: id } }) => {
    try {
      await api
        .delete(`/manage/${id}`, {
          headers: {
            Authorization: token,
          },
        });
      getUsers();
    } catch ({ response: { data, status } }) {
      return { data: data.message, status };
    }
  };

  return (
    <div>
      <Navbar />
      <RegisterForm />

      <h2> Lista de Usuário</h2>
      <table>
        <thead>
          <tr>
            <th> Item </th>
            <th> Nome </th>
            <th> E-mail </th>
            <th> Tipo </th>
            <th> Excluir </th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map(({ id, name, email, role }, ind) => (
              <tr key={ ind }>
                <td data-testid={ `admin_manage__element-user-table-item-number-${ind}` }>
                  { id }
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${ind}` }>
                  { name }
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${ind}` }>
                  { email }
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${ind}` }>
                  { role }
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={
                      `admin_manage__element-user-table-name-${ind}`
                    }
                    value={ id }
                    onClick={ deleteHandler }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
