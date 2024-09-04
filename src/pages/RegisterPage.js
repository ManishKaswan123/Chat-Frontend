import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [data , setData] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: ''
    })
    const [uplaodPhoto, setUploadPhoto] = useState('');

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPhoto = async(e) => {
        const file = e.target.files[0];
        const uplaodPhoto = await uploadFile(file);
        setUploadPhoto(file);
        setData((prev) => {
            return {
                ...prev,
                profile_pic: uplaodPhoto?.url
            }
        });
    }

    const handleClearUplaodPhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setUploadPhoto('');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('data', data);

        const URL = `${process.env.REACT_APP_API_URL}/api/register`;

        try {
            const response = await axios.post(URL, data);
            toast.success(response?.data?.message);

            if(response?.data?.success) {
                setData({
                    name: '',
                    email: '',
                    password: '',
                    profile_pic: ''
                });
                setUploadPhoto('');
                navigate('/email');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className='mt-10'>
            <div className='bg-white w-[90%] max-w-md overflow-hidden p-4 rounded-lg shadow-lg mx-auto'>
                <h3 className='font-semibold text-center text-xl mt-2'>Welcome to Chat App</h3>
                <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Name: </label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className='bg-slate-100 px-2 py-1 focus:outline-primay rounded pt-2 pb-2'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
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
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='password'>Password: </label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            className='bg-slate-100 px-2 py-1 focus:outline-primay rounded pt-2 pb-2'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                        />  
                    </div>
                    <div className='flex flex-col gap-1 cursor-pointer'>
                        <label htmlFor='profile_pic'>
                            Profile Picture: 
                            <div className='h-14 bg-slate-100 flex justify-center items-center border hover:border-primay rounded cursor-pointer'>
                                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                                    {uplaodPhoto?.name ? uplaodPhoto?.name : 'Upload your profile picture'}
                                </p>
                                {uplaodPhoto?.name &&   
                                    <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUplaodPhoto}>
                                        <IoClose />
                                    </button>
                                }
                            </div>
                        </label>
                        <input 
                            type='file'
                            id='profile_pic'
                            name='profile_pic'
                            className='bg-slate-100 px-2 py-1 focus:outline-primay hidden rounded cursor-pointer'
                            onChange={handleUploadPhoto}
                            // value={data.profile_pic}
                            // onChange={handleOnChange}
                            // required
                        />
                    </div>
                    <button className='bg-primay text-lg text-gray-600 px-4 py-1 hover:bg-secondary hover:text-white rounded mt-2 font-bold leading-relaxed tracking-wider'>
                        Register
                    </button>
                </form>
                <p className='my-3 text-center'>Already have an account? <Link to={'/email'} className='hover:text-secondary font-semibold'>Login</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage