import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { NetworkClient } from '../../network/client';
import { UnconnectedExercises } from '../Exercises';

describe('Login component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <UnconnectedExercises
                userId={1}
                initialize={() => {}}
                clearCachedUser={() => {}}
                history={{} as any}
                location={{} as any}
                match={{} as any}
            />
        );
        expect(wrapper.text().includes('Exercises go here')).toBe(true);
    })
})
