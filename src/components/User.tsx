import { IUser } from '../Interfaces/interfaces'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const User = ({ fullname, email, role, index, deleteUser, editUser }: IUser) => {
    return (

        <div className='lg:grid grid-cols-4 border-b shadow-md border-b-slate-400 [&>*:nth-child(even)]:bg-slate-200 font-semibold bg-slate-300'>
            <div className='py-3 px-2 flex justify-center items-center'>
                <p>{index! + 1}.{fullname}</p>
            </div>
            <div className='py-3  px-2 flex justify-center items-center'>
                <p className=''>{email}</p>
            </div>
            <div className='py-3 px-2 flex justify-center items-center'>
                <p className='bg-yellow-200 text-yellow-700 inline-block  px-2 rounded-full'>{role}</p>
            </div>
            <div className='py-3 px-2 lg:justify-self-auto justify-self-center flex flex-col gap-2 md:flex-row'>
            <button
                onClick={() => {
                    deleteUser();
                }}
                className='bg-red-500 hover:scale-110 lg:text-md gap-1 text-sm active:scale-95 transition-transform text-white py-2 px-2 w-full md:w-auto flex items-center justify-center'>
                Delete <AiFillDelete />
            </button>

                <button
                    onClick={() => {
                        editUser();
                    }}
                    className='bg-blue-500 hover:scale-110 lg:text-md text-sm gap-1 flex items-center justify-center active:scale-95 transition-transform text-white py-2 px-3 w-full md:w-auto'>
                    Edit <AiFillEdit />
                </button>
            </div>
        </div>


    )
}

export default User