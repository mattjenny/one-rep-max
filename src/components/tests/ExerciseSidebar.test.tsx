import { shallow } from 'enzyme';
import React from 'react';
import { ExerciseSidebar } from '../ExerciseSidebar';
import { ExerciseSidebarItem } from '../ExerciseSidebarItem';
import { exercises } from './testConstants';

describe('ExerciseSidebar component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <ExerciseSidebar exercises={exercises}/>
        );
        expect(wrapper.text().includes('Your exercises')).toBe(true);
        expect(wrapper.find(ExerciseSidebarItem)).toHaveLength(3);
    })
})
