$(document).on("click", "#scraper", function() {
    $.ajax({
    method: "GET",
    url: "/scraper"
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".saver", function() {
  
  var thisId = $(this).data("id");

  $.ajax({
    method: "POST",
    url:"/saved/" + thisId,
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".unsaver", function() {
  
  var thisId = $(this).data("id");

  $.ajax({
    method: "POST",
    url:"/unsaved/" + thisId,
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".comment", function() {

  var thisId = $(this).data("id");
// console.log("append div", $(".comm-div").data())
// console.log("button", $(this).data())
// if ($(".comm-div").data() == $(this).data()) {
  // $(".comm-div").append("<form><input type='input' class='comment-form'><input type='submit' class='comment-submit' value='submit'></form>")
  $(".comm-div").removeClass("hide")
  console.log($(this).data().id)
  $(".comment-submit").attr("id",  $(this).data().id)
// }

})

$(document).on("submit", ".comment-submit", function() {
event.preventDefault()
//set timeout
  var thisId = $(this).attr("id");

  $(".comm-div").addClass("hide")

     storeComment(thisId ,{
         comment: $(".comment-form").val().trim()
     });
})

 function storeComment(id, comment) {
   console.log("/comments/"+id, comment)
     $.post("/comments/"+id, comment)
     .then(function() {
         console.log(id, comment)
     })
 }

$(document).on("click", ".view-comments", function() {

  var thisId = $(this).data("id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/comment/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      
    });
});

