import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';

import { ExercisesRoute } from './ExercisesRoute';
import { Exercises } from '../components/Exercises';
import { Login } from '../components/Login';

export const AppRouter: React.SFC<{}> = () => {
    return (
        <Router>
            <div>
                <nav>
                <ul>
                    <li>
                        <Link to="/exercises">Exercises</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
                </nav>

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
            </div>
        </Router>
    );
}
