import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthManager } from '../auth/AuthManager';
import { RED } from '../constants/colors';
import { HEADER_HEIGHT } from '../constants/layout';
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
import { ExerciseData } from './ExerciseData';

const ExercisesWrapper = styled.div`
    display: flex;
    height: 100%;
`;

const ExerciseDetailPanel = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ExerciseBanner = styled.div`
    display: flex;
    justify-content: space-between;
    height: ${HEADER_HEIGHT}px;
    color: white;
    background: ${RED};
    padding: 15px 10px;
    font-weight: 600;
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
                <ExerciseDetailPanel>
                    <ExerciseBanner>
                        <span />
                        <span>{this.props.exerciseInfo && this.props.exerciseInfo.name}</span>
                        <button onClick={this.logout}>Log out</button>
                    </ExerciseBanner>
                    <ExerciseData exercise={this.props.exerciseInfo} data={this.props.exerciseData} />
                </ExerciseDetailPanel>
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
