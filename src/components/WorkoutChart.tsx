import React from 'react';
import styled from 'styled-components';
import {
    VictoryChart,
    VictoryArea,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
    DomainPropType,
} from 'victory';
import { GRAY, DARK_GRAY, GREEN } from '../constants/colors';
import { IWorkoutExercise } from '../store/types';
import { toDisplayNumber } from '../store/util';

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

    const yPadding = 0.1 * ( maxY - minY );

    return {
        x: [ minX, maxX ],
        y: [ minY - yPadding, maxY + yPadding ],
    };
}

const tickStyles: {
[K in keyof React.CSSProperties]:
| string
| number
| ((tick?: any) => string | number)
} = {
    fill: "transparent",
    size: 5,
    stroke: '#FFFFFF',
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
} as any; // HACKHACK: "size" not recognized

const baseLabelStyles = {
    fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif",
    fontSize: 12,
    letterSpacing: "normal",
    padding: 8,
    fill: "#FFFFFF",
    stroke: "transparent",
    strokeWidth: 0
  };

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
            <VictoryChart>
                <VictoryAxis
                    scale="time"
                    style={{
                        axis: {stroke: "#ffffff"},
                        axisLabel: {fontSize: 20, padding: 30, color: 'white' },
                        grid: {
                            fill: "none",
                            stroke: "#FFFFFF",
                            strokeWidth: 2,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            pointerEvents: "painted"
                          },
                          ticks: tickStyles,
                          tickLabels: baseLabelStyles,
                    }}
                />
                <VictoryArea
                    interpolation="linear"
                    style={{ data: { fill: 'url(#chartGradient)' } }}
                    data={data}
                    scale={{ x: 'time', y: 'linear' }}
                    domain={getDomain(data)}
                />
                <VictoryLine
                    interpolation="linear"
                    style={{ data: { stroke: GREEN } }}
                    data={data}
                    scale={{ x: 'time', y: 'linear' }}
                />
            </VictoryChart>
        </WorkoutChartWrapper>
    );
}
