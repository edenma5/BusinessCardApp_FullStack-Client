import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Cards from "./Cards";

export default function ManagmentCards() {
    const [update, updateState] = useState();
    const forceUpdateManagmentCards = useCallback(() => updateState({}), [])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()
    const [itemsArr, setItemsArr] = useState([]);

    useEffect(() => {
        axios.get('https://business-card-app-by-em.herokuapp.com/cards/getallmycards', {
            headers: { token: `${userInfo?.token}` }
        })
            .then(res => setItemsArr(res.data))
            .catch(err => setItemsArr(err.response.data))
    }, [update, userInfo])

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">My Business Cards</h1>
            </div>
            <div id='cardContiner'>
                {itemsArr[0]?.message ? <div className="messageToClient"><h4 style={{ fontSize: '2em' }}>{itemsArr[0].message}</h4></div> : itemsArr.length === 0 ?
                    <div className="messageToClient">
                        <h4 style={{ fontSize: '2em' }}>I'ts looks like you haven't created a business card yet</h4>
                        <h4 style={{ fontSize: '2em' }}>You can do it right <span style={{ cursor: 'pointer', color: '#528265', fontWeight: 'bolder' }} onClick={() => navigate('/business')}>here</span></h4>
                    </div> : itemsArr.map((item) => {
                        return (
                            <Card sx={{ width: 260 }} key={item._id} id='card'>
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={item.businessImageUrl}
                                    alt={item.businessName}
                                />
                                <CardContent className="cardContent">
                                    <Typography className="cardTitle" gutterBottom variant="h6" component="div">
                                        {item.businessName}
                                    </Typography>
                                    <Typography className="cardDescription" variant="body1" color="text.secondary">
                                        {item.businessDescription}
                                    </Typography><br></br>
                                    <Typography variant="body2" color="text.secondary">
                                        <span style={{ color: 'black', fontWeight: '900' }}>Address:</span> {item.businessAddress}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <span style={{ color: 'black', fontWeight: '900' }}>Tel:</span> {item.businessPhoneNumber}
                                    </Typography>
                                    <Typography className="cardDate" variant="body2" color="text.secondary">
                                        <span style={{ color: 'black', fontWeight: '900' }}>Date:</span> {item.createDate.slice(0, 10)}
                                    </Typography>
                                </CardContent>
                                <CardActions className="cardBtn">
                                    <Cards cardId={item._id} token={userInfo.token} businessName={item.businessName} businessDescription={item.businessDescription} businessAddress={item.businessAddress} businessPhoneNumber={item.businessPhoneNumber}
                                        businessImageUrl={item.businessImageUrl} forceUpdateManagmentCards={forceUpdateManagmentCards} />
                                </CardActions>
                            </Card>
                        )
                    })}
            </div>
        </div>
    )
}
