import { Button, CardActions, duration, TextField } from '@mui/material'
import { motion } from "framer-motion";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

export default function Cards(props) {
    const [loading, setLoading] = useState(false);
    const [resFromDb, setResFromDb] = useState({})
    const { cardId, token, businessName, businessDescription, businessAddress, businessPhoneNumber, businessImageUrl, forceUpdateManagmentCards } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            businessName: businessName,
            businessDescription: businessDescription,
            businessAddress: businessAddress,
            businessPhoneNumber: businessPhoneNumber
        }
    })
    const [deletePopUpWindow, setDeletePopUpWindow] = useState(false)
    const [editPopUpWindow, setEditPopUpWindow] = useState(false)

    function deletePopUpHandle() {
        setDeletePopUpWindow(true);
    }
    function editPopUpHandle() {
        setEditPopUpWindow(true);
    }

    function editHandle(dataToDB) {
        setLoading(true)
        if (!dataToDB.businessImageUrl) dataToDB.businessImageUrl = businessImageUrl;
        axios.put(`https://business-card-app-by-em.herokuapp.com/cards/updatemycardbyid?cardid=${cardId}`, dataToDB, { headers: { token: token } })
            .then(res => {
                setResFromDb(res.data)
                setLoading(false)
                setTimeout(() => {
                    setEditPopUpWindow(false)
                    forceUpdateManagmentCards()
                    setResFromDb({})
                }, 1500)
            })
            .catch(err => {
                setResFromDb(err.response.data)
                setLoading(false)
            })
    }

    function deleteHandle() {
        setLoading(true)
        axios.delete(`https://business-card-app-by-em.herokuapp.com/cards/deletemycardbyid?cardid=${cardId}`, { headers: { token: token } })
            .then(() => {
                forceUpdateManagmentCards()
                setDeletePopUpWindow(false)
                setLoading(false)
            })
            .catch(err => {
                setResFromDb(err.response.data)
                setLoading(false)
            })
    }

    return (
        <>
            {deletePopUpWindow &&
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: .3 }}
                    className="blackWindowContainer">
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ delay: .2, duration: .5 }}
                        className="deletePopUpContainer">
                        <h4 className='verifyDeleteContent'>Are you sure you want to delete: <br /> {businessName} ?</h4>
                        <CardActions className="buttonsContainer">
                            <Button size="large" color="warning" variant="contained" onClick={deleteHandle}>Yes</Button>
                            <Button size="large" variant="contained" onClick={() => setDeletePopUpWindow(false)} >No</Button>
                        </CardActions>
                        {loading && <Spinner className='loadingSpinner' style={{ top: '200px' }} animation="grow" variant="secondary" />}
                    </motion.div>
                </motion.div>
            }
            {
                editPopUpWindow &&
                <motion.div
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: .3 }}
                    className="blackWindowContainer">
                    <motion.div
                        animate={{ opacity: [0, 1] }}
                        transition={{ delay: .2, duration: .5 }}
                        className="editPopUpContainer" >
                        <div className='closeWindow' onClick={() => setEditPopUpWindow(false)}>✖️</div>
                        <section id="businessContainerOfEdit" >
                            <form id="businessFormOfEdit" onSubmit={handleSubmit((data) => { editHandle(data) })}>
                                {loading && <Spinner className='loadingSpinner' animation="grow" variant="secondary" />}
                                <TextField
                                    type="text"
                                    variant="standard"
                                    label="Business Name"
                                    id="businessName"
                                    {...register("businessName", {
                                        minLength: {
                                            value: 5, message: "Name must be at least 5 characters"
                                        }, maxLength: { value: 30, message: "Name must contain up to 30 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessName?.message}</span>

                                <TextField
                                    type="text"
                                    label="Business Description"
                                    variant='standard'
                                    id="businessDescription"
                                    {...register("businessDescription", {
                                        minLength: {
                                            value: 10, message: "Description must be at least 10 characters"
                                        }, maxLength: { value: 100, message: "Description must contain up to 100 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessDescription?.message}</span>

                                <TextField
                                    type="text"
                                    label="Business Address"
                                    variant='standard'
                                    id="businessAddress"
                                    {...register("businessAddress", {
                                        minLength: {
                                            value: 10, message: "Address must be at least 10 characters"
                                        }, maxLength: { value: 40, message: "Address must contain up to 40 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessAddress?.message}</span>

                                <TextField
                                    type="text"
                                    label="Business Phone Number"
                                    variant='standard'
                                    id="businessPhoneNumber"
                                    {...register("businessPhoneNumber", {
                                        pattern: {
                                            value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4,9})$/,
                                            message: 'Phone Numbers Only'
                                        },
                                        minLength: {
                                            value: 10, message: "Phone Number must be at least 10 characters"
                                        }, maxLength: { value: 15, message: "Phone Number must contain up to 15 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessPhoneNumber?.message}</span>

                                <TextField
                                    type="text"
                                    label="Business Image (URL)"
                                    variant='standard'
                                    id="businessImageUrl"
                                    {...register("businessImageUrl", {
                                        pattern: {
                                            value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/, message: 'URL Only!'
                                        },
                                        maxLength: { value: 300, message: "Image Url must contain up to 300 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessImageUrl?.message}</span>

                                <Button variant="contained" type="submit" className='submitBtn' style={{ marginTop: 0 }}>Edit Card</Button>
                            </form>
                            <span className="resFromDb">{resFromDb[0]?.message}</span>
                        </section>
                    </motion.div>
                </motion.div>
            }
            <Button size="small" onClick={deletePopUpHandle} color="warning">Delete</Button>
            <Button size="small" onClick={editPopUpHandle}>Edit</Button>
        </>
    )
}
