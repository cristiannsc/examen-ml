const request = require('supertest');
const CONSTANTS = require('../../helpers/constant');
const { app } = require('../../../jest-server');

let mockOne;

jest.setTimeout(300000)
jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockOne },
}));

describe('Test Resource Stats', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Obtener estadisticas con resultado desde la BD con exito', async () => {
        mockOne = new Promise((resolve, reject) => resolve({
            count_mutant_dna: 1,
            count_human_dna: 1,
            ratio: 1
        }))
        const response = await request(app).get("/api/v1/stats").send();

        expect(response.statusCode).toBe(200)
        expect(response.body.count_mutant_dna).toBe(1)
        expect(response.body.count_human_dna).toBe(1)
        expect(response.body.ratio).toBe(1)
    })

    test('Obtener estadisticas con resultado desde la BD con error', async () => {
        mockOne = new Promise((resolve, reject) => reject({ message: CONSTANTS.MESSAGES.TEST.ERROR_STATS_DB }))
        mockOne.catch(() => null)
        const response = await request(app).get("/api/v1/stats").send();
        expect(response.statusCode).toBe(400)

    })


})