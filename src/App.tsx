import './index.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { IData } from './Interfaces/interfaces';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const DUMMY_DATA = [
  {
    id: '1',
    fullname: 'Ali Aliyev',
    email: 'example@gmail.com',
    role: 'Super Admin'
  },
  {
    id: '2',
    fullname: 'Niyameddin Musayev',
    email: 'example2@gmail.com',
    role: 'Admin'
  },
  {
    id: '3',
    fullname: 'Taylor Swift',
    email: 'example3@gmail.com',
    role: 'User'
  },

]

const App = () => {
  const [users, setUsers] = useState<IData[]>(DUMMY_DATA); // Main data

  const postData = (data: IData) => {
    setUsers(prevUsers => [...prevUsers, data]);
  }

  const deleteData = (id: string) => {
    const remainingUsers = users.filter(user => user.id !== id);
    setUsers(remainingUsers);
  }

  const editData = (index: number, data: IData) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = data;
      return updatedUsers;
    })
  }

  return (
    <>
      <Routes>
        <Route path='user-form' element={<UserForm postData={postData}/>} />
        <Route path='user-form/edit/:id' element={<UserForm postData={postData} users={users} editData={editData} />} />
        <Route path='/' element={
          <UserList deleteUserFromList={deleteData} users={users} />
        } />
      </Routes>
    </>

  )
}

export default App
