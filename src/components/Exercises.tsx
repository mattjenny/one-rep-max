import React from 'react';
import styled from 'styled-components';

const ExercisesWrapper = styled.div`
`;

export class Exercises extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <ExercisesWrapper>
                Exercises go here!
            </ExercisesWrapper>
        );
    }
}
