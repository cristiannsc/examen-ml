const request = require('supertest');
const CONSTANTS = require('../../helpers/constant');
const { app } = require('../../../jest-server');

let mockOne;
let mockOneOrNone;

jest.setTimeout(300000)
jest.mock('pg-promise', () => () => () => ({
    one: () => { return mockOne },
    oneOrNone: (query) => { return mockOneOrNone }
}));

describe('Test Resource Mutant', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Detectar mutante: con secuencia de DNA mutante previamente registrado en BD', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(200)
    })

    test('Detectar mutante: con secuencia de DNA mutante no registrado previamente en BD', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve(null))
        mockOne = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(200)
    })

    test('Detectar mutante: con secuencia de DNA mutante con error al registrar en BD', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve(null))
        mockOne = new Promise((resolve, reject) => reject({ message: CONSTANTS.MESSAGES.TEST.ERROR_SAVE_DB }))
        mockOne.catch(() => null)
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });
        expect(response.statusCode).toBe(400)

    })

    test('Detectar mutante: con secuencia de DNA humana previamente registrado en BD', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CCGTGC", "TTATGT", "AGTCGG", "CGACTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(403)
    })

    test('Detectar mutante: con secuencia de DNA no NxN (menor cantidad de filas)', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA"]
        });

        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(CONSTANTS.ERROR_CODES.INPUT.SQUARE_MATRIX)
    })

    test('Detectar mutante: con secuencia de DNA no NxN (filas del mismo largo a excepcion de una)', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTAGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(CONSTANTS.ERROR_CODES.INPUT.SQUARE_MATRIX)
    })

    test('Detectar mutante: con secuencia de DNA con caracter no permitido', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: ["ATGCGA", "CAGTGC", "TTFTGT", "AGAAGG", "CCCCTA", "TCACTG"]
        });

        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(CONSTANTS.ERROR_CODES.INPUT.NON_NITROGENOUS_BASE)
    })

    test('Detectar mutante: con secuencia de DNA con body invalido (se envia algo que no sea {dna: String[]})', async () => {
        mockOneOrNone = new Promise((resolve, reject) => resolve({ id: 1 }))
        const response = await request(app).post("/api/v1/mutant").send({
            dna: CONSTANTS.MESSAGES.TEST.NO_VALID_BODY
        });

        expect(response.statusCode).toBe(400)
        expect(response.body.code).toBe(CONSTANTS.ERROR_CODES.INPUT.INVALID_JSON)
    })

})