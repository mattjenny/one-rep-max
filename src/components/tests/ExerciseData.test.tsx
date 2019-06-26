import { shallow } from 'enzyme';
import React from 'react';
import { ExerciseData } from '../ExerciseData';
import { exercises, domain } from './testConstants';

describe('ExerciseData component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <ExerciseData
                exercise={exercises[0]}
                data={[]}
                domain={domain}
                isMobile={false}
            />
        );
        expect(wrapper.text().includes('One Rep Max')).toBe(true);
    })
})
