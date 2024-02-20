const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()

const currencies = {
    ethereum:"ETH-USD",
    bitcoin:"BTC-USD",
    cardano:"ADA-USD",
    tether:"USDT-USD",
    litecoin:"LTC-USD"
}
let result = []

async function getCriptoValue(cripto){
    const url = `https://www.google.com/finance/quote/${cripto}`
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    let price = $('[class="YMlKec fxKbKc"]').text()
    return price
}

Object.entries(currencies).forEach((val)=>{
    getCriptoValue(val[1]).then((price)=>{
        let criptoName = val[0]
        let obj = [criptoName, price]
        result.push(obj)
        console.log(obj)
    })
})