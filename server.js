const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080

const DICTIONARY = JSON.parse(fs.readFileSync('dictionary.json', 'utf8'))
const DICTIONARY_GROUPED = group_by_letter(DICTIONARY);

const { dirname } = require('path');
const BASE_PATH = dirname(require.main.filename);

function group_by_letter(dict) {
    const keys = Object.keys(dict).sort();
    const letters = new Set(keys.map(key => key[0]))

    let data = {}
    letters.forEach(l => {
        const letter_keys = keys.filter(key => l === key[0])
        let letter_data = {}
        letter_keys.forEach(key => letter_data[key] = DICTIONARY[key])
        data[l] = letter_data
    })

    return data
}

app.get('/', (req, res) => {
    res.render("index.hbs", {
        dictionary: DICTIONARY_GROUPED
    })
})

app.get('/mindmap', (req, res) => {
    res.sendFile(BASE_PATH + '/assets/mindmap.jpg');
})

app.get('/*', (req, res) => {
    const key = req.params[0].toUpperCase()
    if (Object.keys(DICTIONARY).includes(key)) {
        res.render("item.hbs", {
            key: key,
            value: DICTIONARY[key],
        })
    } else {
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})