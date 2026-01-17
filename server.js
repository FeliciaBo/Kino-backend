import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 5080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// View engine = EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

//check when user used page last
let lastUpdated = Date.now()
app.get('/api/updates', (req, res) => {
  const since = Number(req.query.since)
  res.json({
    updated: lastUpdated > (since || 0),
    lastUpdated
  })
})

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

