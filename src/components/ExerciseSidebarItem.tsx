import React from 'react';
import styled from 'styled-components';
import { IDisplayExercise } from '../store/types';
import {
    TEXT_GRAY,
    GRAY_HIGHLIGHTED,
    GRAY_HOVER,
} from '../constants/colors';
import { toDisplayNumber } from '../store/util';

interface StyledWrapperProps {
    isSelected: boolean;
    isSelectable: boolean;
}

const ExerciseSidebarItemComponent = styled.li<StyledWrapperProps>`
    height: 100px;
    padding: 0 10px;
    width: 100%;
    ${(props: StyledWrapperProps) => props.isSelected ? `background: ${GRAY_HIGHLIGHTED};` : ''}
    cursor: pointer;

    &:hover {
        ${(props: StyledWrapperProps) => {
            if (props.isSelectable) {
                return `background: ${props.isSelected ? GRAY_HIGHLIGHTED : GRAY_HOVER};`;
            }
            return '';
        }
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
    isSelected?: boolean;
    setSelectedExerciseId?(exerciseId: number): void;
}

export function ExerciseSidebarItem({ exercise, isSelected, setSelectedExerciseId }: IExerciseSidebarItemProps) {
    function handleClick() {
        if (setSelectedExerciseId) {
            setSelectedExerciseId(exercise.id);
        }
    }

    return (
        <ExerciseSidebarItemComponent onClick={handleClick} isSelected={!!isSelected} isSelectable={setSelectedExerciseId != null}>
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
