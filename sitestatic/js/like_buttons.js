$(document).ready(function() {

  function setLike(sid, val, onLike, onRemove) {
    $.ajax({
      type: "POST",
      url: "/l/",
      data: {"sid" : sid, "val": val},
      dataType: "json",
      success: function(data) {
        if (data['is_liked']===true) {
          onLike(data);
        } else {
          onRemove(data)
        }
      },
      error: function(data) {
        alert(data.responseJSON.errMsg);
      }
    });
  };
  $(".like-button").click(function(ev) {
    var target = $(ev.target).parent(),
        sid = target.attr('data-story-id'),
        val = target.find(".fa-heart").hasClass("pink") ? 0 : 1,
        cEl = target.find(".count"),
        hEl = target.find(".fa-heart");
    var onLike = function(data) {
      cEl.html(data['like_count']);
      hEl.addClass("pink"); };
    var onRmve = function(data) {
      cEl.html(data['like_count']);
      hEl.removeClass("pink"); };
    setLike(sid, val, onLike, onRmve);
  });
});
