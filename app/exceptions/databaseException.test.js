const CONSTANTS = require('../helpers/constant');
const DatabaseException = require('./databaseException');

jest.setTimeout(300000)


describe('Test DatabaseException', () => {

    test('DatabaseException con codigo DEFAULT', async () => {
        const testDatabaseException = new DatabaseException('Test', 400)
        expect(testDatabaseException.code).toBe(CONSTANTS.ERROR_CODES.DATABASE.DEFAULT)
    })

    test('DatabaseException con codigo CREATE ', async () => {
        const testDatabaseException = new DatabaseException('Test', 400, CONSTANTS.ERROR_CODES.DATABASE.CREATE)
        expect(testDatabaseException.code).toBe(CONSTANTS.ERROR_CODES.DATABASE.CREATE)
    })


})