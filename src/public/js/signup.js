$(document).ready(function () {
  const apiUrl = $("#apiUrl").data("url");

  $.ajax({
    type: "GET",
    url: apiUrl + "/auth/verify",
    xhrFields: { withCredentials: true },
    success: function () {
      window.location.href = apiUrl + "/parking";
    },
    error: function () {},
  });

  $("#signUpForm").submit(function (event) {
    event.preventDefault();

    let formData = {
      email: $("#signupEmail").val(),
      username: $("#username").val(),
      password: $("#signupPassword").val(),
    };

    $.ajax({
      type: "POST",
      url: apiUrl + "/auth/register",
      contentType: "application/json",
      xhrFields: { withCredentials: true },
      data: JSON.stringify(formData),
      success: function () {
        $.ajax({
          type: "POST",
          url: apiUrl + "/auth/login",
          contentType: "application/json",
          xhrFields: { withCredentials: true },
          data: JSON.stringify(formData),
          success: function () {
            window.location.reload();
          },
          error: function (error) {
            console.error("Error:", error);
          },
        });
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  });
});
