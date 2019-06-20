import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthManager } from '../auth/AuthManager';
import { Exercises } from '../components/Exercises';

export const ExercisesRoute: React.SFC<RouteProps> = (props: RouteProps) => {
    const { component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                AuthManager.isAuthenticated() ? (
                <Exercises {...props} />
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: props.location }
                    }}
                />
                )
            }
        />
    );
}
