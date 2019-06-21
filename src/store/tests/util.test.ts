import { getOneRepMax } from '../util';

describe('store util functions', () => {
    it('calculates theoretical one rep max', () => {
        expect(getOneRepMax(170, 7)).toBe(204);
        expect(getOneRepMax(10, 37)).toBe(Infinity); // ¯\_(ツ)_/¯
        expect(getOneRepMax(100, 19)).toBe(200);
    })
})