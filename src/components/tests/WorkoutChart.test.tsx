import { shallow } from 'enzyme';
import React from 'react';
import { WorkoutChart } from '../WorkoutChart';
import { chartData } from './testConstants';

describe('WorkoutChart component', () => {
    it('renders correctly', () => {
    const wrapper = shallow(<WorkoutChart data={chartData} />)
    expect(wrapper.html()).toMatchSnapshot();
    });
});
