import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

import { ExercisesRoute } from './ExercisesRoute';
import { Exercises } from '../components/Exercises';
import { Login } from '../components/Login';

export const AppRouter: React.SFC<{}> = () => {
    return (
        <Router>
            <ExercisesRoute path="/exercises" component={Exercises} />
            <Route path="/login" component={Login} />
            <Route
                path="/"
                render={() => (
                    <Redirect
                        to={{
                            pathname: "/exercises",
                            state: { from: "/" }
                        }}
                    />
                )
            } />
        </Router>
    );
}
