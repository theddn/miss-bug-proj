import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'


const app = express()

app.use(express.static('public'))
app.use(cookieParser())

app.get('/api/bug', (req, res) => {
    bugService.query().then(bugs => {
        res.send(bugs)
    }).catch((err) => {
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bugs')
    })
})

app.get('/api/bug/save', (req, res) => {

    loggerService.debug('req.query', req.query)

    const { title, description, severity, _id } = req.query
    console.log('req.query:', req.query)

    const bug = {
        _id,
        title,
        description,
        severity: +severity,
    }

    bugService.save(bug).then((saveBug) => {
        res.send(saveBug)
    }).catch((err) => {
        loggerService.error('Cannot savr bug', err)
        res.status(400).send('Cannot save bug')
    })
})


app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    const { visitCountMap = [] } = req.cookies

    if (visitCountMap.length >= 3) return res.status(401).send('Wait for a bit')
    if (!visitCountMap.includes(bugId)) visitCountMap.push(bugId)

    res.cookie('visitCountMap', visitCountMap, { maxAge: 1000 * 10 })
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch((err) => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bug')
        })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId).then(() => {
        loggerService.info(`Bug ${bugId} has removed`)
        res.send('Removed!')
    }).catch((err) => {
        loggerService.error('Cannot get bug', err)
        res.status(400).send('Cannot get bug')
    })
})

const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)

