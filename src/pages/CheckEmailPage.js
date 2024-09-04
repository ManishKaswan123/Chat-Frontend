import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserAstronaut } from "react-icons/fa6";

const CheckEmailPage = () => {
    const navigate = useNavigate();
    const [data , setData] = useState({
        email: '',
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${process.env.REACT_APP_API_URL}/api/email`;

        try {
            const response = await axios.post(URL, data);
            toast.success(response?.data?.message);

            if(response?.data?.success) {
                setData({
                    email: '',
                });
                navigate('/password' , {
                  state: response?.data?.user
                });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='mt-10'>
            <div className='bg-white w-[90%] max-w-md overflow-hidden p-4 rounded-lg shadow-lg mx-auto'>
              <div className='w-fit mx-auto mb-2'>
                <FaUserAstronaut 
                  size={80}
                />
              </div>
                <h3 className='font-semibold text-center text-xl mt-2'>Welcome to Chat App</h3>
                <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email'>Email: </label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter your email'
                            className='bg-slate-100 px-2 py-1 focus:outline-primay rounded pt-2 pb-2'
                            value={data.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <button className='bg-primay text-lg text-gray-600 px-4 py-1 hover:bg-secondary hover:text-white rounded mt-2 font-bold leading-relaxed tracking-wider'>
                        Let's Go
                    </button>
                </form>
                <p className='my-3 text-center'>New User ?  <Link to={'/register'} className='hover:text-secondary font-semibold'>Register</Link></p>
            </div>
        </div>
    )
}

export default CheckEmailPage