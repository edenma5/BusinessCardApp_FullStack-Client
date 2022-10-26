import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import images from '../Images/index'
import axios from 'axios'

export default function Business() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [resFromDb, setResFromDb] = useState({})
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmitHandle(dataToDB) {
        if (!dataToDB.businessImageUrl) dataToDB.businessImageUrl = images.defaultCardImg;
        axios.post('http://localhost:4000/cards/createforbusinessuser', dataToDB, { headers: { 'token': userInfo?.token } })
            .then(res => setResFromDb(res.data))
            .catch(err => setResFromDb(err.response.data))
    }

    return (
        <div style={{ marginBottom: "100px" }}>

            <div className='mainTitleContainer'>
                <h1 className="mainTitle">Create a business card</h1>
                <h6 className='littleTitle'>For business customers only</h6>
            </div>

            <section id="businessContainer">
                <form id="businessForm" onSubmit={handleSubmit((data) => { onSubmitHandle(data) })}>
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
                            required: "Please enter phone number", minLength: {
                                value: 10, message: "Phone Number must be at least 10 characters"
                            }, maxLength: { value: 15, message: "Phone Number must contain up to 15 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessPhoneNumber?.message}</span>

                    <TextField
                        type="text"
                        variant="standard"
                        label='Business Image'
                        id="standard-basic"
                        {...register("businessImageUrl", {
                            maxLength: { value: 300, message: "Image Url must contain up to 300 characters" }
                        })}></TextField>
                    <span className="validateMsg">{errors.businessImageUrl?.message}</span>

                    <Button variant="contained" type="submit" className='submitBtn'>Add Card</Button>
                </form>
                <span className="resFromDb">{resFromDb[0]?.message}</span>
            </section>
        </div>
    )
}
