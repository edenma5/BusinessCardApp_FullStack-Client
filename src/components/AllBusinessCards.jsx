import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function AllBusinessCards() {
    const [itemsArr, setItemsArr] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        axios.get('http://localhost:4000/cards/getallcards', { headers: { token: userInfo?.token } })
            .then(res => setItemsArr(res.data))
            .catch(err => setItemsArr(err.response.data))
    }, [])

    return (
        <div style={{ marginBottom: "100px" }}>

            <div className='mainTitleContainer'>
                <h1 className="mainTitle">All Business Cards</h1>
            </div>

            <div id='cardContiner'>
                {itemsArr[0]?.message ? <div className="messageToClient"><h4 style={{ fontSize: '2em' }}>{itemsArr[0].message}</h4></div> : itemsArr.length === 0 ?
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
