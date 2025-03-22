import { utilService } from "./util.service.js"

const bugs = utilService.readJsonFile('data/bug.json')

export const bugService = {
    query,
    getById,
}

function query() {
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = bugs.find(bug => bug.bug._id === bugId)
    if (!bug) return Promise.reject('Bug not found!')
    return Promise.resolve(bug)
}

function save(bug) {
    console.log('bug:', bug)
}

