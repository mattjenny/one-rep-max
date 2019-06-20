import { devBaseUrl, prodBaseUrl } from './constants';
import { fetchJson, fetchJsonWithAuthInfo } from './fetch';
import { IAuthInfo } from '../auth/types';
import { IUser } from '../store/types';
import { IExerciseRaw, IWorkoutRaw, ISingleSetRaw } from './types';

function getBaseUrl() {
    if (process.env.NODE_ENV === 'production' || true) {
        return prodBaseUrl;
    }
    return devBaseUrl;
}

class NetworkClientSingleton {
    public getUsersWithAuthInfo(authInfo: IAuthInfo) {
        return fetchJsonWithAuthInfo(`${getBaseUrl()}/api/v1/users`, 'GET', {}, authInfo);
    }
    
    public getUsers(): Promise<Array<IUser>> {
        return fetchJson(`${getBaseUrl()}/api/v1/users`, 'GET');
    }
    
    public getUser(userId: string) {
        return fetchJson(`${getBaseUrl()}/api/v1/users/${userId}`, 'GET');
    }

    public getExercises(): Promise<Array<IExerciseRaw>> {
        return fetchJson(`${getBaseUrl()}/api/v1/exercises`, 'GET');
    }

    public getUserWorkouts(userId: number): Promise<Array<IWorkoutRaw>> {
        return fetchJson(`${getBaseUrl()}/api/v1/users/${userId}/workouts`, 'GET');
    }

    public getUserWorkoutSingleSets(userId: number, workoutId: number): Promise<Array<ISingleSetRaw>> {
        return fetchJson(`${getBaseUrl()}/api/v1/users/${userId}/workouts/${workoutId}/single_sets`, 'GET');
    }
}

export const NetworkClient = new NetworkClientSingleton();
