$(document).ready(() => {
  const apiUrl = $("#apiUrl").data("url");

  $("#loginForm").submit((event) => {
    event.preventDefault();

    let formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };

    $.ajax({
      type: "POST",
      url: apiUrl + "/auth/login",
      contentType: "application/json",
      xhrFields: { withCredentials: true },
      data: JSON.stringify(formData),
      success: () => {
        console.log("Success");
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  });

  $("#signUpTrigger").click(() => {
    $("#signUpForm").removeClass("d-none");
    $("#loginForm").addClass("d-none");
    $("#signUpTrigger").addClass("d-none");
  });
});
