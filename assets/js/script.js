$("document").ready(function () {
    // SE TOMA EL VALOR DEL INPUT
    $("form").submit(function (event) {
      event.preventDefault();

      let numeroIngresado = $("#inputBuscador").val();
  
      // VALIDAMOS QUE EL USUARIO NO INGRESE UN NUMERO MAYOR A 731, YA QUE ESA ES LA CANTIDAD DE HEROES
      if (numeroIngresado <= 0) {
        alert("Solo se aceptan números positivos.\n Por favor ingrese un número entre el 1 y 731");
      }  else if (numeroIngresado > 731) {
        // Si el valor ingresado no es un número
        alert("Solo hay 731 Super Heros. Por favor, ingrese un número entre 1 y 731.");
      }
    else if (isNaN(numeroIngresado== "e")) {
    // Si el valor ingresado no es un número
    alert("El valor ingresado no es válido. Por favor, ingrese un número entre 1 y 731.");
  }
  
      // SE HACE LA CONSULTA AJAX con EL VALOR DEL numero ingresado
  
      $.ajax({
        url: "https://superheroapi.com/api.php/4905856019427443/" + numeroIngresado,
        success: function (data) {
          let imagen = data.image.url;
          let nombre = data.name;
          let conexiones = data.connections["group-affiliation"];
          let publicado = data.biography.publisher;
          let ocupacion = data.work.occupation;
          let primeraAparicion = data.biography["first-appearance"];
          let altura = data.appearance.height;
          let peso = data.appearance.weight;
          let alias = data.biography.aliases;
          let poder = data.powerstats.intelligence;
  
          // SE CREA UNA VALIDACION PARA ALGUNOS DATOS QUE NO APARECEN EN EL REGISTRO
          if (ocupacion == "-") {
            ocupacion = "Sin ocupación conocida";
          }
          if (conexiones == "-") {
            conexiones = "Sin conexiones conocidas";
          }
          if (primeraAparicion == "-") {
            primeraAparicion = "No se tiene registro";
          }
          if (poder == "null"){
            alert ('Los datos de este héroe son nulos.\n NO SE MOSTRARAN ESTADISTICAS')
          }
  
          // SE INGRESAN LOS DATOS PARA LA TARJETA DEL SUPERHEROE
          $("#heroeDescripcion").html(`
          <div class="container">
            <div class="row bg-dark align-items-center">
              <div class="col-md-4 my-auto text-center">
                <img id="heroImg" src="${imagen}" class="img-fluid" alt="Imagen del héroe"/>
              </div>
              <div class="col-md-4">
                <div class="card-body text-white letrasCard">
                  <h5 class="card-text"><b>NOMBRE:</b></h5>
                  <h4 class="card-title fw-semibold text-danger"><b>${nombre}</b></h4>
                  <p class="card-text mt-5"><b>CONEXIONES:</b> ${conexiones}.</p>
                  <hr>
                  <p class="card-text"><b>FECHA DE PUBLICACIÓN:</b> ${publicado}.</p>
                  <hr>
                  <p class="card-text"><b>OCUPACIÓN:</b> ${ocupacion}.</p>
                  <hr>
                  <p class="card-text"><b>PRIMERA APARICIÓN:</b> ${primeraAparicion}.</p>
                  <hr>
                  <p class="card-text"><b>ALTURA:</b> ${altura}.</p>
                  <hr>
                  <p class="card-text"><b>PESO:</b> ${peso}.</p>
                  <hr>
                  <p class="card-text"><b>ALIAS:</b> ${alias}.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div id="heroTarjeta" style="height:550px; width: 100%"></div>
              </div>
            </div>
          </div>
          `);
          
  
          //  METODO push PARA INGRESAR DATOS EN LA ESTADISTICA DEL CHART DE CANVAS
  
          let estadisticas = [];
  
          estadisticas.push(
            { y: data.powerstats.intelligence, label: "Inteligencia" },
            { y: data.powerstats.strength, label: "Fuerza" },
            { y: data.powerstats.speed, label: "Velocidad" },
            { y: data.powerstats.durability, label: "Resistencia" },
            { y: data.powerstats.power, label: "Poder" },
            { y: data.powerstats.combat, label: "Combate" }
          );
  
          let apariencia = {
            theme: "dark2",
            animationEnabled: true,
            title: {
              text: `Estadísticas de Poder para ${data.name}`,
            },
            data: [
              {
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label} - {y}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: estadisticas,
              },
            ],
          };
          // RENDERIZAMOS Y ENVIAMOS LA INFO
          let chart = new CanvasJS.Chart("heroTarjeta", apariencia);
          chart.render();
        },
      });
    });
  });
  