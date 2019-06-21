import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthManager } from '../auth/AuthManager';
import { initializeApp, clearCachedUserData } from '../store/actions';
import { IState } from '../store/types';

const ExercisesWrapper = styled.div`
`;

interface IStateProps {
    userId: number | void;
}

interface IDispatchProps {
    initialize(userId: number): void;
    clearCachedUser(): void;
}

type Props = IStateProps & IDispatchProps & RouteChildrenProps;

class UnconnectedExercises extends React.PureComponent<Props, {}> {
    public componentWillMount() {
        if (this.props.userId != null) {
            this.props.initialize(this.props.userId);
        } 
    }

    public componentWillUnmount() {
        this.props.clearCachedUser();
    }

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

function mapStateToProps(state: IState): IStateProps {
    return {
        userId: state.user && state.user.id,
    };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return {
        initialize: (userId: number) => dispatch(initializeApp(userId)),
        clearCachedUser: () => dispatch(clearCachedUserData()),
    };
}

export const Exercises = connect(mapStateToProps, mapDispatchToProps)(UnconnectedExercises);