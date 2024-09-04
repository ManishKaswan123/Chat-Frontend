import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import logo2 from '../assets/logo2.png'
import Avatar from './Avatar';
import Editor from './Editor';
import { IoIosSearch } from 'react-icons/io';
import Loading from './Loading';
import axios from 'axios';
import toast from 'react-hot-toast';
import ClientSearchCard from './ClientSearchCard';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Room = () => {
    const user = useSelector(state => state?.user);
    const [loading, setLoading] = useState(false);
    const [searchUser, setSearchUser] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [client, setClient] = useState([
        {   
            username: 'Client 1' ,
            socketId: 1
        }, 
        {
            username: 'Client 2',
            socketId: 2
        }
    ]);

    const handleSearchUser = async () => {
        const URL = `${process.env.REACT_APP_API_URL}/api/search-user`;
        try {
            setLoading(true);

            const response = await axios.post(URL, {
                search: search
            });

            setSearchUser(response?.data?.data);
            setLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || error);
            setLoading(false);
        }
    }

    const onClose = () => {
        setSearchUser([]);
        setSearch('');
    };

    const fetchUserDetails = async() => {
        try {
            const URL = `${process.env.REACT_APP_API_URL}/api/user-details`;
            const response = await axios({
                url: URL,
                withCredentials: true,
            });
    
            dispatch(setUser(response?.data?.data));
    
            if(response?.data?.data?.logout) {
              dispatch(logout());
              navigate('/email');
            }
    
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    
    const toggleSelect = (userId) => {
      setSelectedUserIds((prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId)
          : [...prevSelected, userId]
      );
    };

    useEffect(() => {
        if(search?.length > 0) {
            handleSearchUser();
        } else {
            setSearchUser([]);
        }
    } , [search]);

    useEffect(() => {
        fetchUserDetails();
    } , []);

    return (
        <div className='flex h-screen'>
            <div className='h-screen'>
                <SideBar name={'Room'} />
            </div>
            <div className='flex flex-col bg-white p-2 relative'> {/* Added relative position here */}
                <div className='flex flex-col'>
                    <div className='border-b border-gray-300'>
                        <img 
                            src={logo2} 
                            alt='logo' 
                            width={200}
                        />
                    </div>
                    {/* Search User */}
                    <div className='rounded h-12 overflow-hidden flex border mt-2 shadow-md'>
                        <input 
                            type='text' 
                            placeholder='Add a client' 
                            className='w-full outline-none h-full px-4 py-1' 
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />   
                        <div className='h-12 w-8 flex justify-center items-center cursor-pointer'>
                            <IoIosSearch
                                size={25}
                                className='text-gray-500'
                            />
                        </div>
                    </div>
                    {/* Display searched user */}
                    {search.length > 0 && (
                        <div className='bg-white mt-[60%] lg:mt-[50%] md:mt-[50%] p-2 w-[94%] rounded absolute z-10 border shadow-md'> {/* Added absolute position and z-index */}
                            {/* No user found */}
                            {search.length > 0 && searchUser.length === 0 && !loading && (
                                <p className='text-gray-400 text-center p-1'>No user found!</p>
                            )}

                            {/* Loading */}
                            {loading && (
                                <div>
                                    <Loading />
                                </div>
                            )}

                            {/* User found */}
                            {/* {searchUser?.length > 0 && !loading && (
                                <div>
                                    {searchUser?.map((user) => (
                                        <ClientSearchCard key={user?._id} user={user} onClose={onClose}/>
                                    ))}
                                    <button className='border px-4 py-1 w-full rounded   bg-secondary text-white font-bold mt-1 hover:bg-third'>Invite</button>
                                </div>

                            )} */}
                            {searchUser?.length > 0 && !loading && (
                                <div>
                                {searchUser?.map((user) => (
                                    <ClientSearchCard
                                    key={user?._id}
                                    user={user}
                                    onClose={onClose}
                                    isSelected={selectedUserIds.includes(user?._id)}
                                    toggleSelect={toggleSelect}
                                    />
                                ))}
                                <button className='border px-4 py-1 w-full rounded bg-secondary text-white font-bold mt-1 hover:bg-third'>
                                    Invite
                                </button>
                                </div>
                            )}

                        </div>
                    )}
                    <h3 className='font-semibold text-lg mt-3'>
                        Connected
                    </h3>
                    <div>
                        {client?.map((client) => (
                            <div key={client.socketId} className='flex items-center my-3'>
                                <Avatar 
                                    width={50}
                                    height={50}
                                    name={client?.username} 
                                />
                                <h3 className='text-ellipsis line-clamp-1 font-semibold text-base ml-3'>{client?.username}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-3 mt-auto mb-6'>
                    <button className='border-gray-200 border px-4 bg-gray-200 font-semibold py-1 rounded hover:border-gray-400 hover:bg-gray-400 hover:font-bold'>Copy Room ID</button>
                    <button className='border-red-400 border px-4 py-1 rounded bg-red-400  hover:border-red-500 hover:bg-red-500 text-white hover:font-bold'>Leave Room</button>
                </div>
            </div>

            <div className=''>
                <Editor />
            </div>
        </div>
    )
}

export default Room