import { Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import images from '../Images/index'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import { loader } from './App';

export default function Business() {
    const { loading, setLoading } = useContext(loader);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [resFromDb, setResFromDb] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();

    function onSubmitHandle(dataToDB) {
        setLoading(true)
        if (!dataToDB.businessImageUrl) dataToDB.businessImageUrl = images.defaultCardImg;
        axios.post('https://business-card-app-by-em.herokuapp.com/cards/createforbusinessuser', dataToDB, { headers: { 'token': userInfo?.token } })
            .then(res => {
                setResFromDb(res.data)
                setLoading(false)
                setTimeout(() => {
                    navigate('/managmentcards')
                }, 1500)
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
                    className="mainTitle">Create a business card</motion.h1>
                <motion.h6
                    animate={{ opacity: [0, 1], x: [400, 0] }}
                    transition={{ duration: .6 }}
                    className='littleTitle'
                >For business customers only</motion.h6>
            </div>

            <motion.section
                animate={{ opacity: [0, 1], y: [300, 0], scale: [.5, 1] }}
                transition={{ duration: .8 }}
                id="businessContainer">
                <form id="businessForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>
                    {loading && <Spinner className='loadingSpinner' animation="grow" variant="secondary" />}
                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Name*'
                        id="standard-basic"
                        {...register("businessName", {
                            required: "Please enter name", minLength: {
                                value: 5, message: "Name must be at least 5 characters"
                            }, maxLength: { value: 30, message: "Name must contain up to 30 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessName?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Description*'
                        id="standard-basic"
                        {...register("businessDescription", {
                            required: "Please enter description", minLength: {
                                value: 10, message: "Description must be at least 10 characters"
                            }, maxLength: { value: 100, message: "Description must contain up to 100 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessDescription?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Address*'
                        id="standard-basic"
                        {...register("businessAddress", {
                            required: "Please enter address", minLength: {
                                value: 10, message: "Address must be at least 10 characters"
                            }, maxLength: { value: 40, message: "Address must contain up to 40 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessAddress?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Phone*'
                        id="standard-basic"
                        {...register("businessPhoneNumber", {
                            required: "Please enter phone number", pattern: {
                                value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,9})$/,
                                message: 'Phone Numbers Only'
                            }, minLength: {
                                value: 10, message: "Phone Number must be at least 10 characters"
                            }, maxLength: { value: 15, message: "Phone Number must contain up to 15 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessPhoneNumber?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Image (URL)'
                        id="standard-basic"
                        {...register("businessImageUrl", {
                            pattern: {
                                value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, message: 'URL Only!'
                            },
                            maxLength: { value: 300, message: "Image URL must contain up to 300 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessImageUrl?.message}</span>

                    <Button variant="contained" type="submit" className='submitBtn'>Create Card</Button>
                </form>
                <span className="resFromDb">{resFromDb[0]?.message}</span>
            </motion.section>
        </div>
    )
}
