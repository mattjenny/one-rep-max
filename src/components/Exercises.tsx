import React from 'react';
import { RouteChildrenProps } from 'react-router';
import styled from 'styled-components';
import { AuthManager } from '../auth/AuthManager';

const ExercisesWrapper = styled.div`
`;

export class Exercises extends React.PureComponent<RouteChildrenProps, {}> {
    public render() {
        return (
            <ExercisesWrapper>
                Exercises go here!
                <button onClick={this.logout}>Log out</button>
            </ExercisesWrapper>
        );
    }

    private logout = () => {
        AuthManager.logout();
        this.props.history.replace("/login");
    }
}
