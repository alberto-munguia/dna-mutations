exports.isValidDNA = async (dna) => {
    const regex = /[^ACGT]/ig
    let result  = true

    if (!Array.isArray(dna)) {
        return {
            message: 'El parámetro dna debe ser del tipo Array',
            result : false
        }
    }

    if (dna.length !== 6) {
        return {
            message: 'El arreglo debe tener solamente 6 elementos',
            result : false
        }
    }

    for (const key in dna) {
        if (regex.test(dna[key]) || dna[key].length > 6) {
            result = false
            break;
        }
    }

    return {
        message: 'Solo se permiten los caracteres A T C G y cada elemento debe tener 6 caracteres',
        result : result
    }
}
