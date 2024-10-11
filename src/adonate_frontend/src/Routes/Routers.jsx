import React, { useState } from "react";
import { Body } from "../Body/Body";
import Donate from "../Donate/Donate";
import { Admin } from "../Admin/Admin";
import { Routes, Route, Navigate } from "react-router-dom";
import DonationHistory from "../History/History";

export const Routers = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/home" element={<Body />} />
        <Route
          path="/admin"
          element={<Admin />}
        />
        <Route
          path="/donate"
          element={<Donate />}
        />
        <Route
          path="/history"
          element={<DonationHistory />}
        />
      </Routes>
    </>
  );
};
