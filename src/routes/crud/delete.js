module.exports = async (req, res, next) => {
	try {
		console.log(req.params)
		console.log(req.query)
		const table = req.params.table
		const id = req.params.id
		const Model = require(`../../models/${table}.model`)
		
		const response = await Model.findByIdAndDelete(id)
		return res.send(response)
	} catch (error) {
		next(error)
	}
}