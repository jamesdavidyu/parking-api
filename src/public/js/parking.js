$(document).ready(function () {
  const apiUrl = $("#apiUrl").data("url");

  $.ajax({
    type: "GET",
    url: apiUrl + "/auth/verify",
    xhrFields: { withCredentials: true },
    success: function () {
      // TODO: welcome message
    },
    error: function (error) {
      window.location.href = apiUrl + "/";
    },
  });

  $(function () {
    new tempusDominus.TempusDominus(document.getElementById("datetimepicker"), {
      display: {
        icons: {
          time: "bi bi-clock",
          date: "bi bi-calendar",
          up: "bi bi-arrow-up",
          down: "bi bi-arrow-down",
        },
      },
    });
  });

  $("#signOutButton").click(function (event) {
    event.preventDefault();

    $.ajax({
      type: "GET",
      url: apiUrl + "/auth/logout",
      xhrFields: { withCredentials: true },
      success: function () {
        window.location.href = apiUrl + "/";
      },
      error: function () {
        window.location.href = apiUrl + "/";
      },
    });
  });
});
