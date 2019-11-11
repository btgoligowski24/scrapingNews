# scrapingNews

## What Problem Does the App Solve
This app is a continuation of me learning express.js and express-handlebars. It reinforces CRUD requests and how to use those to handle traffic and views. It is introduces me to mongoose and mongoDB.

## App Overiew
The app is organized by using standard MVC format.

## How to Use the App
1. Navigate to https://blooming-scrubland-09657.herokuapp.com/
1. You have the following options on the home page:
    * If the page does not have any articles listed, click the "Scrape New Articles" load articles to the page.
    * If you want to remove everything, click the "Clear Articles" button.
    * When there are articles to view, you can save individual ones as your favorites that get displayed on the "Saved Articles" page.
    * You can click the "Saved Articles" link to view your saved articles.
1. You have the following options on the saved articles page:
    * You can navigate back to the home page by clicking the "Home" link
    * If you want to remove everything, click the "Clear Articles" button.
    * You can delete the article from the saved list by clicking the "Delete From Saved" button.
    * You can view the list of notes for the article by clicking the "Article Notes" button.
        * While viewing the article notes you can add to the list by typing something in the new note box.
        * You can remove notes from the list by clicking the red "x" button of those that already exist.
2. Voila, you've used the app. It should refresh the page after each interaction.

## Technology Used
* Node.js
  * Specific Node Pacakages
    * express
    * path
    * mongoose
    * express-handlebars
    * cheerio
* mongoDB

## Contributors
I am the sole contributor to this project at this time. This likely will not be updated and maintained going forward.