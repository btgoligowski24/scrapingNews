// Require all models
const db = require("../models");

module.exports = {
    nonSavedArticles: (req, res) => {
        // Route grabs all of the articles
        db.Article.find({
            saved: false
        }).then(function (articles) {
            if (articles.length === 0) {
                res.render("noarticles");
            } else {
                const handlebarsObj = {
                    articles: articles
                }
                res.render("index", handlebarsObj);
            }
        }).catch(function (err) {
            res.json(err);
        });
    },
    savedArticles: (req, res) => {
        // Route grabs all of the articles
        db.Article.find({
            saved: true
        }).then(function (articles) {
            if (articles.length === 0) {
                res.render("nosavedarticles");
            } else {
                const handlebarsObj = {
                    articles: articles
                }
                res.render("savedarticles", handlebarsObj);
            }
        }).catch(function (err) {
            res.json(err);
        });
    },
    specificArticle: (req, res) => {
        // Finish the route so it finds one article using the req.params.id,
        // and run the populate method with "note",
        // then responds with the article with the note included
        db.Article.findOne({
            _id: req.params.id
        }).populate("note").then(function (notes) {
            const handlebarsObj = {
                notes: notes
            }
            console.log(handlebarsObj);
            res.json(handlebarsObj);
        }).catch(function (err) {
            res.json(err);
        });
    }
}