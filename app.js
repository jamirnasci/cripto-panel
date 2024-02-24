const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const ejs = require('ejs')
const app = express()

app.set('views', 'views')
app.set('view engine', 'ejs')
app.use(express.static('views'))

const currencies = {
    Ethereum: ["ethereum", "https://www.creativefabrica.com/wp-content/uploads/2021/06/14/Cryptocurrency-Ethereum-Logo-Graphics-13394054-1.jpg"],
    Bitcoin: ["bitcoin", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSava07d4jX9wDxHGDjaswekFhmGsvnwqJXWKVc_QyYVw&s"],
    Cardano: ["cardano", "https://www.creativefabrica.com/wp-content/uploads/2021/06/14/Cryptocurrency-Cardano-Logo-Graphics-13393853-1.jpg"],
    Tether: ["tether", "https://cryptologos.cc/logos/tether-usdt-logo.png"],
    Litecoin: ["litecoin", "https://blockmanity.com/wp-content/uploads/2019/01/litecoin_new_logo.jpg"],
    Polygon:["polygon", "https://th.bing.com/th/id/OIP.enZJCaGhwLyXKLthbGWLBwAAAA?rs=1&pid=ImgDetMain"]
}
let criptos = []

let getCriptoValue = async function() {
    for (const [key, value] of Object.entries(currencies)) {
        try {
            const url = `https://www.binance.com/pt-BR/price/${value[0]}`
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)
            let price = $('[class="css-1bwgsh3"]').text()
            let today = $('[class="css-4j2do9"]').text()
            let todayPrice = $('[class="css-guin5j"]').text()
            let obj = {name:key, price:price, today:today, todayPrice:todayPrice, imgUrl:value[1], url:url}
            console.log(obj)
            criptos.push(obj)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
}

app.get('/', (req, res) => {
    criptos = []
    getCriptoValue().then(()=>{  
        res.render('index', {criptos})
    }).catch(error => {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error')
    })
})

app.listen(8080, ()=> console.log('running'))