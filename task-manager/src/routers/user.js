const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user: user, token: token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login/', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: user, token: token})
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth , async (req, res) => {
    res.send(req.user)
})



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invaid Update Types'})
    }


    try {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        });

        await req.user.save()

        res.send(req.user)
    } catch (error) {
        if (error.message && error.message.includes("Cast to ObjectId failed")) {
            return res.status(404).send()
        } else {
            return res.status(400).send(error)
        }
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send(error)
        // }

        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router