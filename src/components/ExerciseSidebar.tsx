import React from 'react';
import styled from 'styled-components';
import fitbodLogo from '../resources/fitbod_logo.png';
import { GRAY, TEXT_GRAY } from '../constants/colors';
import { HEADER_HEIGHT } from '../constants/layout';
import { ExerciseSidebarItem } from './ExerciseSidebarItem';
import { IDisplayExercise } from '../store/types';

const ExerciseSidebarWrapper = styled.div`
    width: 400px;
    color: white;
    background: ${GRAY};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SidebarHeaderWrapper = styled.div`
    height: ${HEADER_HEIGHT}px;
    flex: 0 0 auto;
`;

const SidebarHeader = styled.h5`
    text-transform: uppercase;
    color: ${TEXT_GRAY};
    margin: 0;
    padding-top: 20px;
`;

const ExerciseListComponent = styled.ul`
    align-self: flex-start;
    flex: 1 1 auto;
    list-style-type: none;
    padding-inline-start: 0;
    width: 100%;
    margin: 0;
`;

const FitbodLogo = styled.img`
    flex: 0 0 auto;
    margin-bottom: 10px;
`;

export interface IExerciseSidebarProps {
    exercises: IDisplayExercise[];
    selectedExerciseId: number | void;
    setSelectedExerciseId(exerciseId: number): void;
}

export function ExerciseSidebar(props: IExerciseSidebarProps) {
    return (
        <ExerciseSidebarWrapper>
            <SidebarHeaderWrapper>
                <SidebarHeader>Your exercises</SidebarHeader>
            </SidebarHeaderWrapper>
            <ExerciseListComponent>
                {props.exercises.map((exercise) => (
                    <ExerciseSidebarItem
                        key={exercise.id}
                        exercise={exercise}
                        isSelected={props.selectedExerciseId === exercise.id}
                        setSelectedExerciseId={props.setSelectedExerciseId}
                    />
                ))}
            </ExerciseListComponent>
            <FitbodLogo src={fitbodLogo} alt="logo" width={150} />
        </ExerciseSidebarWrapper>
    );
}
