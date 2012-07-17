
// solution from http://stackoverflow.com/questions/5100539/django-csrf-check-failing-with-an-ajax-post-request
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

function bookmark_edit() {
  var item = $(this).parent();
  var url = item.find(".title").attr("href");
  item.load(
    "/save/?ajax&url=" + encodeURIComponent(url),
    null,
    function () {
      $("#save-form").submit(bookmark_save);
    }
  );
  return false;
}

$(document).ready(function () {
  $("ul.bookmarks .edit").click(bookmark_edit);
});

function bookmark_save() {
  var item = $(this).parent();
  var data = {
    url: item.find("#id_url").val(),
    title: item.find("#id_title").val(),
    tags: item.find("#id_tags").val()
  };
  $.post("/save/?ajax", data, function (result) {
    if (result != "failure") {
      item.before($("li", result).get(0));
      item.remove();
      $("ul.bookmarks .edit").click(bookmark_edit);
    }
    else {
      alert("Failed to validate bookmark before saving.");
    }
  });
  return false;
}
