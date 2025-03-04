$(document).ready(function () {
  const apiUrl = $("#apiUrl").data("url");

  $.ajax({
    type: "GET",
    url: apiUrl + "/auth/verify",
    xhrFields: { withCredentials: true },
    success: function (response) {
      if (response.reservations) {
        for (let i = 1; i < 8; i++) {
          if (response.reservations.car === "car" + String(i)) {
            $("#emptyCar" + String(i)).addClass("d-none");
            $("#reservedCar" + String(i)).removeClass("d-none");
            $("#carReserve" + String(i)).addClass("d-none");
            $("#carReserved" + String(i)).removeClass("d-none");
            $("#updateReserve" + String(i)).append(
              " " +
                new Date(response.reservations.from).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                ) +
                " at " +
                new Date(response.reservations.from).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                ) +
                " to " +
                new Date(response.reservations.to).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                " at " +
                new Date(response.reservations.to).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) +
                "."
            );
          }
        }
      }
    },
    error: function (error) {
      window.location.href = apiUrl + "/";
    },
  });

  for (let i = 1; i < 8; i++) {
    $("#carReserve" + String(i)).submit(function (event) {
      event.preventDefault();

      let formData = {
        car: "car" + String(i),
        from: $("#fromPicker" + String(i)).val(),
        to: $("#toPicker" + String(i)).val(),
      };

      console.log(formData);

      $.ajax({
        type: "POST",
        url: apiUrl + "/reservations",
        contentType: "application/json",
        xhrFields: { withCredentials: true },
        data: JSON.stringify(formData),
        success: function (response) {
          window.location.reload();
        },
        error: function (error) {
          console.error("Error:", error);
        },
      });
    });
  }

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
