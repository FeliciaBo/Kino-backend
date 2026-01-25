import request from 'supertest';
import app from '../../server.js';

//Test 1: Check that all movie pages render the correct title
describe('All movie pages render the correct title', () => {

  test('Each single movie page renders the correct title', async () => {
    
    //Check that movie list loads successfully
    const movieList = await request(app).get('/movies');
    expect(movieList.status).toBe(200);

    //Fetch movie list from API to get IDs and titles
    const apiList = await fetch('https://plankton-app-xhkom.ondigitalocean.app/api/moviesTEST');
    const apiData = await apiList.json();
    const movies = apiData.data;

    for (const movie of movies) {

      //More readable variables for ID and title
      const movieId = movie.id;
      const movieTitle = movie.attributes.title;
      
      //Check that single movie page renderers successfully
      const moviePage = await request(app).get(`/movies/${movieId}`);
      expect(moviePage.status).toBe(200);   

      //Check that the movie title is in the rendered page
      expect(moviePage.text).toContain(`<h1>${movieTitle}</h1>`);
    }
  });
});

//Test 2: Check that 404 error is handled correctly for non-existing movie ID
describe('Correct 404 error handling ', () => {

  test('Should return 404 for non-existing movie ID', async () => {
    const movieId = 9999; // Non-existing movie ID
    const response = await request(app).get(`/movies/${movieId}`);
    
    expect(response.status).toBe(404);
    expect(response.text).toContain('404 not found'); // Check for 404 content
  });
});