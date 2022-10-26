import { Button, CardActions, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Cards(props) {
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
        if (!dataToDB.businessImageUrl) dataToDB.businessImageUrl = businessImageUrl;
        axios.put(`http://localhost:4000/cards/updatemycardbyid?cardid=${cardId}`, dataToDB, { headers: { token: token } })
            .then(res => {
                setResFromDb(res.data)
                setTimeout(() => {
                    setEditPopUpWindow(false)
                    forceUpdateManagmentCards()
                    setResFromDb({})
                }, 1500)
            })
            .catch(err => console.error(err.response.data))
    }

    function deleteHandle() {
        axios.delete(`http://localhost:4000/cards/deletemycardbyid?cardid=${cardId}`, { headers: { token: token } })
            .then(() => {
                forceUpdateManagmentCards()
                setDeletePopUpWindow(false)
            })
            .catch(err => console.error(err.response.data))
    }

    return (
        <>
            {deletePopUpWindow &&
                <div className="blackWindowContainer">
                    <div className="deletePopUpContainer">
                        <h4 className='verifyDeleteContent'>Delete this card?</h4>
                        <CardActions className="buttonsContainer">
                            <Button size="medium" color="warning" variant="contained" onClick={deleteHandle}>Yes</Button>
                            <Button size="medium" variant="contained" onClick={() => setDeletePopUpWindow(false)} >No</Button>
                        </CardActions>
                    </div>
                </div>
            }
            {
                editPopUpWindow &&
                <div className="blackWindowContainer">
                    <div className="editPopUpContainer" >
                        <div className='closeWindow' onClick={() => setEditPopUpWindow(false)}>✖️</div>
                        <section id="businessContainerOfEdit" >
                            <form id="businessFormOfEdit" onSubmit={handleSubmit((data) => { editHandle(data) })}>

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
                                        minLength: {
                                            value: 10, message: "Phone Number must be at least 10 characters"
                                        }, maxLength: { value: 15, message: "Phone Number must contain up to 15 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessPhoneNumber?.message}</span>

                                <TextField
                                    type="text"
                                    label="Business Image Url"
                                    variant='standard'
                                    id="businessImageUrl"
                                    {...register("businessImageUrl", {
                                        maxLength: { value: 300, message: "Image Url must contain up to 300 characters" }
                                    })}></TextField>
                                <span className="validateMsg">{errors.businessImageUrl?.message}</span>

                                <Button variant="contained" type="submit" className='submitBtn' style={{ marginTop: 0 }}>Edit Card</Button>
                            </form>
                            <span className="resFromDb">{resFromDb[0]?.message}</span>
                        </section>
                    </div>
                </div>
            }
            <Button size="small" onClick={deletePopUpHandle} color="warning">Delete</Button>
            <Button size="small" onClick={editPopUpHandle}>Edit</Button>
        </>
    )
}
