const fs = require('fs')
const path = require('path')

const {durationFromString, dateFromFilename, ocrImage } = require('./lib')

const inDir = "./in"
const outDir = "./out"

fs.readdir(inDir, (err, files) => {
    if (err) throw new Error(err)
    files.forEach( async (f) => {
        const file = path.join(__dirname, inDir, f)
        const ocrText = await ocrImage(file)
        const duration = durationFromString(ocrText)
        const dateTime = dateFromFilename(f)
        console.log(`${dateTime}: ${duration} seconds`)
        fs.writeFile(
            path.join(__dirname, outDir, 'data.csv'), 
            `${dateTime}\t${duration}\n`, 
            {'encoding': 'utf8', 'flag': 'a'}, (e) => {})
})
})
