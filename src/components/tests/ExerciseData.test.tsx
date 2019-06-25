import { shallow } from 'enzyme';
import React from 'react';
import { ExerciseData } from '../ExerciseData';
import { exercises } from './testConstants';

describe('ExerciseData component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <ExerciseData
                exercise={exercises[0]}
                data={[]}
            />
        );
        expect(wrapper.text().includes('One Rep Max')).toBe(true);
    })
})
