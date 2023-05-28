$(document).ready(function() {

    $("#enviar").click(function(e) {
        
      e.preventDefault();  
      var url = "http://localhost:4000/datos";  
      var nombre = $("#nombre").val();
      var apellido = $("#apellido").val();
      var edad = $("#edad").val();
      var correo = $("#correo").val();  
      var data = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        correo: correo
      };  

      $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),// convierte a formato json.
        contentType: "application/json", // tipo de fomato que recivira

        success: function(response) {
          if (response === "Correo ya existente") {
            $("#mensaje").html(response);
          } else {

            var mensaje = "Los datos ingresados son:<br>" +
            "Nombre: " + data.nombre + "<br>" +
            "Apellido: " + data.apellido + "<br>" +
            "Edad: " + data.edad + "<br>" +
            "Correo Electrónico: " + data.correo + "<br>";

          $("#mensaje").html(mensaje);
        }
      },
      error: function(xhr, status, error) {
        var errorMessage = xhr.responseText || "Error interno del servidor";
        $("#error-message").text(errorMessage);
        console.log(status);
        console.log(error);
      }
    });
    });

  });