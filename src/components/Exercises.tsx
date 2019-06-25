import React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AuthManager } from '../auth/AuthManager';
import { RED, GRAY, TEXT_GRAY } from '../constants/colors';
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
import veggieWorkout from '../resources/veggie_workout.gif';

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

const LogoutButton = styled.button`
    background: rgba(255, 255, 255, 0);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        color: ${TEXT_GRAY};
    }
`;

const LoadingScreen = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: ${GRAY};
`;

const LoadingText = styled.span`
    margin-top: -80px;
    width: 250px;
    min-width: 0;
`;

interface IStateProps {
    isLoading: boolean,
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

interface State {
    loadingText: string;
    numTextUpdates: number;
}

const loadingTexts = [
    'Re-racking weights.',
    'Wiping down equipment.',
    'Drawing graphs.',
    'Loading workouts.',
]

export class UnconnectedExercises extends React.PureComponent<Props, State> {
    public state = {
        loadingText: 'Loading workouts.',
        numTextUpdates: 0,
    };
    private loadingTextTimeout: number | void = undefined;

    public componentWillMount() {
        if (this.props.userId != null) {
            this.props.initialize(this.props.userId);
        } 
    }

    public componentDidMount() {
        if (this.props.isLoading) {
            this.loadingTextTimeout = setTimeout(this.updateText, 500);
        }
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.isLoading && !this.props.isLoading && this.loadingTextTimeout) {
            clearTimeout(this.loadingTextTimeout);
        }
        if (!prevProps.isLoading && this.props.isLoading) {
            this.loadingTextTimeout = setTimeout(this.updateText, 500);
        }
    }

    public componentWillUnmount() {
        this.props.clearCachedUser();
    }

    private updateText = () => {
        const { loadingText, numTextUpdates } = this.state;
        if (numTextUpdates % 6 === 5) {
            const rand = Math.floor(Math.random() * 4);
            this.setState({
                loadingText: loadingTexts[rand],
                numTextUpdates: numTextUpdates + 1,
            })
        } else if (numTextUpdates % 3 === 2) {
            this.setState({
                loadingText: loadingText.substring(0, loadingText.length - 2),
                numTextUpdates: numTextUpdates + 1,
            });
        } else {
            this.setState({
                loadingText: `${loadingText}.`,
                numTextUpdates: numTextUpdates + 1,
            });
        }

        this.loadingTextTimeout = setTimeout(this.updateText, 500);
    }

    public render() {
        if (this.props.isLoading) {
            return (
                <LoadingScreen>
                    <img src={veggieWorkout} alt="loading image" />
                    <LoadingText>{this.state.loadingText}</LoadingText>
                </LoadingScreen>
            )
        }

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
                        <LogoutButton onClick={this.logout}>Log out</LogoutButton>
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
        isLoading: state.loading,
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
