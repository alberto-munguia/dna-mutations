const { Schema, model } = require('mongoose')

const DnaSchema = Schema({
    adn: {
        type: [String],
    },
    hasMutation: {
        type    : Boolean,
        index   : true,
        required: true,
    }
})

module.exports = model('Dna', DnaSchema)
