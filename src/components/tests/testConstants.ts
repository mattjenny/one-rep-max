import { getOneRepMax } from '../../util';

export const exercises = [
    {
        id: 1,
        name: 'Barbell bench press',
        theoreticalOneRepMax: 180.25899999,
        mostRecentDate: new Date('2019-06-05'),
    }, {
        id: 2,
        name: 'Dumbell fly',
        theoreticalOneRepMax: 50,
        mostRecentDate: new Date('2019-06-03'),
    }, {
        id: 3,
        name: 'Squat',
        theoreticalOneRepMax: 225,
        mostRecentDate: new Date('2019-06-01'),
    }
];

export const chartData = [
    {
        workoutId: 13,
        x: new Date('2019-06-07 1:00'),
        y: getOneRepMax(100, 8),
        setCount: 1,
        reps: 8,
        weight: 100,
        setsWithDifferentMax: 0,
        label: 'Test label',
    }, {
        workoutId: 14,
        x: new Date('2019-06-10 1:00'),
        y: getOneRepMax(120, 8),
        setCount: 1,
        reps: 8,
        weight: 120,
        setsWithDifferentMax: 0,
        label: 'Test label2',
    }, {
        workoutId: 15,
        x: new Date('2019-06-14 3:00'),
        y: getOneRepMax(125, 8),
        setCount: 1,
        reps: 8,
        weight: 125,
        setsWithDifferentMax: 0,
        label: 'Test label3',
    },
];
