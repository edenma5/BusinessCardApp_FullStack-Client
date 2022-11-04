import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function AllBusinessCards() {
    const [itemsArr, setItemsArr] = useState([]);
    const [tokenExpired, setTokenExpired] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://business-card-app-by-em.herokuapp.com/cards/getallcards', { headers: { token: userInfo?.token } })
            .then(res => setItemsArr(res.data))
            .catch(err => {
                if (err.response.data[0].message === 'Token Expired') setTokenExpired(true);
                else setItemsArr([])
            })
    }, [])

    function tokenExpiredHandle() {
        localStorage.clear();
        setTokenExpired(false);
        navigate('/signin');
    }

    return (
        <div style={{ marginBottom: "100px" }}>

            <div className='mainTitleContainer'>
                <h1 className="mainTitle">All Business Cards</h1>
            </div>
            <div id='cardContiner'>
                {tokenExpired ? <div className="messageToClient"><h4 style={{ fontSize: '2em' }}>Dear customer,<br /> Your stay on this site has expired, you can log in again by <span style={{ cursor: 'pointer', color: 'rgb(0, 101, 101)', fontWeight: 'bolder', fontSize: '1.2em' }} onClick={() => tokenExpiredHandle()}>clicking here</span></h4></div> :
                    itemsArr.length === 0 ?
                        <div className="messageToClient">
                            <h4 style={{ fontSize: '2em' }}>No data to display</h4>
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
                                </Card>
                            )
                        })}
            </div>
        </div>
    )
}
