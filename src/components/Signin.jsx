import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Signin() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [resFromDb, setResFromDb] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmitHandle(inputDetails) {
        axios.post('https://business-card-app-by-em.herokuapp.com/customers/signin', inputDetails)
            .then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                setUserName(userInfo?.fullName)
                setTimeout(() => {
                    navigate('/')
                }, 1500)
                return userInfo;
            })
            .catch(err => setResFromDb(err.response.data))
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">Signin</h1>
            </div>

            <section id="signinContainer">
                <form id="signinForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>
                    <TextField
                        className='inputField'
                        type="text"
                        label='Email*'
                        variant="standard"
                        id="standard-basic"
                        {...register("email", {
                            required: "Please enter email", pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
                    <Button variant="contained" type="submit" className='submitBtn'>Signin</Button>
                    <Button variant="contained" className="signupBtn" size="small" type="button" onClick={() => { navigate('/signup') }} >Signup</Button>
                </form>
                <span className="resFromDb">{userName ? `Welcome ${userName}` : resFromDb}</span>
            </section>
        </div>
    )
}
