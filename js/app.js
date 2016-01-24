//Variables for Appended Materials
var $overlay = $('<div id="overlay"></div>');
var $prev = $('<button id="prev">&larr;</button>');
var $image = $('<img>');
var $caption = $("<p></p>");
var $next = $('<button id="next">	&rarr;</button>');

//Variables for 
var currentImg;
var imgLocation;
var imgCaption;
var overlayVisibility = false;

$overlay.append($prev);
$overlay.append($image);
$overlay.append($next);
$overlay.append($caption);

$("body").append($overlay);


//Display Lightbox with Overlay, Image, and Caption
$("#imgGallery a").click(function(event) {
  event.preventDefault();
  currentImg = $(this).children("img");
  imgLocation = $(this).attr("href");
  $image.attr("src", imgLocation);
  imgCaption = $(this).children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  overlayVisibility = true;
});
    
//Display next image
var next = function() {
  imgLocation = currentImg.parents("li").next().children("a").attr("href");
  $image.attr("src", imgLocation);
  imgCaption = currentImg.parents("li").next().children("a").children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  currentImg = currentImg.parents("li").next().children("a").children("img");
};

//Display previous image
var prev = function() {
  imgLocation = currentImg.parents("li").prev().children("a").attr("href");
  $image.attr("src", imgLocation);
  imgCaption = currentImg.parents("li").prev().children("a").children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  currentImg = currentImg.parents("li").prev().children("a").children("img");
};

//Display next image by clicking "next" button
$('#next').click(function() {
  if (currentImg.parents("li").next().children("a").children("img").length === 0) {
  } else {
    next();
  }
});

//Display previous image by clicking "previous" button
$('#prev').click(function() {
  if (currentImg.parents("li").prev().children("a").children("img").length === 0) {
    $prev.css("color", "black");
  } else {
    $prev.css("color", "white");
    prev();
  }
});

//Change image displayed by using right and left arrow keys
$(window).keyup(function(event) {
  if (overlayVisibility === true) {
    if (event.which === 39 && currentImg.parents("li").next().children("a").children("img").length !== 0) {
      next();
    }
    if (event.which === 37 && currentImg.parents("li").prev().children("a").children("img").length !== 0) {
      prev();
    } else {
    }
  }
});

//Hide Lightbox
$image.click(function() {
  $overlay.hide();
  overlayVisibility = false;
});


//Prevent Form from Submitting
$("form").submit(function(event) {
  event.preventDefault();
});

//Search for words included in image captions
$('#search').keyup(function() {
  $search = $(this).val().toLowerCase();
  $('#imgGallery img').each(function() {
    if ($(this).attr("alt").toLowerCase().search($search) < 0) {
      $(this).css("visibility", "collapse");
    }
    else {
      $(this).css("visibility", "visible");
    }
  });
});