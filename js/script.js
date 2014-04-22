var images = []
  , currentIndex = 0;

var interval;
var second;

$(document).ready(function(){
  $photos = $('.photo-thumb-content')
              .on('click', showImage);

  _.each($photos, function(element){
    var image = makeImage($(element).data('image'));
    images.push(image);
  });

  images = _.compact(images); // cleanup undefined
});

function dismissImage(){
  $('#overlay').remove();
  $('.modal-box').remove();
}

function showImage() {
  var imageSource = $(this).data('image')

    , html = '<div class="modal-box photo-box">'
           + '<a href="javascript:void(0);" class="arrow previous" onclick="previousImage();"></a>&nbsp;'
           + '<div id="loader"></div>'
           + '<img id="currentPhoto" class="photo-full" style="display:none;" src="' + imageSource +  '"/>'
           + '<a href="javascript:void(0);" class="arrow next" onclick="nextImage();"></a>'
           + '</div>'

    , $element = $(html).css('top', $(window).height() * 0.05)
                        .css('left', $(window).width() / 2 - (1050 / 2))

    , $overlay = $('<div id="overlay"></div>')
                  .height($(document).height()).css({
                    'opacity': 0.4,
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'background-color': 'black',
                    'width': '100%',
                    'z-index': 5000
                  })
                  .on('click', dismissImage)
    , $body = $('body')
                .append($element)
                .append($overlay)
    , $currentPhoto = $('#currentPhoto')
                        .load(function() {
                          $('#loader').hide();
                          $currentPhoto.show();
                        })

   setCurrentIndexForImage(imageSource);
}

function setCurrentIndexForImage(imageSource){
  _.each(images, function(image, index){
    if(image.src === imageSource) {
      currentIndex = index;
    }
  })
}

function nextImage(){
  currentIndex++;

  if(currentIndex > images.length - 1) {
    currentIndex = 0;
  }

  showPhotoAtIndex(currentIndex);
}

function previousImage(){
  currentIndex--;

  if(currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  showPhotoAtIndex(currentIndex);
}

function showPhotoAtIndex(index){
  var image = images[index];

  if(!image.hasLoaded) {
    image.hasLoaded = true;
  } else {
    $('#loader').hide()
  }

  $('#currentPhoto').hide().attr('src', image.src);
}

function makeImage(src) {
  return {
    src : src,
    hasLoaded : false
  }
}
