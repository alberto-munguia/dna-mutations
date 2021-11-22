const validators = require('../helpers/validators')

describe('Test validator helper', () => {
    test('should be a valid not empty array', async () => {
        const dna = ["ATGCGA"]
        const response = await validators.isValidDNA(dna)

        expect(response).toEqual({
            result : true,
            message: '',
        })
    })
})
