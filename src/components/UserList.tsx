import React, { useState } from "react";
import User from "./User";
import Container from "./Container";
import { IUsers } from "../Interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonAdd } from 'react-icons/bs'
import { MdFilterList } from 'react-icons/md'
import Filter from "./Filter";

const UserList = ({ users, deleteUserFromList, filterUsers }: IUsers) => {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    return (
        <Container>
            <div>
                <div className="lg:flex lg:space-y-0 space-y-4 justify-between mb-2">
                    <h1 className="font-extrabold text-4xl">Users:</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <Link
                            to={'/user-form'}
                            className="bg-blue-500 py-2  px-3 flex justify-center items-center rounded-sm transition-colors hover:bg-blue-600 active:bg-blue-500 text-white">
                            Add
                            &nbsp;
                            <BsPersonAdd />
                        </Link>
                        <button
                            onClick={() => { setToggle(prev => !prev) }}
                            className="text-white flex py-2 justify-center items-center bg-yellow-500 px-3 hover:bg-yellow-600 active:bg-yellow-500">
                            Filters
                            &nbsp;
                            <MdFilterList />
                        </button>
                    </div>
                </div>
                {toggle && <Filter filterData={filterUsers!} />}
                <div className='relative overflow-y-auto lg:space-y-0 space-y-4 lg:h-full h-[500px]'>
                {users!.map((user, index) => (
                    <User
                        editUser={() => {
                            navigate(`user-form/edit/${user.id}`)

                        }}
                        deleteUser={() => {
                            deleteUserFromList!(user.id!);
                        }}
                        key={user.id}
                        id={user.id}
                        index={index}
                        fullname={user.fullname}
                        email={user.email}
                        role={user.role}
                    />
                ))}
                </div>
                        </div>
        </Container>
    );
};

export default UserList;
