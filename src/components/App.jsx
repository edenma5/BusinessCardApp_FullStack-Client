import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Business from './Business';
import Signin from './Signin';
import Signup from './Signup';
import MyBusinessCards from './ManagmentCards';
import AllBusinessCards from './AllBusinessCards';
import { createContext, useState } from 'react';

export const loader = createContext()

export default function App() {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <BrowserRouter>
                <loader.Provider value={{ loading, setLoading }}>
                    <Header />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='about' element={<About />} />
                        <Route path='business' element={<Business />} />
                        <Route path='signin' element={<Signin />} />
                        <Route path='signup' element={<Signup />} />
                        <Route path='managmentcards' element={<MyBusinessCards />} />
                        <Route path='allbusinesscards' element={<AllBusinessCards />} />
                    </Routes>
                    <Footer />
                </loader.Provider>
            </BrowserRouter>
        </>
    )
}

