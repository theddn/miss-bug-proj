import express from 'express'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'


const app = express()


// TODO: Provide an API for Bugs CRUDL:(Implement one by one along with a bugService)
/*
   app.get('/api/bug', (req, res) => {})
   app.get('/api/bug/save', (req, res) => {})
   app.get('/api/bug/:bugId', (req, res) => {})
   app.get('/api/bug/:bugId/remove', (req, res) => {})
*/

app.get('/api/bug', (req, res) => {
    bugService.query().then(bugs => {
        res.send(bugs)
    }).catch((err) => {
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bugs')
    })
})

app.get('/api/bug/save', (req, res) => {

})

app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    console.log('req.params:', req.params)
    bugService.getById(bugId)
        .then(bugId => res.send(bugId))
        .catch((err) => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bugs')
        })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId).then(() => {
        loggerService.info(`Bug ${bugId} has removed`).res.send('Removed!')
    }).catch((err) => {
        loggerService.error('Cannot get bugs', err)
        res.status(400).send('Cannot get bug')
    })
})


app.get('/api/logs', (req, res) => {
    res.sendFile(process.cwd() + '/logs/backend.log')
})


const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
)

