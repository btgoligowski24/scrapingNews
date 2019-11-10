const apiLogic = require("../controllers/apilogic");

module.exports = app => {
    // A GET route for scraping the WSJ Business website
    app.get("/api/scrape", apiLogic.scrapeNews);

    // Route for saving/updating an Article's associated Note
    app.post("/api/notes/:id", apiLogic.addNotes);

    app.put("/api/articles/:id", apiLogic.updateArticle);

    app.delete("/api/articles/:id", apiLogic.deleteArticle);

    app.delete("/api/notes/:id", apiLogic.deleteNote);

    app.delete("/api/articles/", apiLogic.deleteArticles);
}