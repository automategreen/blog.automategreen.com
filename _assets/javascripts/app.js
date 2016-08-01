//= require jquery
//= require fastclick
//= require anchor
//= require foundation/foundation
//= require foundation/foundation.topbar
//= require slick

$(document).foundation();
anchors.options = {
  placement: 'left'
};
anchors.add('.post-content > h2');
anchors.add('.post-content > h3');

$(document).ready(function(){
  $('.image-slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
});