import React from "react";
import User from "./User";
import Container from "./Container";
import { IUsers } from "../Interfaces/interfaces";
import { Link, useNavigate } from "react-router-dom";

const UserList = ({ users, deleteUserFromList }: IUsers) => {
    const navigate = useNavigate();
    return (
        <Container>
            <div>
                <div className="flex justify-between mb-2">
                    <h1 className="font-extrabold text-4xl">Users:</h1>
                    <Link
                        to={'/user-form'}
                        className="bg-blue-500 px-3 flex justify-center items-center rounded-sm transition-colors hover:bg-blue-600 active:bg-blue-500 text-white">Add +</Link>
                </div>
                {users!.map((user) => (
                    <User
                        editUser={() => {
                            navigate(`user-form/edit/${user.id}`)

                        }}
                        deleteUser={() => {
                            deleteUserFromList!(user.id);
                        }}
                        key={user.id}
                        id={user.id}
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
