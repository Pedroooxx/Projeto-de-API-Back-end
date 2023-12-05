const jwt = require("jsonwebtoken")

const User = require("../models/User");
const Games = require("../models/Game");
const Achievments = require("../models/Achievment");

const ranking = async(req, res) => {

    let ranking
    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    ranking = await User.find()
    .sort({completedGames: -1})
    .skip((pagina-1) *pageSize)
    .limit(pageSize)

    if(!ranking) {
        return res.status(404).json({msg: "Base de Usuários vazia."})
    }
    showRanking = ranking.name + ranking.completedGames

    res.status(200).json({ranking})
}

const register = async(req, res) => {

    const {name, password, email} = req.body

    if(!name) {
        return res.status(422).json({msg: "Digite o Nome."})
    }
    if(!password) {
        return res.status(422).json({msg: "Digite a Senha."})
    }
    if(!email) {
        return res.status(422).json({msg: "Digite o Email."})
    }

    const userExists = await User.findOne({email: email})

    if(userExists) {
        return res.status(422).json({msg: "Utilize outro Email"})
    }

    const user = new User({
        name: name,
        email: email,
        password: password
    })
    try {
        await user.save()
        res.status(201).json({msg: "Usuário criado com sucesso."})
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: "Erro no Servidor"})
    }
}

const login = async(req, res) => {

    const {password, email} = req.body

    if(!email) {
        return res.status(422).json({msg: "Digite o Email."})
    }
    if(!password) {
        return res.status(422).json({msg: "Digite a Senha."})
    }

    const user = await User.findOne({email: email, password: password})

    if(!user) {
        return res.status(404).json({msg: "Login ou Senha Invalido"})
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
            id: user._id,
            },
            secret,
            {
                expiresIn: 3600 * 24 * 60 * 60
            }
        )
        res.status(200).json({msg: "Autenticação bem sucedida", token})

    } catch(err) {
        console.log(err)
    }

}

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

const getUser = async(req, res) => {
    const id = req.userId
    let user
    try{
        user = await User.findById(id)
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user})
}

const getLibrary = async(req, res) => {
    const id = req.userId
    let user, games

    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        user = await User.findById(id, "-password")
        games = await Games.find({ownerId: id})
        .skip((pagina-1) *pageSize)
        .limit(pageSize);
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!user) {
        return res.status(404).json({msg: "Usuario não encontrado."})
    }
    res.status(200).json({user, games})
}


const getAGame = async(req, res) => {
    const{id} = req.params;
    let game, achievments

    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        game = await Games.findById(id)
        if(game.ownerId != req.userId)
        {
            return res.status(404).json({message: "Usuário não está ligado a esse jogo."})
        }
        achievments = await Achievments.find({gameId: id})
        .skip((pagina-1) *pageSize)
        .limit(pageSize);
    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }
    res.status(200).json({game, achievments})
}

// Admin Controllers

const adminEditUser = async (req, res) => {
    const {id} = req.params;
    try{
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

const adminDeleteUser = async (req, res) => {
    const {id} = req.params;
    try{
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

const adminGetUsers = async(req, res) => {
    
    let users
    const pagina = parseInt(req.query.page) || 1
    const pageSize = 5

    try{
        users = await User.find()
        .skip((pagina-1) *pageSize)
        .limit(pageSize);

    } catch {
        return res.status(404).json({msg: "Id não encontrada."})
    }

    if(!users) {
        return res.status(404).json({msg: "Base de Usuários vazia."})
    }
    res.status(200).json({users})
}

const getRole = async(req, res) => {
    const user = await User.findById(req.userId)
    return user.role
}

const installdb = async (req, res, next) => {

    try{
        const user = new User(
            {
            _id: "656e1e5bc2f44e3fed586406",
            name: "marcos",
            email: "marcos@gmail.com",
            completedGames: 1,
            password: "183mmc00"
        })
        await user.save()
        const user2 = new User(
            {
            _id: "656e1e5cc2f44e3fed586408",
            name: "lucas",
            email: "lucas@gmail.com",
            password: "891jal52"
        })
        await user2.save()
        const user3 = new User(
            {
            _id: "656e1df65edfc1b4b10ea802",
            name: "julia",
            email: "julia@gmail.com",
            password: "jul2202a"
        })
        await user3.save()
        const user4 = new User(
            {
            _id: "656e1e5cc2f44e3fed58640c",
            name: "maria",
            email: "maria@gmail.com",
            password: "177gmp22"
        })
        await user4.save()

        const user5 = new User(
            {
            name: "nicolas",
            email: "nicolas@gmail.com",
            password: "nic333as",
            role: "user"
        })
        await user5.save()

        const user6 = new User(
            {
            name: "amanda",
            email: "amanda@gmail.com",
            password: "aman121d",
            role: "user"
        })
        await user6.save()

        const user7 = new User(
            {
            name: "josé",
            email: "jose@gmail.com",
            password: "jo1221se",
            role: "user"
        })
        await user7.save()

        const user8 = new User(
            {
            _id: "656e1e5cc2f44e3fed58640e",
            name: "admin",
            email: "admin@gmail.com",
            password: "183gmvj2",
            role: "admin"
        })
        await user8.save()

            await Games.create({
                _id: "656e24e02dd591737a711ad1",
                title: "Assasin's Creed Unity",
                genre: "Action",
                year: 2015,
                achievments: 3,
                ownerId: "656e1e5bc2f44e3fed586406"
            })

                await Achievments.create({
                    title: "Leap of Faith",
                    points: 10,
                    difficulty: "Low",
                    gameId: "656e24e02dd591737a711ad1"
                })
                await Achievments.create({
                    title: "Hidden Blade",
                    points: 20,
                    difficulty: "Medium",
                    gameId: "656e24e02dd591737a711ad1"
                })
                await Achievments.create({
                    title: "The ultimate Assassin",
                    points: 30,
                    difficulty: "Hard",
                    gameId: "656e24e02dd591737a711ad1"
                })

            await Games.create({
                _id: "656e24e02dd591737a711ad3",
                title: "Grand Theft Auto 5",
                genre: "Action",
                year: 2013,
                achievments: 1,
                ownerId: "656e1e5bc2f44e3fed586406"
            })

                await Achievments.create({
                    title: "Pay'd with gold",
                    points: 30,
                    difficulty: "Hard",
                    gameId: "656e24e02dd591737a711ad3"
                })

            await Games.create({
                _id: "656e24e02dd591737a711ad5",
                title: "EA Sports UFC 2",
                genre: "Fight",
                year: 2017,
                ownerId: "656e1e5bc2f44e3fed586406"
            })
            await Games.create({
                _id: "656e24e02dd591737a711ad7",
                title: "Need For Speed 2015",
                genre: "Simulation",
                year: 2015,
                ownerId: "656e1e5cc2f44e3fed586408"
            })
            await Games.create({
                _id: "656e24e12dd591737a711ad9",
                title: "FIFA 23",
                genre: "Sports",
                year: 2022,
                ownerId: "656e1e5cc2f44e3fed586408"
            })
            await Games.create({
                _id: "656e24e12dd591737a711adb",
                title: "F1 2023",
                genre: "Simulation",
                year: 2023,
                achievments: 2,
                ownerId: "656e1e5cc2f44e3fed586408"
            })
                await Achievments.create({
                    title: "First Podium!",
                    points: 10,
                    difficulty: "Low",
                    gameId: "656e24e12dd591737a711adb"
                })
                await Achievments.create({
                    title: "Win the Drivers Championship",
                    points: 20,
                    difficulty: "Medium",
                    gameId: "656e24e12dd591737a711adb"
                })
            await Games.create({
                _id: "656e24e12dd591737a711add",
                title: "Counter Strike 2",
                genre: "Action",
                year: 2023,
                achievments: 1,
                ownerId: "656e1df65edfc1b4b10ea802"
            })

                await Achievments.create({
                    title: "Win on a 1v5",
                    points: 30,
                    difficulty: "Hard",
                    gameId: "656e24e12dd591737a711add"
                })

            await Games.create({
                _id: "656e24e12dd591737a711adf",
                title: "The Witcher 3",
                genre: "RPG",
                year: 2014,
                achievments: 1,
                ownerId: "656e1df65edfc1b4b10ea802"
            })

                await Achievments.create({
                    title: "Monster Killer!",
                    points: 20,
                    difficulty: "Medium",
                    gameId: "656e24e12dd591737a711adf"
                })

            await Games.create({
                _id: "656e24e12dd591737a711ae1",
                title: "Cyberpunk 2077",
                genre: "RPG",
                year: 2020,
                achievments: 1,
                ownerId: "656e1df65edfc1b4b10ea802"
            })

                await Achievments.create({
                    title: "Upgrader!",
                    points: 20,
                    difficulty: "Medium",
                    gameId: "656e24e12dd591737a711ae1"
                })

            await Games.create({
                _id: "656e24e12dd591737a711ae3",
                title: "Fall Guys",
                genre: "Casual",
                year: 2020,
                achievments: 1,
                ownerId: "656e1e5cc2f44e3fed58640c"
            })

                await Achievments.create({
                    title: "End up first every round.",
                    points: 30,
                    difficulty: "Hard",
                    gameId: "656e24e12dd591737a711ae3"
                })

            await Games.create({
                _id: "656e24e12dd591737a711ae5",
                title: "Fortnite",
                genre: "Action",
                year: 2017,
                ownerId: "656e1e5cc2f44e3fed58640c"
            })
            
            await Games.create({
                _id: "656e24e12dd591737a711ae7",
                title: "Dota 2",
                genre: "Moba",
                year: 2013,
                achievments: 1,
                ownerId: "656e1e5cc2f44e3fed58640e"
            })
                await Achievments.create({
                    title: "Dota is my life",
                    points: 50,
                    difficulty: "Impossible",
                    gameId: "656e24e12dd591737a711ae7"
                })

        res.status(201).json({msg: "DB instalada com sucesso."})

    } catch {
        res.status(400).json({msg: "DB Já instalada"})
    }
}

module.exports = {
    ranking,
    installdb,
    register,
    login,
    editUser,
    deleteUser,
    getUser,
    getLibrary,
    getAGame,
    adminDeleteUser,
    adminEditUser,
    adminGetUsers,
    getRole
}