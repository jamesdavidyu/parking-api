$(document).ready(function () {
  const apiUrl = $("#apiUrl").data("url");

  // checking if user has valid sesisonToken, if so, redirects to main page
  $.ajax({
    type: "GET",
    url: apiUrl + "/auth/verify",
    xhrFields: { withCredentials: true },
    success: function () {
      window.location.href = apiUrl + "/parking";
    },
    error: function () {},
  });

  $("#loginEmail").on("input", function () {
    $("#loginEmailLabel").removeClass("d-none");
    $("#loginEmail").attr("placeholder", "name@example.com");
  });

  $("#eye").click(function () {
    $("#eye").addClass("d-none");
    $("#eyeClosed").removeClass("d-none");
    $("#loginPassword").attr("type", "text");
  });

  $("#eyeClosed").click(function () {
    $("#eyeClosed").addClass("d-none");
    $("#eye").removeClass("d-none");
    $("#loginPassword").attr("type", "password");
  });

  $("#loginForm").submit(function (event) {
    event.preventDefault();

    let formData = {
      email: $("#loginEmail").val(),
      password: $("#loginPassword").val(),
    };

    $.ajax({
      type: "POST",
      url: apiUrl + "/auth/login",
      contentType: "application/json",
      xhrFields: { withCredentials: true },
      data: JSON.stringify(formData),
      success: function () {
        window.location.href = apiUrl + "/parking";
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });
});
