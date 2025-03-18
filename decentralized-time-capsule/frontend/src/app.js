import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MyCapsulesPage from "./pages/MyCapsulesPage";
import CapsuleDetail from "./pages/CapsuleDetail";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/my-capsules" element={<MyCapsulesPage />} />
                <Route path="/capsule/:id" element={<CapsuleDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
