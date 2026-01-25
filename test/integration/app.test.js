import request from "supertest";
import fetch from "node-fetch";
import app from "../../server.js";

describe("Movie pages", () => {

  test("Each valid single movie page renders the correct title", async () => {

    // 1. Fetch movie list
    const listRes = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
    const listData = await listRes.json();
    const movies = listData.data;

    const validMovies = [];

    // Filter valid movies
    for (const movie of movies) {
      const id = movie.id;
      const title = movie.attributes?.title;

      if (!title) continue;

      const singleRes = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
      if (!singleRes.ok) continue;

      const singleData = await singleRes.json();
      const singleTitle = singleData.data?.attributes?.title;

      if (!singleTitle) continue;

      validMovies.push({ id, title: singleTitle });
    }

    // Test each valid movie page
    for (const movie of validMovies) {
      const page = await request(app).get(`/movies/${movie.id}`);

      expect(page.status).toBe(200);
      expect(page.text).toContain(movie.title);
    }
  });

  test("Non-existing movie ID returns 404 page", async () => {
    const res = await request(app).get("/movies/9999");

    expect(res.status).toBe(404);
    expect(res.text).toContain("The page you are looking for does not exist.");
  });

});
