import express from 'express'


const app = express()
const port = 5080

//check when user last used page
let lastUpdated = Date.now()

function pageUpdated() {
  lastUpdated = Date.now()
}



//from expressjs.com
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
