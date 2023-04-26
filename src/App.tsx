import './index.css';
import UserList, {loader as userLoader} from './components/UserList';
import AddUser from './pages/AddUser';
import { action as dataManipulateAction } from './components/UserForm';
import { loader as loadUser } from './components/UserForm';
import EditUser from './pages/EditUser';
import { IData } from './Interfaces/interfaces';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { action as filterAction } from './components/UserList';
import { useEffect, useState } from 'react';
import axios from 'axios';


const BASE_URL = 'http://localhost:3000/users'


const routes = createBrowserRouter([
  { index: true, element: <UserList />, loader: userLoader, action: filterAction },
  { path: '/user-form', element: <AddUser />, action: dataManipulateAction},
  { path: '/user-form/edit/:id', element: <EditUser />, loader: loadUser, action:dataManipulateAction }
])

const App = () => {
  const [users, setUsers] = useState<IData[]>([]); // Main data
  const [filters, setFilters] = useState<IData>();

  const editData = (id: string, data: IData) => {
    if (!id || !data) return;
    if (!filters) return;
    const queryParams = Object.entries(filters!)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        if (key === 'fullname' || key === 'email') {
          return `${key}_like=${value}`
        }
        return `${key}=${value}`
      }
      )
    axios.put(`${BASE_URL}/${id}`, { ...data }).then((response) => {
      setUsers(prevUsers => prevUsers.map(user => (user.id === id ? response.data : user)))
      axios.get(`${BASE_URL}?${queryParams}`).then(response => setUsers(response.data))
    });
  }

  const filterData = (filters: IData) => {
    setFilters(filters);
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

  return <RouterProvider router={routes} />

}
export default App


{/* <Routes>
        <Route path='user-form' element={<UserForm postData={postData} />} />
        <Route path='user-form/edit/:id' element={<UserForm postData={postData} users={users} editData={editData} />} />
        <Route path='/' element={
          <UserList filterUsers={filterData} deleteUserFromList={deleteData} users={users} />
        } />
      </Routes> */}