import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'

const app = express()
const port = 5080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// View engine = EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

// Routes - Index, Movies, Single Movie
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, World!' });
});


// Movies route from api
app.get('/movies', async (req, res) => {
  try {
    const response = await fetch
    ('https://plankton-app-xhkom.ondigitalocean.app/api/movies');
    const result = await response.json();
  
    res.render('movies', { 
      movies: result.data });
      
  } catch (error) {
    console.error('Error: Failed to fetch movies:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/movies/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    const result = await response.json();

    const movie = result.data;

 movie.attributes.introHtml = marked.parse(`
# Markdown testing

**Bold text**

- One
- Two
- Three
`);
    
    res.render('single-movie', { movie });
  } catch (error) {
    console.error('Error: Failed to fetch movie:', error);
    res.status(500).send('Internal Server Error');
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

