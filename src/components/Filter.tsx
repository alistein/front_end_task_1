import React, { useState } from 'react'
import { IData } from '../Interfaces/interfaces';

const Filter = ({ filterData }: { filterData: (filteredData: IData) => void }) => {

    const [filteredFullname, setFilterFullname] = useState<string>("");
    const [filteredEmail, setFilterEmail] = useState<string>("");
    const [filteredRole, setFilterRole] = useState<string>("");

    const sendFilteredData = (value: IData) => {
        let filteredData: IData = value;
        filterData(filteredData!);
    }

    return (
        <div className='grid grid-cols-2 lg:grid-cols-10 gap-4 py-4'>
            <div className='col-span-2 lg:col-span-3'>
                <input
                    value={filteredFullname}
                    onChange={(e) => setFilterFullname(e.target.value)}
                    type="text" name="" id="" placeholder='Search Fullname:' className='border outline-none py-2 w-full pl-2' />
            </div>

            <div className='col-span-2 lg:col-span-3'>
                <input
                    value={filteredEmail}
                    onChange={(e) => setFilterEmail(e.target.value)}
                    type="email" name="" id="" placeholder='Search Email:' className='border outline-none py-2 w-full pl-2' />
            </div>

            <div className='col-span-2'>
                <select
                    value={filteredRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className='border-slate-300 border-2 py-2 px-2 h-full outline-none w-full rounded-sm' >
                    <option defaultChecked value="">All Roles</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
            </div>
            <button onClick={() => {sendFilteredData({ fullname: filteredFullname, email: filteredEmail, role: filteredRole})}} className='bg-slate-400 py-2 hover:scale-110 active:scale-95 transition-transform text-white font-bold'>Search</button>
            <button onClick={() => {
                setFilterEmail('')
                setFilterFullname('')
                setFilterRole('')
                sendFilteredData({ fullname: '', email: '', role: ''});
            }} className='bg-slate-400 hover:scale-110 active:scale-95 py-2 transition-transform text-white font-bold'>Clear</button>

        </div>
    )
}

export default Filter