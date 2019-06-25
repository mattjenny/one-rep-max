import { getOneRepMax } from '../util';

export const user1 = {
    email: 'test@example.com',
    id: 42,
};

export const workouts = [
    {
        id: 13,
        userId: 42,
        workoutDate: new Date('2019-06-07 1:00'),
        workoutDuration: 3600,
    }, {
        id: 14,
        userId: 42,
        workoutDate: new Date('2019-06-10 1:00'),
        workoutDuration: 2700,
    }, {
        id: 15,
        userId: 42,
        workoutDate: new Date('2019-06-14 3:00'),
        workoutDuration: 4500,
    }
]

export const workoutsRaw = [
    {
        created_at: 'should be removed',
        id: 13,
        updated_at: 'should be removed',
        user_id: 42,
        workout_date: '2019-06-07 1:00',
        workout_duration: 3600,
    }, {
        created_at: 'should be removed',
        id: 14,
        updated_at: 'should be removed',
        user_id: 42,
        workout_date: '2019-06-10 1:00',
        workout_duration: 2700,
    }, {
        created_at: 'should be removed',
        id: 15,
        updated_at: 'should be removed',
        user_id: 42,
        workout_date: '2019-06-14 3:00',
        workout_duration: 4500,
    },
];

export const exercises = [
    {
        id: 1,
        name: "Back Squat",
    }, {
        id: 2,
        name: "Barbell Bench Press",
    }, {
        id: 3,
        name: "Deadlift",
    },
];

export const exercisesRaw = [
    {
        id: 1,
        name: "Back Squat",
        created_at: 'should be removed',
        updated_at: 'should be removed',
    }, {
        id: 2,
        name: "Barbell Bench Press",
        created_at: 'should be removed',
        updated_at: 'should be removed',
    }, {
        id: 3,
        name: "Deadlift",
        created_at: 'should be removed',
        updated_at: 'should be removed',
    },
];

export const sets = [
    {
        exerciseId: 3,
        id: 4,
        performedAt: new Date('2019-06-10 2:00'),
        reps: 3,
        weight: 180,
        workoutId: 14,
        theoreticalOneRepMax: getOneRepMax(180, 3),
    }, {
        exerciseId: 1,
        id: 3,
        performedAt: new Date('2019-06-10 1:00'),
        reps: 8,
        weight: 120,
        workoutId: 14,
        theoreticalOneRepMax: getOneRepMax(120, 8),
    }, {
        exerciseId: 1,
        id: 2,
        performedAt: new Date('2019-06-07 2:00'),
        reps: 8,
        weight: 100,
        workoutId: 13,
        theoreticalOneRepMax: getOneRepMax(100, 8),
    }, {
        exerciseId: 2,
        id: 1,
        performedAt: new Date('2019-06-07 1:00'),
        reps: 6,
        weight: 160,
        workoutId: 13,
        theoreticalOneRepMax: getOneRepMax(160, 6),
    }, {
        exerciseId: 3,
        id: 5,
        performedAt: new Date('2019-06-14 3:00'),
        reps: 3,
        weight: 170,
        workoutId: 15,
        theoreticalOneRepMax: getOneRepMax(170, 3),
    }, {
        exerciseId: 1,
        id: 6,
        performedAt: new Date('2019-06-14 4:00'),
        reps: 8,
        weight: 125,
        workoutId: 15,
        theoreticalOneRepMax: getOneRepMax(125, 8),
    },
];

export const setsRaw = [
    [
        {
            exercise_id: 3,
            id: 4,
            performed_at: '2019-06-10 2:00',
            reps: 3,
            weight: 180,
            workout_id: 14,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        }, {
            exercise_id: 1,
            id: 3,
            performed_at: '2019-06-10 1:00',
            reps: 8,
            weight: 120,
            workout_id: 14,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        },
    ], [
        {
            exercise_id: 1,
            id: 2,
            performed_at: '2019-06-07 2:00',
            reps: 8,
            weight: 100,
            workout_id: 13,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        }, {
            exercise_id: 2,
            id: 1,
            performed_at: '2019-06-07 1:00',
            reps: 6,
            weight: 160,
            workout_id: 13,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        },
    ], [
        {
            exercise_id: 3,
            id: 5,
            performed_at: '2019-06-14 3:00',
            reps: 3,
            weight: 170,
            workout_id: 15,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        }, {
            exercise_id: 1,
            id: 6,
            performed_at: '2019-06-14 4:00',
            reps: 8,
            weight: 125,
            workout_id: 15,
            created_at: 'should be removed',
            updated_at: 'should be removed',
        },
    ],
];
