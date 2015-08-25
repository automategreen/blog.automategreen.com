//= require jquery
//= require fastclick
//= require anchor
//= require foundation/foundation
//= require foundation/foundation.topbar

$(document).foundation();
anchors.options = {
  placement: 'left'
};
anchors.add('.post-content > h2');
anchors.add('.post-content > h3');