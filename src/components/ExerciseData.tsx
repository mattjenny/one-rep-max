import React from 'react';
import styled from 'styled-components';
import { DomainPropType } from 'victory';
import { DARK_GRAY, TEXT_GRAY } from '../constants/colors';
import { IDisplayExercise, IWorkoutExercise } from '../store/types';
import { toDisplayNumber } from '../util';
import { WorkoutChart } from './WorkoutChart';

interface IExerciseDataWrapperProps { 
    isMobile: boolean;
}

const ExerciseDataWrapper = styled.div<IExerciseDataWrapperProps>`
    background: ${DARK_GRAY};
    width: 100%;
    flex: 1 1 auto;
    padding: ${(props: IExerciseDataWrapperProps) => props.isMobile ? '20px 10px' : '80px'};
`;

const ChartHeader = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const ChartHeaderPrimaryText = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 800;
    line-height: 24px;
`;

const ChartHeaderSecondaryText = styled.div`
    color: ${TEXT_GRAY};
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    font-size: 14px;
`;

export interface IExerciseDataProps {
    exercise: IDisplayExercise;
    data: IWorkoutExercise[];
    isMobile: boolean;
    domain: DomainPropType;
}

export function ExerciseData({ exercise, data, isMobile, domain }: IExerciseDataProps) {
    return (
        <ExerciseDataWrapper isMobile={isMobile}>
            <ChartHeader>
                <ChartHeaderPrimaryText>
                    <span>One Rep Max</span>
                    <span>{toDisplayNumber(exercise.theoreticalOneRepMax)}</span>
                </ChartHeaderPrimaryText>
                <ChartHeaderSecondaryText>
                    <span>Theoretical upper limit</span>
                    <span>lbs</span>
                </ChartHeaderSecondaryText>
            </ChartHeader>
            <WorkoutChart data={data} domain={domain} />
        </ExerciseDataWrapper>
    );
}
