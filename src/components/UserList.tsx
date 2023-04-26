import React, { useState } from "react";
import User from "./User";
import Container from "./Container";
import { IUsers, IData } from "../Interfaces/interfaces";
import { Link, Params, redirect, useActionData, useNavigate } from "react-router-dom";
import { BsPersonAdd } from 'react-icons/bs'
import { MdFilterList } from 'react-icons/md'
import Filter from "./Filter";
import axios from "axios";
import { useLoaderData, useSubmit } from "react-router-dom";

const BASE_URL = 'http://localhost:3000/users'

const UserList = () => {
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const users = useLoaderData();
    const filteredUsers = useActionData();

    console.log(filteredUsers)

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
                {toggle && <Filter />}
                <div className='relative overflow-y-auto lg:space-y-0 space-y-4 lg:h-full h-[500px]'>
                {((filteredUsers ? filteredUsers : users) as IData[]).map((user, index) => (
                    <User
                        editUser={() => {
                            navigate(`user-form/edit/${user.id}`)

                        }}
                        deleteUser={() => {
                            axios.delete(`${BASE_URL}/${user.id}`)
                            navigate("/")
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

export const loader = async() => {

    const data = (await axios.get(BASE_URL)).data

    return data;

}


export const action = async({request,params}: {request: Request, params: Params}) => {
    let filterData = await request.formData();

    let extractedFilterData = {
        fullname: filterData.get("fullname"),
        email: filterData.get("email"),
        role: filterData.get("role"),
    }

    const queryParams = Object.entries(extractedFilterData)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        if (key === 'fullname' || key === 'email') {
          return `${key}_like=${value}`
        }
        return `${key}=${value}`
      }
      )
      .join('&');

    const data = (await axios.get(`${BASE_URL}?${queryParams}`)).data

    return data;
}