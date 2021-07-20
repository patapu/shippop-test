module.exports = async (req, res, next) => {
	try {
		console.log(req.params)
		console.log(req.query)
		const table = req.params.table
		const data = req.body
		const Model = require(`../../models/${table}.model`)

		const insert = (data) => new Promise((resolve, reject) => {
			const insertModel = new Model(data)
			insertModel.save()
				.then(resolve)
				.catch(reject)
		})
		
		const response = Array.isArray(data)
			? await Promise.all(await this.productModel.insertMany(data))
			: await insert(data)
		return res.send(response)
	} catch (error) {
		next(error)
	}
}