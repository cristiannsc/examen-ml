const CONSTANTS = require('../helpers/constant');
const InputException = require('./inputException');

jest.setTimeout(300000)


describe('Test InputException', () => {

    test('InputException con codigo DEFAULT', async () => {
        const testDatabaseException = new InputException('Test', 400, 'Test Summary')
        expect(testDatabaseException.code).toBe(CONSTANTS.ERROR_CODES.INPUT.DEFAULT)
    })

    test('InputException con codigo INVALID_JSON', async () => {
        const testDatabaseException = new InputException('Test', 400, 'Test Summary', CONSTANTS.ERROR_CODES.INPUT.INVALID_JSON)
        expect(testDatabaseException.code).toBe(CONSTANTS.ERROR_CODES.INPUT.INVALID_JSON)
    })


})