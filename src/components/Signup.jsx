import React, { useContext, useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { loader } from './App';

export default function Signup() {
    const { loading, setLoading } = useContext(loader);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [resFromDb, setResFromDb] = useState('')

    function onSubmitHandle(dataToDB) {
        setLoading(true)
        axios.post('https://business-card-app-by-em.herokuapp.com/customers/new', dataToDB)
            .then(res => {
                setResFromDb(res.data)
                setLoading(false)
                setTimeout(() => {
                    navigate('/signin')
                }, 2000)
            })
            .catch(err => {
                setResFromDb(err.response.data)
                setLoading(false)
            })
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <motion.h1
                    animate={{ opacity: [0, 1], x: [-400, 0] }}
                    transition={{ duration: .6 }}
                    className="mainTitle">Sign up</motion.h1>
            </div>

            <motion.section
                animate={{ opacity: [0, 1], y: [300, 0], scale: [.5, 1] }}
                transition={{ duration: .8 }}
                id="signupContainer">
                <form id="signupForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>
                    {loading && <Spinner className='loadingSpinner' animation="grow" variant="secondary" />}
                    <TextField
                        type="text"
                        variant="standard"
                        label='Full Name*'
                        id="standard-basic"

                        {...register("fullName", { required: "please enter full name", minLength: { value: 5, message: "Full name must contain 5 characters at least" } })}
                    ></TextField>
                    <span className="validateMsg">{errors.fullName?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Email*'
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
                        type="password"
                        variant="standard"
                        label='Password*'
                        id="standard-basic"
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

                    <FormGroup className="businessCheckBox">
                        <FormControlLabel control={<Checkbox {...register("isBusinessAccount")} />} label="Business Account?" />
                    </FormGroup>

                    <Button className="submitBtn" variant="contained" type="submit" >Sign up</Button>
                    <Button variant="contained" className="signinBtn" size="small" type="button" onClick={() => { navigate('/signin') }} >Sign in</Button>
                </form>
                <span className="resFromDb">{resFromDb}</span>
            </motion.section>
        </div>
    );
}
