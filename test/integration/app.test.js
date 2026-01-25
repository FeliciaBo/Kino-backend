import request from "supertest";
import fetch from "node-fetch";
import app from "../../server.js";

describe("Movie pages", () => {

  test("Each valid single movie page renders the correct title", async () => {

    //Fetch movie list from API
    const listRes = await fetch(
      "https://plankton-app-xhkom.ondigitalocean.app/api/movies"
    );
    const listData = await listRes.json();
    const movies = listData.data;

    const validMovies = [];

    // Filter out movies that actually exist as single pages
    for (const movie of movies) {
      const id = movie.id;
      const title = movie.attributes?.title;

      if (!title) continue; 

      const singleRes = await fetch(
        `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`
      );

      if (!singleRes.ok) continue;

      validMovies.push({ id, title });
    }

    //Test each valid movie page rendered by OUR server
    for (const movie of validMovies) {
      const page = await request(app).get(`/movies/${movie.id}`);

      expect(page.status).toBe(200);

    // Escape special HTML characters in title for accurate comparison 
    // and NOT BREAK THE TEST
      const escapedTitle = movie.title.replace(/&/g, "&amp;");

      expect(page.text).toContain(escapedTitle);
    }
  });

  test("Non-existing movie ID returns 404 page", async () => {
    const res = await request(app).get("/movies/9999");

    expect(res.status).toBe(404);
    expect(res.text).toContain("The page you are looking for does not exist");
  });

});