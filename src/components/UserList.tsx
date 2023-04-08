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
                <div className="flex justify-between mb-2">
                    <h1 className="font-extrabold text-4xl">Users:</h1>
                    <div className="flex gap-2">
                        <Link
                            to={'/user-form'}
                            className="bg-blue-500 px-3 flex justify-center items-center rounded-sm transition-colors hover:bg-blue-600 active:bg-blue-500 text-white">
                            Add
                            &nbsp;
                            <BsPersonAdd />
                        </Link>
                        <button
                            onClick={() => { setToggle(prev => !prev) }}
                            className="text-white flex items-center bg-yellow-500 px-3 hover:bg-yellow-600 active:bg-yellow-500">
                            Filters
                            &nbsp;
                            <MdFilterList />
                        </button>
                    </div>
                </div>
                {toggle && <Filter filterData={filterUsers!} />}
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
        </Container>
    );
};

export default UserList;
