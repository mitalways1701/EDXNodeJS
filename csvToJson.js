const fs = require('fs')
const path = require('path')
const csv = require('csvtojson/v2')

const convertToJson = (csvFileName = 'customer-data.csv', jsonFileName = 'customer-data.json') => {
    const csvPath = path.join(__dirname, csvFileName)
    const jsonPath = path.join(__dirname, jsonFileName)
    
    console.log('Path is', __dirname)
    console.log('Converting from CSV file', csvFileName, 'to JSON file', jsonFileName, '...')

    const converter = csv().fromFile(csvPath)

    converter.then((jsonData) => {
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))
    })

    converter.on('error', (error) => {
        console.log(`ERROR: ${error}`)
        process.exit(1)
    })

    converter.on('done', () => {
        console.log('Success')
    })
}

convertToJson(process.argv[2], process.argv[3])
