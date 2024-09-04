import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import SideBar from '../components/SideBar';
import logo2 from '../assets/logo2.png';
import io from 'socket.io-client';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    fetchUserDetails();
  } , []);

  // Socket connection
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_API_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketConnection.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));
    // dispatch(setSocketConnection(true));
    return () => {
      socketConnection.disconnect();
    };
  }, [location?.pathname]);

  const basePath = location.pathname === '/';
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && 'hidden'} lg:block`}>
        <SideBar name={'Chat'}/>
      </section>

      {/* Message Component */}
      <section className={`${basePath && 'hidden'} `}>
          <Outlet />
      </section>

      <div className={`hidden flex-col justify-center items-center ${!basePath ? 'hidden' : "hidden lg:flex"}`}>
        <div>
          <img 
            src={logo2}
            alt='logo'
            width={300}
          />
        </div>
        <p className='text-lg  text-gray-500'>Select user to send message</p>
      </div>
    </div>
  )
}

export default Home