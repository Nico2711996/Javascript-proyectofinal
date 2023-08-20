
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 
  
      let nombreApellido = form.querySelector("#nombre").value;
      let telefono = form.querySelector("#telefono").value;
      let email = form.querySelector("#email").value;
      let consulta = form.querySelector("#consulta").value;
  
      let datoUsuario = {
        nombreApellido: nombreApellido,
        telefono: telefono,
        email: email,
        consulta: consulta,
      };
  
      let registros = [];

    if (localStorage.getItem("registros")) {
      registros = JSON.parse(localStorage.getItem("registros"));
    }

    registros.push(datoUsuario);

    localStorage.setItem("registros", JSON.stringify(registros));

    console.log(registros);
  });
});
  