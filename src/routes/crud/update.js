module.exports = async (req, res, next) => {
	try {
		console.log(req.params)
		console.log(req.query)
		console.log(req.body)
		const table = req.params.table
		const id = req.params.id
		const data = req.body
		const Model = require(`../../models/${table}.model`)
		const model = await Model.findById(id)
		if (!model) throw new Error("not found.")
		Object.assign(model, data)
		await model.save()
		return res.send(model)
	} catch (error) {
		next(error)
	}
}