import React from 'react';
import AdminNavBar from "./AdminNavBar";
import { Switch, Route } from 'react-router-dom';
import AdminHome from "./AdminHome";

function AdminLayout() {
    return(
        <>
            <AdminNavBar />

            <div>
                <Switch>
                    <Route path={"/admin"} exact component={AdminHome} />
                </Switch>
            </div>
        </>
    );
}

export default AdminLayout;
