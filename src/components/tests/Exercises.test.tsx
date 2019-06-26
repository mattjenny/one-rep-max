import { shallow } from 'enzyme';
import React from 'react';
import { UnconnectedExercises } from '../Exercises';
import { exercises, domain } from './testConstants'; 

describe('Login component', () => {
    it('Renders the component', () => {
        const wrapper = shallow(
            <UnconnectedExercises
                isLoading={false}
                userId={1}
                selectedExerciseId={undefined}
                exerciseInfo={{
                    id: 1,
                    name: 'Barbell Bench Press',
                    theoreticalOneRepMax: 200,
                    mostRecentDate: new Date('2019-06-10'),
                }}
                exerciseData={[]}
                domain={domain}
                setSelectedExerciseId={() => {}}
                exercises={exercises}
                initialize={() => {}}
                clearCachedUser={() => {}}
                history={{} as any}
                location={{} as any}
                match={{} as any}
            />
        );
        expect(wrapper.text().includes('Barbell Bench Press')).toBe(true);
    })
})
