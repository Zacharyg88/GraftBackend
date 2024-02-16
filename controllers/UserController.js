
const { user } = require('pg/lib/defaults');
const userModel = require('../models/User')

const UserController = {

    async createUser(req, res) {
        try {
            const { id, username, password, email, firstname, lastname, birthday, address, phonenumber, biography} = req.body;
            const emailIsTaken = userModel.emailIsTaken(email)
            if (emailIsTaken) {
                return res.status(400).json({message: 'Email is already taken, please try again.'})
            }

            const newUser = await userModel.createUser(id, username, password, email, firstname, lastname, birthday, address, phonenumber, biography)
            res.status(201).json(newUser)
        } catch (error) {
            console.error('Error creating user:', error)
            res.status(500).json({message: 'Server Error'})
        }
    },

    async getUserById(req, res) {
        try {
            const {id} = req.body
            const user = userModel.getUserById(id)
            if (!user) {
               return res.status(404).json({message: 'User Not Found'})
            }

            res.status(200).json(user)
        } catch (error) {
            console.error('Error getting user by ID:', error)
            res.status(500).json({message: 'Server Error'})
        }
    },
    
    async emailIsTaken(req, res) {
        try {
        const {email} = req.body
        const isTaken = userModel.emailIsTaken(email)
        res.json(isTaken)
        }catch (error) {
            console.error('Error determining if email is taken:', error)
            res.status(500).json({message: 'Server Error'})
        }
    }
};

module.exports = UserController