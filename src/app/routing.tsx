import React from 'react';
import {Route, Routes} from "react-router-dom";
import {CustomRouter} from "./router/custom-router.tsx";
import {MainLayout} from "../widgets/main-layout";
import {history} from "./router/router-history.ts";
import {HomePage} from "../pages/home";
import {EarnPage} from "../pages/earn";
import {FriendsPage} from "../pages/friends";
import {Levels} from "../features/levels";

const Routing = () => {
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/tasks" element={<EarnPage/>}/>
                    <Route path="/friends" element={<FriendsPage/>}/>

                    <Route path="/levels" element={<Levels/>}/>
                </Route>
            </Routes>
        </CustomRouter>
    );
};

export default Routing;