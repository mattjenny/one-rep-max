import { shallow } from 'enzyme';
import React from 'react';
import { ExerciseSidebarItem } from '../ExerciseSidebarItem';
import { exercises } from './testConstants';

describe('ExerciseSidebarItem component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <ExerciseSidebarItem
                exercise={exercises[0]}
                selectedExerciseId={1}
                setSelectedExerciseId={() => {}}
            />
        );
        expect(wrapper.text().includes('Barbell bench press')).toBe(true);
        expect(wrapper.text().includes('180.26')).toBe(true);
    })
})
