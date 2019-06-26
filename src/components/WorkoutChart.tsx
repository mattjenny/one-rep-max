import React from 'react';
import styled from 'styled-components';
import {
    VictoryChart,
    VictoryArea,
    VictoryLine,
    VictoryScatter,
    VictoryTooltip,
    VictoryGroup,
    DomainPropType,
} from 'victory';
import { DARK_GRAY, GREEN } from '../constants/colors';
import { IWorkoutExercise } from '../store/types';
import { chartTheme } from './chartTheme';

const WorkoutChartWrapper = styled.div``;

export interface IWorkoutChartProps {
    data: IWorkoutExercise[];
    domain: DomainPropType;
}

export function WorkoutChart({ data, domain }: IWorkoutChartProps) {
    return (
        <WorkoutChartWrapper>
            <svg width="0" height="0">
                <defs>
                    <linearGradient
                        id="chartGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop offset="10%" stopColor={GREEN} />
                        <stop offset="90%" stopColor={DARK_GRAY} />
                    </linearGradient>
                </defs>
            </svg>
            <VictoryChart theme={chartTheme}>
                <VictoryGroup
                    data={data}
                    domain={domain}
                    scale="time"
                    labelComponent={
                        <VictoryTooltip
                            style={{ fontSize: 10 }}
                        />
                    }
                >
                    <VictoryArea
                        style={{ data: { fill: 'url(#chartGradient)' } }}
                    />
                    <VictoryLine
                        style={{ data: { stroke: GREEN, strokeWidth: 2 } }}
                    />
                    <VictoryScatter
                        size={1}
                        style={{ data: { fill: GREEN } }}
                    />
                </VictoryGroup>
            </VictoryChart>
        </WorkoutChartWrapper>
    );
}
