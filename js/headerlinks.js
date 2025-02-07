$(document).ready(function () {
  $("h2, h3, h4, h5, h6, dt").each(function() {
    el = $(this)
    id = el.attr('id')
    icon = '<i></i>'
    if (id) {
      el.append($("<a />").addClass("header-link").attr("href", "#" + id).html(icon))
    }
  })
})