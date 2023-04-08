import React from 'react'
import { IUser } from '../Interfaces/interfaces'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

const User = ({fullname, email, role,index ,deleteUser, editUser}: IUser) => {
  return (

    <div className='grid grid-cols-4 [&>*:nth-child(even)]:bg-slate-200 font-semibold bg-slate-300'>
        <div className='py-3 px-2'>
           <p>{index!+1}.{fullname}</p>
        </div>
        <div className='py-3 px-2'>
            <p>{email}</p>
        </div>
        <div className='py-3 px-2'>
            <p className='bg-yellow-200 text-yellow-700 inline-block  px-2 rounded-full'>{role}</p>
        </div>
        <div className='py-3 px-2 flex gap-2'>
            <button onClick={() => {
                deleteUser();
            }} className='bg-red-500 hover:scale-110 flex items-center active:scale-95 transition-transform text-white py-1 px-3'>Delete &nbsp; <AiFillDelete/></button>
            <button
            onClick={() => {
                editUser();
            }}
             className='bg-blue-500 hover:scale-110 flex items-center active:scale-95 transition-transform text-white py-1 px-3'>Edit &nbsp; <AiFillEdit/></button>
        </div>
    </div>
  
  )
}

export default User