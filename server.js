import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { marked } from 'marked'

const app = express()
const port = 5080 //very important

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// View engine = EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')))

// Routes - Index, Movies, Single Movie
app.get('/', (req, res) => {
    res.render('index');
});

// Movies route from api
app.get('/movies', async (req, res) => {
  try {
    const response = await fetch
    ('https://plankton-app-xhkom.ondigitalocean.app/api/moviesTEST');

    //add own error handling
    if (!response.ok) {
      return res.status(404).render('errors/404');
    } 

    const result = await response.json();
  
    res.render('movies', { movies: result.data });
      
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    res.status(500).render('errors/500');
  }
});

app.get('/movies/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
    
    //add own error handling
    if (!response.ok) {
      return res.status(404).render('errors/404');
    } 
    const result = await response.json();


    //if data is not found/empty
    if (!result.data) {
      return res.status(404).render('errors/404');
    }

    const movie = result.data;

    // Convert to markdown 
    movie.attributes.introHtml = marked.parse(movie.attributes.intro || '');
    
    res.render('single-movie', { movie });

  } catch (error) {
    console.error('Failed to fetch movie:', error);
    res.status(500).render('errors/500');
  }
});

//find all 404 errors
app.use((req, res) => {
  res.status(404).render('errors/404');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

