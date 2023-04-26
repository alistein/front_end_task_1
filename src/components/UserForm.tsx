import { useState } from 'react'
import React from 'react'
import Container from './Container'
import { IData, IForm } from '../Interfaces/interfaces'
import { nanoid } from 'nanoid'
import { useLocation, useNavigate, Form, Params, redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000/users'

const UserForm = ({ method }: IForm) => {

    const [fullnameError, setFullnameError] = useState<string>();
    const [emailError, setEmailError] = useState<string>();

    const location = useLocation();

    const data = useLoaderData() as IData;


    return (
        <Container>
            <Form method={method}>
                <div className='grid grid-cols-2 pt-8 gap-3 mx-auto lg:w-1/2  w-full'>
                    <div className='col-span-1'>
                        <input
                            defaultValue={data && (data as IData).fullname}
                            name='fullname'
                            type="text" className='border-slate-300 w-full border-2 py-2 px-2 outline-none rounded-sm' placeholder='Full Name:' />
                        <p className='font-bold text-red-600'>{fullnameError ? fullnameError : ''}</p>
                    </div>
                    <div className='col-span-1'>
                        <input
                            defaultValue={data && (data as IData).email}
                            name='email'
                            type="email" className='border-slate-300 w-full border-2 py-2 px-2 outline-none rounded-sm col-span-1' placeholder='Email:' />
                        <p className='font-bold text-red-600'>{emailError ? emailError : ''}</p>
                    </div>
                    <select
                        defaultValue={data && (data as IData).role}
                        name='role'
                        className='border-slate-300 border-2 py-2 px-2 outline-none rounded-sm col-span-2' >
                        <option defaultChecked value="Super Admin">Super Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <button
                        className={`
                    ${location.pathname !== "/user-form" ? 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-500'
                                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-500'} 
                    col-span-2 py-2 text-white rounded-sm transition-colors `}>
                        Save Data
                    </button>
                </div>
            </Form>
        </Container>

    )
}


export const loader = async ({ request, params }: { request: Request, params: Params }) => {

    let data = (await axios.get(`${BASE_URL}/${params.id}`)).data

    return data;

}

export const action = async ({ request, params }: { request: Request, params: Params }) => {
    let formData = await request.formData();

    let extractedData = {
        id: nanoid(),
        fullname: formData.get("fullname"),
        email: formData.get("email"),
        role: formData.get("role")
    }

    if (request.method === "PATCH") {
        const id = params.id;
        console.log(id);
        axios.put(`${BASE_URL}/${id}`, { ...extractedData }).catch(error => console.log(error))
    } else {
        axios.post(BASE_URL, { ...extractedData });
    }


    return redirect("/")

}

export default UserForm