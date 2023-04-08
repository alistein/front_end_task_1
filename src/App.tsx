import './index.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { IData } from './Interfaces/interfaces';
import { Routes, Route } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/users'

const App = () => {
  const [users, setUsers] = useState<IData[]>([]); // Main data

  useEffect(() => {
    axios.get(BASE_URL).then(data => { setUsers(data.data) })
  }, [])

  const postData = (data: IData) => {
    axios.post(BASE_URL, { ...data }).then(response => setUsers(prevUsers => [...prevUsers, response.data]))
  }

  const deleteData = (id: string) => {
    axios.delete(`${BASE_URL}/${id}`).then(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)))
  }

  const editData = (id: string, data: IData) => {
    axios.put(`${BASE_URL}/${id}`, { ...data }).then((response) => setUsers(prevUsers => prevUsers.map(user => (user.id === id ? response.data : user))));
  }

  const filterData = (filters: IData) => {
    const queryParams = Object.entries(filters)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        if (key === 'fullname' || key === 'email') {
          return `${key}_like=${value}`
        }
        return `${key}=${value}`
      }
      )
      .join('&');

    axios.get(`${BASE_URL}?${queryParams}`).then(response => setUsers(response.data))
  }

  return (
    <>
      <Routes>
        <Route path='user-form' element={<UserForm postData={postData} />} />
        <Route path='user-form/edit/:id' element={<UserForm postData={postData} users={users} editData={editData} />} />
        <Route path='/' element={
          <UserList filterUsers={filterData} deleteUserFromList={deleteData} users={users} />
        } />
      </Routes>
    </>

  )
}

export default App
