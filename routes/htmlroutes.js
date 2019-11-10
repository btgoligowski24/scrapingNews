const htmlLogic = require("../controllers/htmllogic");

module.exports = app => {
    // Routes for getting Articles from the db
    app.get("/", htmlLogic.nonSavedArticles);
    app.get("/savedArticles", htmlLogic.savedArticles);
    app.get("/articles/:id", htmlLogic.specificArticle);
}