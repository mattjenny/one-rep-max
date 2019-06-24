import React from 'react';
import styled from 'styled-components';
import { IDisplayExercise } from '../store/types';
import {
    GRAY,
    TEXT_GRAY,
    GRAY_HIGHLIGHTED,
    GRAY_HOVER,
} from '../constants/colors';

interface StyledWrapperProps {
    isSelected: boolean;
}

const ExerciseSidebarItemComponent = styled.li<StyledWrapperProps>`
    height: 100px;
    padding: 0 10px;
    width: 100%;
    background: ${(props: StyledWrapperProps) => props.isSelected ? GRAY_HIGHLIGHTED : GRAY};
    cursor: pointer;

    &:hover {
        background: ${(props: StyledWrapperProps) => props.isSelected ? GRAY_HIGHLIGHTED : GRAY_HOVER};
    }
`;

const ExerciseSidebarItemInner = styled.div`
    padding: 10px;
    border-bottom: 1px solid ${TEXT_GRAY};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PrimaryText = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    line-height: 20px;
`;

const SecondaryText = styled.div`
    color: ${TEXT_GRAY};
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    font-size: 14px;
`;

export interface IExerciseSidebarItemProps {
    exercise: IDisplayExercise;
    selectedExerciseId: number | void;
    setSelectedExerciseId(exerciseId: number): void;
}

function toDisplayNumber(value: number) {
    return Math.round(value*1e2) / 1e2;
}

export function ExerciseSidebarItem({ exercise, selectedExerciseId, setSelectedExerciseId }: IExerciseSidebarItemProps) {
    function handleClick() {
        setSelectedExerciseId(exercise.id);
    }

    return (
        <ExerciseSidebarItemComponent onClick={handleClick} isSelected={selectedExerciseId === exercise.id}>
            <ExerciseSidebarItemInner>
                <PrimaryText>
                    <span>{exercise.name}</span>
                    <span>{toDisplayNumber(exercise.theoreticalOneRepMax)}</span>
                </PrimaryText>
                <SecondaryText>
                    <span>1 RM Record</span>
                    <span>lbs</span>
                </SecondaryText>
            </ExerciseSidebarItemInner>
        </ExerciseSidebarItemComponent>
    );
}
