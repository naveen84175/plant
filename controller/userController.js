const User = require('../model/user')
const util = require('util');
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
const { encode, decode } = require('node-base64-image')
const { promisify } = require('util')

cloudinary.config({
	cloud_name: 'dl9gsmvqc',
	api_key: '552698194125665',
	api_secret: 'LOH1HgW62BXk8xXBY27e-KSz_04'
});


exports.getAllUsers = async (req, res) => {
	try {

		let query = User.find()

		if (req.query.email) {
			let a = []
			a = req.query.email.split(',')
			query = query.find({ email: { $in: a } })
		}

		if (req.query.name) {
			let a = []
			a = req.query.name.split(',')
			query = query.find({ name: { $in: a } })
		}

		if (req.query.phone) {
			let a = []
			a = req.query.phone.split(',')
			console.log(a)
			query = query.find({ phone: { $in: a } })
		}

		let field
		if (req.query.fields)
			field = req.query.fields.split(',').join(' ')
		query = query.select(field)

		if (req.query.sort) {
			query = query.sort(req.query.sort)
		}

		let users = await query


		res.status(200).json({
			stauts: 'success',
			result: users.length,
			data: users
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}

exports.getUser = async (req, res) => {
	try {
		let user = await User.findById(req.params.id)
		res.status(200).json({
			status: 'success',
			data: user
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}

exports.deleteUser = async (req, res) => {
	try {

		await User.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: 'success'
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}

exports.updateUser = async (req, res) => {
	try {

		let id = req.body.id
		let user = await User.findByIdAndUpdate(id, req.body, { new: true })

		res.status(200).json({
			status: 'success',
			data: user
		})


	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}

exports.me = async (req, res) => {

	try {
		let token
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
			token = req.headers.authorization.split(' ')[1]

		else {
			return res.status(404).json({
				status: 'fail',
				message: 'No Token found'
			})
		}

		const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)

		let user = await User.findById(decoded.id).select('name email phone role -_id')
		if (user)
			res.status(200).json({
				status: 'success',
				data: user
			})

		else {
			res.status(404).json({
				status: 'fail',
				message: 'No user found!😢'
			})
		}

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}

}

exports.updateMe = async (req, res) => {
	try {
		let { id, ...data } = req.body

		let updateUser = await User.findByIdAndUpdate(id, data, { new: true })

		res.status(200).json({
			status: 'success',
			data: updateUser
		})

	} catch (err) {

		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}
}


exports.getleaderBoard = async (req, res) => {

	try {

		const data = await User.find().select('name email searches -_id').sort({ searches: -1 })

		res.status(200).json({
			status: 'success',
			data
		})

	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}

}


exports.setProfilePicture = async (req, res) => {

	try {

		if (!req.headers.authorization)
			return res.status(400).json({
				status: 'fail',
				message: 'Please Provide authorization in headers'
			})

		let token = req.headers.authorization.split(' ')[1]

		if (!token)
			return res.status(400).json({
				status: 'fail',
				message: 'You are not logged in! Please login to get access'
			})


		let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
		let filename = `userProfileImage-${Date.now()}-${decoded.id}`


		let base64String = req.body.base64

		await decode(base64String, { fname: filename, ext: 'jpeg' })

		const upload = await cloudinary.uploader.upload(`${filename}.jpeg`)

		await User.updateOne({ _id: decoded.id }, { profilePhoto: upload.secure_url }, { new: true })

		res.status(200).json({
			status: 'success',
			message: 'Profile picture updated successfully'
		})


		await execute(`rm ${filename}.jpeg`).then(() => {
			console.log('files deleted successfully')
		})


	} catch (err) {

		res.status(400).json({
			status: 'fail',
			message: err.message
		})
	}

}