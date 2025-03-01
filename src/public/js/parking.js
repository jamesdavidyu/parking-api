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

  $("#carReserve1").submit(function (event) {
    event.preventDefault();

    let formData = {
      car: "car1",
      from: $("#fromPicker").val(),
      to: $("#toPicker").val(),
    };

    console.log(formData);

    $.ajax({
      type: "POST",
      url: apiUrl + "/reservations",
      contentType: "application/json",
      xhrFields: { withCredentials: true },
      data: JSON.stringify(formData),
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
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
