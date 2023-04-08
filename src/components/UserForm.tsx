import { useState, useEffect } from 'react'
import React from 'react'
import Container from './Container'
import { IForm, IData, IUsers} from '../Interfaces/interfaces'
import { nanoid } from 'nanoid'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

const UserForm = ({ postData, editData, users }: IForm & IUsers) => {
    const [fullname, setFullname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("Super Admin");

    const [fullnameError, setFullnameError] = useState<string>();
    const [emailError, setEmailError] = useState<string>();

    const location = useLocation();
    const param = useParams();
    const navigation = useNavigate();

    const id = param.id

    useEffect(() => {
        if(location.pathname === '/user-form') return;

        const editedUser = users?.find(user => user.id === param.id);
        setFullname(editedUser!.fullname);
        setEmail(editedUser!.email);
        setRole(editedUser!.role);
    }, [])

    const transformData = () => {
        if (fullname === "") {
            setFullnameError("Fill the fullname input");
            setEmailError('')
            return;
        }

        if(email === ""){
            setEmailError("Fill the email input");
            setFullnameError('');
            return;
        }

        const data: IData = { id: nanoid(), fullname, email, role }
        if (location.pathname === '/user-form') {
            postData(data);
        } else {
            editData!(param.id! , data);
            navigation('/');
        }

        setFullname('')
        setEmail('')
        setRole('')
        setEmailError('')
        setFullnameError('')
    }

    return (
        <Container>
            <div className='grid grid-cols-2 gap-3 mx-auto lg:w-1/2  w-full'>
                <div className='col-span-1'>
                <input
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                    type="text" className='border-slate-300 w-full border-2 py-2 px-2 outline-none rounded-sm' placeholder='Full Name:' />
                    <p className='font-bold text-red-600'>{fullnameError ? fullnameError : ''}</p>
                </div>
                <div className='col-span-1'>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" className='border-slate-300 w-full border-2 py-2 px-2 outline-none rounded-sm col-span-1' placeholder='Email:' />
                    <p className='font-bold text-red-600'>{emailError ? emailError : ''}</p>
                </div>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className='border-slate-300 border-2 py-2 px-2 outline-none rounded-sm col-span-2' >
                    <option defaultChecked value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button
                    onClick={transformData}
                    className='bg-blue-500 col-span-2 py-2 text-white rounded-sm transition-colors hover:bg-blue-600 active:bg-blue-500'>
                    {location.pathname !== "/user-form" ? 'Edit User' : 'Add User'}
                </button>
            </div>
        </Container>

    )
}

export default UserForm