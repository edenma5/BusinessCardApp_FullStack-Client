import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [resFromDb, setResFromDb] = useState('')

    function onSubmitHandle(dataToDB) {
        axios.post('https://business-card-app-by-em.herokuapp.com/customers/new', dataToDB)
            .then(res => setResFromDb(res.data))
            .catch(err => setResFromDb(err.response.data))
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">Signup</h1>
            </div>

            <section id="signupContainer">
                <form id="signupForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>

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
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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

                    <Button className="submitBtn" variant="contained" type="submit" >Signup</Button>
                    <Button variant="contained" className="signinBtn" size="small" type="button" onClick={() => { navigate('/signin') }} >Signin</Button>
                </form>
                <span className="resFromDb">{resFromDb}</span>
            </section>
        </div>
    );
}