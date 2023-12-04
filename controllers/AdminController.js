const User = require("../models/User");

const editUser = async (req, res) => {
    try{
        const id = req.userId
        const user = await User.findByIdAndUpdate(id, req.body);
        
        if(!user) {
            return res.status(404).json({message: "Usuário não encontrado"})
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
}

const deleteUser = async (req, res) => {
    try{
        const id = req.userId
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404)
            throw new Error({message: "Usuario não encontrado"})
        }
        res.status(200).json(user)
    }
    catch (error){
        res.status(500)
        throw new Error(error.message)
    }
}

const getUsers = async(req, res) => {
    const id = req.userId
    let user
    try{
        user = await User.findById(id, "-password")
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user})
}

module.exports = {
    editUser,
    deleteUser,
    getUsers
}