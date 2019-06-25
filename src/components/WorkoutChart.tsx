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

const WorkoutChartWrapper = styled.div`

`;

export interface IWorkoutChartProps {
    data: IWorkoutExercise[];
}

// TODO: move to selector
function getDomain(data: IWorkoutExercise[]): DomainPropType {
    if (data.length === 0) {
        return {
            x: [0, 10],
            y: [0, 10],
        };
    }
    let minY = data[0].y;
    let maxY = data[0].y;
    let minX = data[0].x.getTime();
    let maxX = data[0].x.getTime();
    data.forEach((point: IWorkoutExercise) => {
        if (point.y < minY) {
            minY = point.y;
        }
        if (point.y > maxY) {
            maxY = point.y;
        }
        if (point.x.getTime() < minX) {
            minX = point.x.getTime();
        }
        if (point.x.getTime() > maxX) {
            maxX = point.x.getTime();
        }
    });

    const yPadding = Math.max(0.1 * (maxY - minY), 5);

    return {
        x: [minX, maxX],
        y: [minY - yPadding, maxY + yPadding],
    };
}

export function WorkoutChart({ data }: IWorkoutChartProps) {
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
                    domain={getDomain(data)}
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
                        style={{ data: { stroke: GREEN } }}
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