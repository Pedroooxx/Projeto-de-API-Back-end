const express = require('express')
const Achievments = require('../models/Achievment')
const Games = require("../models/Game")
const User = require('../models/User')

const router = express.Router();

//instala DB
router.get('/', installdb = async (req, res) => {
    
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
})

module.exports = router;