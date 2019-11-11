$(document).ready(function () {
  $(document).on("click", ".scrape", scrapeArticles);
  $(".clear").on("click", clearArticles);
  $(document).on("click", ".save", saveArticle);
  $(document).on("click", ".delete", deleteArticle);
  $(document).on("click", ".notes", getNotes);
  $("#saveNote").on("click", saveNote);
  $(document).on("click", ".deleteNote", deleteNote);

  function scrapeArticles(event) {
    event.preventDefault();
    $.ajax({
      method: "GET",
      url: "/api/scrape"
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }

  function clearArticles(event) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/api/articles"
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }

  function saveArticle(event) {
    event.preventDefault();
    const articleId = $(this).parents(".card").attr("data-_id");
    $.ajax({
      method: "PUT",
      url: "/api/articles/" + articleId
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }

  function deleteArticle(event) {
    event.preventDefault();
    const articleId = $(this).parents(".card").attr("data-_id");
    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + articleId
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }

  function getNotes(event) {
    event.preventDefault();
    const articleId = $(this).parents(".card").attr("data-_id");
    $.ajax({
      method: "GET",
      url: "/articles/" + articleId
    }).then(function (data) {showNotes(data)}).catch(function (err) {
      alert(err);
    })
  }

  function showNotes(article) {
    console.log("article", article);
    const notes = article.notes;
    const modalElem = $("#articleModal");
    const modalTitleElem = $("#articleModalTitle");
    const modalBodyElem = $(".modal-body");
    const ulElem = $("<ul class=\"list-group list-group-flush\">");
    const textAreaElem = $("<textarea id=\"noteText\" placeholder=\"New Note\" class=\"mt-3\">");

    $(modalElem).attr("data-_id", article._id);
    $(modalBodyElem).empty();

    if (notes.length === 0) {
      const liElem = $("<li class=\"list-group-item list-group-item-dark d-flex\">");
      const spanElem = $("<span class=\"align-self-center\">");
      $(spanElem).text("There are no notes saved to this article yet.");
      $(liElem).append(spanElem);
      $(ulElem).append(liElem);
    } else {
      console.log("notes", notes);
      for (let note in notes) {
        const liElem = $("<li class=\"list-group-item list-group-item-dark d-flex\">");
        const spanElem = $("<span class=\"align-self-center\">");
        const buttonElem = $("<button class=\"btn btn-sm btn-danger deleteNote ml-auto\">");
        $(buttonElem).text("x");
        $(buttonElem).attr("data-_id", notes[note]._id);
        $(spanElem).text(notes[note].body);
        $(liElem).append(spanElem);
        $(liElem).append(buttonElem);
        $(ulElem).append(liElem);
      }
    }
    $(modalBodyElem).append(ulElem);
    $(modalBodyElem).append(textAreaElem);
    $(modalTitleElem).text("Notes for Article Id: " + article._id);
    $("#articleModal").modal("show");
  }

  function saveNote(event) {
    event.preventDefault();
    const articleId = $(this).parents(".modal").attr("data-_id");
    const noteText = $("#noteText").val();
    $.ajax({
      method: "POST",
      url: "/api/notes/" + articleId,
      data: {
        body: noteText
      }
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }

  function deleteNote(event) {
    const noteId = $(this).attr("data-_id");
    $.ajax({
      method: "DELETE",
      url: "/api/notes/" + noteId
    }).then(function (data) {
      location.reload();
    }).catch(function (err) {
      alert(err);
    });
  }
});