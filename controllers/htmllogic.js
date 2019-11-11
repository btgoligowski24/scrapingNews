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
        db.Article.findOne({
            _id: req.params.id
        }).populate("notes").then(function (article) {
            console.log(article);
            res.json(article);
        }).catch(function (err) {
            res.json(err);
        });
    }
}