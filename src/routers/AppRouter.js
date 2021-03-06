import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import {AuthRouter} from './AuthRouter';
import {JournalScreen} from '../components/journal/JournalScreen';
import {firebase} from "../firebase/firebase-config";
import {useDispatch} from "react-redux";
import {login} from "../actions/auth";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogged, setLogged] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {

            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));
                setLogged(true);

            } else {

                setLogged(false);

            }

            setChecking(false);

        });
    }, [dispatch, setChecking, setLogged])


    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={isLogged}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuthenticated={isLogged}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login"/>


                </Switch>
            </div>
        </Router>
    )
}
