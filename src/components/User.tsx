import React from 'react'
import { IUser } from '../Interfaces/interfaces'

const User = ({fullname, email, role, deleteUser, editUser}: IUser) => {
  return (

    <div className='grid grid-cols-4 [&>*:nth-child(even)]:bg-slate-200 font-semibold bg-slate-300'>
        <div className='py-3 px-2'>
           <p>{fullname}</p>
        </div>
        <div className='py-3 px-2'>
            <p>{email}</p>
        </div>
        <div className='py-3 px-2'>
            <p className='bg-yellow-200 text-yellow-700 inline-block  px-2 rounded-full'>{role}</p>
        </div>
        <div className='py-3 px-2 space-x-3'>
            <button onClick={() => {
                deleteUser();
            }} className='text-red-500'>Delete</button>
            <button
            onClick={() => {
                editUser();
            }}
             className='text-blue-500'>Edit</button>
        </div>
    </div>
  
  )
}

export default User