
const User = require("../models/user")

exports.getUser = async (req, res) => {
    try {
        const queryObj = {...req.query};
        const excludedField = ['age'];

        // Remove excluded fields from the query object
        excludedField.forEach(el => delete queryObj[el]);

        // Build the query with the filtered object
        let query = User.find(queryObj);

        // Handle the 'age' field separately if it's present in the query
        if (req.query.age) {
            query = query.where('age').equals(req.query.age);
        }

        const user = await query;
        res.status(200).json({
            status: "Success",
            length: user.length,
            data: user
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            msg: e.message
        });
    }
}

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name })
        res.status(200).json({
            status: "Success",
            data: user

        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            msg: e
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({
            status: "Success",
            data: {
                user: user
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            msg: e
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ name: req.params.name }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "Success",
            data: {
                user: user
            }
        })
    } catch (e) {
        res.status(404).json({
            status: "failed",
            msg: e
        })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                status: "failed",
                msg: "Name is required"
            });
        }
        
        const user = await User.findOneAndDelete({ name });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "User not found"
            });
        }
        
        res.status(200).json({
            status: "Successfully deleted",
            data: {
                user: null
            }
        });
    } catch (e) {
        res.status(500).json({
            status: "failed",
            msg: e.message
        });
    }
}