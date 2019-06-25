import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthManager } from '../auth/AuthManager';
import {
    initializeApp,
    clearCachedUserData,
    setSelectedExerciseId as setSelectedExerciseIdAction,
} from '../store/actions';
import {
    selectExerciseSidebar,
    selectSelectedExerciseId,
    selectExerciseInfo,
    selectExerciseData,
} from '../store/selectors';
import {
    IState,
    IDisplayExercise,
    IWorkoutExercise,
} from '../store/types';
import { ExerciseSidebar } from './ExerciseSidebar';

const ExercisesWrapper = styled.div`
    display: flex;
    height: 100%;
`;

interface IStateProps {
    userId: number | void;
    exercises: IDisplayExercise[];
    selectedExerciseId: number | void;
    exerciseInfo: IDisplayExercise;
    exerciseData: IWorkoutExercise[];
}

interface IDispatchProps {
    initialize(userId: number): void;
    clearCachedUser(): void;
    setSelectedExerciseId(exerciseId: number): void;
}

type Props = IStateProps & IDispatchProps & RouteChildrenProps;

export class UnconnectedExercises extends React.PureComponent<Props, {}> {
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
                <ExerciseSidebar
                    exercises={this.props.exercises}
                    selectedExerciseId={this.props.selectedExerciseId}
                    setSelectedExerciseId={this.props.setSelectedExerciseId}
                />
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
        exercises: selectExerciseSidebar(state),
        selectedExerciseId: selectSelectedExerciseId(state),
        exerciseInfo: selectExerciseInfo(state),
        exerciseData: selectExerciseData(state),
    };
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return {
        initialize: (userId: number) => dispatch(initializeApp(userId)),
        clearCachedUser: () => dispatch(clearCachedUserData()),
        setSelectedExerciseId: (exerciseId: number) => dispatch(setSelectedExerciseIdAction(exerciseId)),
    };
}

export const Exercises = connect(mapStateToProps, mapDispatchToProps)(UnconnectedExercises);
