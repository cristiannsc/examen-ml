const ERROR_CODES = {
    INPUT: {
        BODY_LENGTH: 'E_BODY_LENGTH',
        COLUMN_LENGTH: 'E_COLUMN_LENGTH',
        SQUARE_MATRIX: 'E_SQUARE_MATRIX',
        NON_NITROGENOUS_BASE: 'E_NON_NITROGENOUS_BASE',
        INVALID_JSON: 'E_INVALID_JSON',
        DEFAULT: 'E_INPUT'
    },
    DATABASE: {
        DEFAULT: 'E_DATABASE',
        CREATE: 'E_DATABASE_CREATE',
        STATS: 'E_DATABASE_STATS'
    },
    DEFAULT: 'E_DEFAULT'
}
const MESSAGES = {
    RESPONSE: {
        MUTANT: 'DNA entregado corresponde a un mutante!',
        NON_MUTANT: 'DNA entregado corresponde a un humano :('
    }
}
const MUTANT_PATTERN = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
const VALID_CHARACTERS_REGEX = /[^ATCG|^atcg]/
const MIN_MUTANT_FACTOR = 2
const MIN_LENGTH_MUTANT_ADN = 4

module.exports = {
    ERROR_CODES,
    MUTANT_PATTERN,
    MIN_MUTANT_FACTOR,
    MIN_LENGTH_MUTANT_ADN,
    VALID_CHARACTERS_REGEX,
    MESSAGES
}