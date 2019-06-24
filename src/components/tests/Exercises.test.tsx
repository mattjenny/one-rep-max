import { shallow } from 'enzyme';
import React from 'react';
import { UnconnectedExercises } from '../Exercises';
import { exercises } from './testConstants'; 

describe('Login component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <UnconnectedExercises
                userId={1}
                selectedExerciseId={undefined}
                setSelectedExerciseId={() => {}}
                exercises={exercises}
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
