const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getTemparature = require('./utils/getTemparature')

//Define Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log('partialsPath', partialsPath)

const app = express()
app.use(express.static(publicDirectoryPath))
//Define Handler Engine and viewa Location
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

//Home Call
app.get('', (req, res) =>{
    res.render('index', {
        title : 'Home Page',
        name : 'JHON'
    })
    
})

//Help Call
app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help Page',
        name : 'Smith'
    })
})

//About Call
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Rock'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.query){
        return res.send('query attribute is mandatory')
    }
    const cityName = req.query.query
    console.log('cityName', cityName)
    getTemparature.tempDetails(cityName, (error, {region, country, temparature, weatherDescription} = {}) => {
        if(error){
            return res.send({ error })
            console.log('Went into error block')
        }
        res.send({
            region,
            country,
            temparature,
            weatherDescription
        })
        // console.log('ERROR: ',error)
        // console.log('temparature: ',temperature)
        // console.log('feelsLike: ',feelsLike)
    })
})



app.get('/products', (req, res) =>{
    //console.log(req.query.search);
    if(!req.query.search){
        return res.send('The Search Query is missing in url')
    } 
    res.send({
        products : []
     })
})






app.get('/help/*', (req,res) =>{
    res.render('404', {
        errorMessage : 'The help you are searching for is not available'
    })
    //res.send('The help you are searching for is not available')
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage : '404: This page is invalid',
        title: 'Error Page',
        name : 'Andrew'
    })
    //res.send('404: This page is invalid')
})

app.listen(3000, () => {
    console.log('Server is up and running')
})