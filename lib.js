const moment = require('moment')
const parseDuration = require('parse-duration')
const vision = require('@google-cloud/vision');

const filenameRegExp = new RegExp(/Screenshot (\d{4}-\d{2}-\d{2}) at (\d{2}\.\d{2}\.\d{2})\.png/)
const durationRegExp = new RegExp(/You completed the puzzle in ([^\.]+)\./, 'm')

const client = new vision.ImageAnnotatorClient();

const ocrImage = async (imgFilename) => {
    const [result] = await client.textDetection(imgFilename)
    const detections = result.textAnnotations
    const text = detections[0].description
    return text
}

const dateFromFilename = (filename) => {
    const m = filename.match(filenameRegExp)
    const d = `${m[1]} ${m[2]}`
    return moment(d, 'YYYY-MM-DD HH.mm.ss').format()
}

const durationFromString = (string) => {
    const m  = string.match(durationRegExp)
    const duration = parseDuration(m[1]) / 1000
    return duration
}

module.exports = { 
    durationFromString, 
    dateFromFilename,
    ocrImage
}
