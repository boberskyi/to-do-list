import React, { useEffect } from "react";
import "./App.css";
import { StyledAppWrapper } from "./AppStyles";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppDispatch, useAppSelector } from "./store";
import { RequestStatusType } from "./app-reducer";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { NavBar } from "../feautures/Todolists/NavBar/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Todolists } from "../feautures/Todolists/Todolists";
import { Login } from "../feautures/Todolists/Login/Login";
import { NotFound } from "../feautures/Todolists/NotFound/NotFound";
import { meTC } from "../feautures/Todolists/Login/auth-reducer";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(meTC());
  }, []);

  const status = useAppSelector<RequestStatusType>((state) => state.app.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      {status === "loading" && <LinearProgress color="primary" />}

      <NavBar />

      <StyledAppWrapper>
        <Routes>
          <Route path="/" element={<Todolists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </StyledAppWrapper>
    </div>
  );
};

export default App;
