import React from 'react';
import './App.css';
import {StyledAppWrapper} from './AppStyles';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {NavBar} from "../feautures/Todolists/NavBar/NavBar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Todolists} from "../feautures/Todolists/Todolists";
import {Login} from "../feautures/Todolists/Login/Login";
import {NotFound} from "../feautures/Todolists/NotFound/NotFound";

const App = () => {

    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress color="primary" />}

            <NavBar/>



            <StyledAppWrapper>
                <Routes>
                    <Route path="/" element={<Todolists/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<NotFound/>}/>
                    <Route path="*" element={<Navigate to='/404' />}/>
                </Routes>

            </StyledAppWrapper>
        </div>
    );
}

export default App;