import React from 'react';
import styled from 'styled-components';
import fitbodLogo from '../resources/fitbod_logo.png';
import { GRAY, TEXT_GRAY, RED } from '../constants/colors';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '../constants/layout';
import { ExerciseSidebarItem } from './ExerciseSidebarItem';
import { IDisplayExercise } from '../store/types';

const ExerciseSidebarWrapper = styled.div`
    width: ${SIDEBAR_WIDTH}px;
    color: white;
    background: ${GRAY};
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
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

const SidebarFooter = styled.div`
    width: 100%;
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FitbodLogo = styled.img`
    margin-bottom: 10px;
`;

const LogoutButton = styled.button`
    background: ${RED};
    color: white;
    text-align: center;
    border: none;
    width: 100%;
    height: 40px;
    font-size: 14px;
`;

export interface IExerciseSidebarProps {
    exercises: IDisplayExercise[];
    selectedExerciseId: number | void;
    isMobile: boolean;
    logout(): void;
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
            <SidebarFooter>
                <FitbodLogo src={fitbodLogo} alt="logo" width={150} />
                {props.isMobile && <LogoutButton onClick={props.logout}>Logout</LogoutButton>}
            </SidebarFooter>
        </ExerciseSidebarWrapper>
    );
}
