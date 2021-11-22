/**
 * Se setean los headers para cada response de la api
 */
exports.cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    next()
}
