import React from 'react';
import styled from 'styled-components';
import { IDisplayExercise } from '../store/types';
import { TEXT_GRAY } from '../constants/colors';

const ExerciseSidebarItemComponent = styled.li`
    height: 100px;
    padding: 0 10px;
    width: 100%;
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
}

function toDisplayNumber(value: number) {
    return Math.round(value*1e2) / 1e2;
}

export function ExerciseSidebarItem({ exercise }: IExerciseSidebarItemProps) {
    return (
        <ExerciseSidebarItemComponent>
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
