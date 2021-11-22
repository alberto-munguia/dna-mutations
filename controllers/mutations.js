const Dna        = require('../models/dna')
const validators = require('../helpers/validators')

/**
 * Valida a partir de una secuencia de ADN si exists una mutación o no.
 * En caso de que exista una mutación, devolverá True, de lo contrario
 * será False.
 *
 * @return {[Response]} Json
 */
const hasMutation = async (req, res, next) => {
    const { dna }  = req.body
    const vertical = []
    let result     = false
    let status     = 400
    const isValid  = await validators.isValidDNA(dna)

    // validamos que el ADN sea correcto, de lo contrario regresamos el error
    if (!isValid.result) {
        res.status(status).json(isValid)
        return next()
    }

    const dnaExists = await Dna.findOne({ adn: dna }).exec()
    
    if (dnaExists) {
        res.status(status).json({
            message: 'Ya existe un ADN con la misma información',
            result : false,
        })

        return next()
    }

    for (let i = 0; i < dna.length; i++) {
        vertical.push(dna.reduce((prev, current) => prev + current[i], ''))
    }

    const data = [ ...dna, ...vertical ]

    loop1:
    for (let i = 0; i < data.length; i++) {
        const countChar = {}

        for (let j = 0; j < data[i].length; j++) {
            const element = data[i][j];

            if (countChar[element]) {
                countChar[element] += 1
            } else {
                countChar[element] = 1
            }

            if (countChar[element] >= 4) {
                result = true
                break loop1
            }
        }
    }

    const dnaObj = new Dna({ adn: dna, hasMutation: result })

    // guardamos en bd el adn...
    await dnaObj.save((error) => {
        if (error) {
            throw new Error(error)
        }
    })

    status = result ? 200 : 403
    res.status(status).json({ hasMutation: result })
}

/**
 * Genera un reporte con las estadísticas de las mutaciones vs no mutaciones
 *
 * @return {[Response]} Json
 */
const statistics = async (req, res, next) => {
    const data         = await Dna.find({}).exec()
    const totalRows    = data.length
    const hasMutations = data.filter(dna => dna.hasMutation == true)
    const noMutations  = data.filter(dna => dna.hasMutation == false)
    const ratio        = parseInt(hasMutations.length) / parseInt(noMutations.length)

    res.json({
        count_mutations  : parseInt(hasMutations.length),
        count_no_mutation: parseInt(noMutations.length),
        ratio,
    })
}

module.exports = {
    hasMutation,
    statistics,
}
