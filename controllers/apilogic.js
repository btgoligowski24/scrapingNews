// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

module.exports = {
    scrapeNews: (req, res) => {
        // First, we grab the body of the html with axios
        axios.get("https://www.wsj.com/news/business").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);

            // Now, we grab every h2 within an article tag, and do the following:
            $("article.WSJTheme--story--pKzwqDTt").each(function (i, element) {
                // Save an empty result object
                const result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.title = $(this)
                    .find("h3")
                    .text();
                result.summary = $(this)
                    .find("p")
                    .text();
                result.link = $(this)
                    .find("a")
                    .attr("href");

                const query = {
                    title: result.title
                };
                const options = {
                    upsert: true,
                    setDefaultsOnInsert: true
                }
                // Create a new Article using the `result` object built from scraping
                db.Article.update(query, result, options)
                    .then(function (article) {
                        console.log(article);
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });


            // Load the home page
            res.render("index", handlebarsObj);
        });
    },
    addNotes: (req, res) => {
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
        db.Note.create(req.body).then(function (newNote) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, {
                $push: {
                    notes: newNote
                }
            })
        }).then(function (article) {
            res.json(article);
        }).catch(function (err) {
            res.json(err);
        });
    },
    updateArticle: (req, res) => {
        db.Article.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                saved: true
            }
        }).then(function (article) {
            res.json(article);
        }).catch(function (err) {
            res.json(err);
        });
    },
    deleteArticle: (req, res) => {
        db.Article.remove({
            _id: req.params.id
        }).then(function (article) {
            res.json(article);
        }).catch(function (err) {
            res.json(err);
        });
    },
    deleteNote: (req, res) => {
        db.Note.remove({
            _id: req.params.id
        }).then(function (note) {
            res.json(note);
        }).catch(function (err) {
            res.json(err);
        })
    },
    deleteArticles: (req, res) => {
        db.Article.remove({}).then(function (articles) {
            res.json(articles);
        }).catch(function (err) {
            res.json(err);
        });
    }
}