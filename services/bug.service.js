import { utilService } from "./util.service.js"

const bugs = utilService.readJsonFile('data/bug.json')

export const bugService = {
    query,
}

function query() {
    return Promise.resolve(bugs)
}