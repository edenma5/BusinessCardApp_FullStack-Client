import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Cards from "./Cards";
import Spinner from 'react-bootstrap/Spinner';
import { loader } from "./App";

export default function ManagmentCards() {
    const { loading, setLoading } = useContext(loader)
    const [update, updateState] = useState();
    const forceUpdateManagmentCards = useCallback(() => updateState({}), [])
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate()
    const [itemsArr, setItemsArr] = useState([]);
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        axios.get('https://business-card-app-by-em.herokuapp.com/cards/getallmycards', {
            headers: { token: `${userInfo?.token}` }
        })
            .then(res => {
                setItemsArr(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
                if (err.response.data[0].message === 'Token Expired') setTokenExpired(true);
                else setItemsArr([])
            })

        return setLoading(true)
    }, [update]);

    function tokenExpiredHandle() {
        localStorage.clear();
        setTokenExpired(false);
        navigate('/signin');
    }

    return (
        <div style={{ marginBottom: "100px" }}>
            <div className='mainTitleContainer'>
                <h1 className="mainTitle">My Business Cards</h1>
            </div>
            {loading ? <Spinner className='loadingSpinner' style={{ top: '300px' }} animation="grow" variant="secondary" /> :
                <div id='cardContiner'>
                    {tokenExpired ? <div className="messageToClient"><h4 style={{ fontSize: '2em' }}>Dear customer,<br /> Your stay on this site has expired, you can log in again by <span style={{ cursor: 'pointer', color: '#528265', textShadow: '1px 1px 1px #6f6f6f' }} onClick={() => tokenExpiredHandle()}>clicking here</span></h4></div> : itemsArr.length === 0 ?
                        <div className="messageToClient">
                            <h4 style={{ fontSize: '2em' }}>I'ts looks like you haven't created a business card yet</h4>
                            <h4 style={{ fontSize: '2em' }}>You can do it right <span style={{ cursor: 'pointer', color: '#528265', textShadow: '1px 1px 1px #6f6f6f' }} onClick={() => navigate('/business')}>here</span></h4>
                        </div> : itemsArr.map((item) => {
                            return (
                                <Card sx={{ width: 260, height: 480 }} key={item._id} id='card'>
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
                </div>}
        </div>
    )
}
