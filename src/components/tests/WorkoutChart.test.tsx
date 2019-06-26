import { shallow } from 'enzyme';
import React from 'react';
import { WorkoutChart } from '../WorkoutChart';
import { chartData, domain } from './testConstants';

describe('WorkoutChart component', () => {
    it('renders correctly', () => {
    const wrapper = shallow(<WorkoutChart data={chartData} domain={domain} />)
    expect(wrapper.html()).toMatchSnapshot();
    });
});
