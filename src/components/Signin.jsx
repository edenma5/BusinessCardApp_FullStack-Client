import { Button, TextField } from '@mui/material';
import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { loader } from './App';

export default function Signin() {
    const { loading, setLoading } = useContext(loader);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [resFromDb, setResFromDb] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmitHandle(inputDetails) {
        setLoading(true)
        axios.post('https://business-card-app-by-em.herokuapp.com/customers/signin', inputDetails)
            .then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                setUserName(userInfo?.fullName)
                setLoading(false)

                setTimeout(() => {
                    navigate('/')
                    setLoading(false)
                }, 2000)
                return userInfo;
            })
            .catch(err => {
                setLoading(false)
                setResFromDb(err.response.data)
            })
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <motion.h1
                    animate={{ opacity: [0, 1], x: [-400, 0] }}
                    transition={{ duration: .6 }}
                    className="mainTitle">Sign in</motion.h1>
            </div>
            <motion.section
                animate={{ opacity: [0, 1], y: [300, 0], scale: [.5, 1] }}
                transition={{ duration: .8 }}
                id="signinContainer">
                <form id="signinForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>
                    {loading && <Spinner className='loadingSpinner' style={{ bottom: '-18%' }} animation="grow" variant="secondary" />}
                    <TextField
                        className='inputField'
                        type="text"
                        label='Email*'
                        variant="standard"
                        id="standard-basic"
                        {...register("email", {
                            required: "Please enter email", pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "invalid email"
                            }
                        })}
                    ></TextField>
                    <span className="validateMsg">{errors.email?.message}</span>

                    <TextField
                        className='inputField'
                        type="password"
                        id="standard-basic"
                        label='Password*'
                        variant="standard"
                        {...register("password", {
                            required: "Please enter password", minLength: {
                                value: 8,
                                message: "password must contain 8 characters at least"
                            }, maxLength: {
                                value: 20,
                                message: "password must contain up to 20 characters"
                            }
                        })}
                    ></TextField>
                    <span className="validateMsg">{errors.password?.message}</span>
                    <Button variant="contained" type="submit" className='submitBtn'>Sign in</Button>
                    <Button variant="contained" className="signupBtn" size="small" type="button" onClick={() => { navigate('/signup') }} >Sign up</Button>
                </form>
                <span className="resFromDb">{userName ? `Welcome ${userName}` : resFromDb}</span>
            </motion.section>
        </div>
    )
}
