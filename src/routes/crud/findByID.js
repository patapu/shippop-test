const { firstCharGoLower } = require("../../ctrls/format")

module.exports = async (req, res, next) => {
	try {
		console.log(req.params)
		console.log(req.query)
		const table = req.params.table
		const condition = req.query.condition && JSON.parse(req.query.condition)
		const id = req.params.id
		const idKey = `${firstCharGoLower(table)}ID`
		const Model = require(`../../models/${table}.model`)
		
		const response = condition
			? await Model.findOne({ [idKey]: id, ...condition })
			: await Model.findById(id)

		return res.send(response)
	} catch (error) {
		next(error)
	}
}