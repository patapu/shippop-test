module.exports = async (req, res, next) => {
    try {
        console.log(req.params)
		console.log(req.query)
        const table = req.params.table
        const condition = req.query.condition && JSON.parse(req.query.condition)
		const Model = require(`../../models/${table}.model`)

        const response = await Model.find(condition)
        return res.send(response)
    } catch (error) {
        next(error)
    }
}