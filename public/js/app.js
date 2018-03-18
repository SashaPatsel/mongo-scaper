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

console.log($(this))
  var thisId = $(this).data("id");
console.log($(".comm-div").data())
console.log($(this).data())
if ($(".comm-div").data() === $(this).data()) {
  $(".comm-div").append("<form><input type='input' class='comment-form'><input type='submit' class='comment-submit' value='submit'></form>")
}

  // $(this).append

  // $.ajax({
  //   method: "POST",
  //   url:"/unsaved/" + thisId,
  // }).then(function(data) {
  //   console.log(data)
  // })
})