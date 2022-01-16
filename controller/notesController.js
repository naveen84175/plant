const Note = require('../model/notes')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')

exports.getAllNotes = async (req, res) => {

	try {

		if (!req.headers.authorization)
			return res.status(400).json({
				status: 'fail',
				message: 'Authorizaton not provided'
			})

		let token = req.headers.authorization.split(' ')[1]

		if (!token)
			return res.status(400).json({
				status: 'fail',
				message: 'You are not logged in!'
			})


		let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

		const data = await Note.find({ userid: decoded.id }).populate([{
			path: 'postid'
		},
		{
			path: 'userid',
			select: 'name -_id'
		}
		])

		res.status(200).json({
			status: 'success',
			results: data.length,
			data
		})


	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})

	}

}

exports.createNote = async (req, res) => {

	try {

		if (!req.headers.authorization)
			return res.status(400).json({
				status: 'fail',
				message: 'Authorizaton not provided'
			})

		let token = req.headers.authorization.split(' ')[1]

		if (!token)
			return res.status(400).json({
				status: 'fail',
				message: 'You are not logged in!'
			})


		let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)


		let { postid, note } = req.body

		let newNote = new Note({
			note,
			postid,
			userid: decoded.id
		})

		await newNote.save();

		res.status(200).json({
			status: 'success',
			data: newNote
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}


}


exports.updateNote = async (req, res) => {

	try {

		let { note, noteid } = req.body

		let updateNote = await Note.findByIdAndUpdate(noteid, { note }, { new: true })

		res.status(200).json({
			status: 'success',
			data: updateNote
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}


}

exports.deleteNote = async (req, res) => {

	try {

		await Note.findByIdAndDelete(req.body.noteid)

		res.status(200).json({
			status: 'success',
			message: 'Note deleted successfully'
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}

}