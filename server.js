import express from 'express'
import { bugService } from './services/bug.service.js'
const app = express()


// TODO: Provide an API for Bugs CRUDL:(Implement one by one along with a bugService)
/*
   app.get('/api/bug', (req, res) => {})
   app.get('/api/bug/save', (req, res) => {})
   app.get('/api/bug/:bugId', (req, res) => {})
   app.get('/api/bug/:bugId/remove', (req, res) => {})
*/

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
})


const port = 3031
app.listen(port, () =>
    console.log(`Server listening on port http://127.0.0.1:${port}/`)

)