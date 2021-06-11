let guardian;//alamcena el tutor que se esta intentando dar de alta en la plataforma

//guarda los tipos de calles con los nombres que se le dan en la BD, tiene todos los posibles que hay actualmente en la misma
let viatypes= new Map();
viatypes.set("CL","Calle");
viatypes.set("AV","Avenida");
viatypes.set("CJ","Callejón");
viatypes.set("BL","Bulevar");
viatypes.set("CA","Camino");

//Objeto que guarda las características de un determinado usuario y las cuales se van a utilizar a lo largo de este scipt
function Guardian(codigo,username,password,dni,nombre,apellidos,nacimiento,tipovia,nombrevia,numerovia,piso,letra,cp,ciudad,email,numero,acuerdoprivacidad,terminos,newsletter,activado,imagen){
    this.codigo=codigo;
    this.username=username;
    this.password=password;
    this.dni=dni;
    this.nombre=nombre;
    this.apellidos=apellidos;
    this.nacimiento=nacimiento;
    this.tipovia=tipovia,
    this.nombrevia=nombrevia,
    this.numerovia=numerovia,
    this.piso=piso,
    this.letra=letra,
    this.cp=cp,
    this.ciudad=ciudad,
    this.email=email;
    this.numero=numero;
    this.acuerdoprivacidad=acuerdoprivacidad;
    this.terminos=terminos;
    this.newsletter=newsletter;
    this.activado=activado;
    this.imagen=imagen;
}

$(function(){ 
    /**Se muestra y oculta el modal según el boton pulsado */
    $("#toregister").click(function(){
        $("#registerModal").show();
    })

    $("#close-modal").click(function(){
        $("#registerModal").hide();
    })
    //con esta función se buscará el código del usuario para así obtener los datos y que se muestren
    $('#id_code').keyup(function() {
      let code=$(this).val();
      if(code=="" || code.length<10){
          cleaninputs();
      }
      if(code.length==10){
          $.ajax({
              url:'/users/guardiandetails',
              method:"GET",
              data:{"code":code},
              dataType:'json',
              success:function(data){
                    console.log(data);
                  //en caso de que el usuario no exista se realiza lo siguiente
                  if(data.guardian=="" && data.user==""){
                      document.getElementById("id_code").value="";
                      createalert("El usuario con ese código no existe.");
                      cleaninputs();
                  }else{
                      let jsonGuardian=JSON.parse(data.guardian); //guarda los datos especificos de la tabla guardian
                      let jsonUser=JSON.parse(data.user); //guarda los datos especificos de la tabla user
                    
                  //establezco guardian de tipo Guardian para poder acceder más facilmente a los datos que debe de
                  //tener el tutor de los alumnos
                      guardian=new Guardian(
                          jsonGuardian[0].pk,
                          jsonUser[0].fields.username,
                          jsonUser[0].fields.password,
                          jsonGuardian[0].fields.dni,
                          jsonUser[0].fields.first_name,
                          jsonUser[0].fields.last_name,
                          jsonGuardian[0].fields.birth_date,
                          jsonGuardian[0].fields.via_type,
                          jsonGuardian[0].fields.via_name,
                          jsonGuardian[0].fields.via_number,
                          jsonGuardian[0].fields.address_floor,
                          jsonGuardian[0].fields.floor_letter,
                          jsonGuardian[0].fields.cp,
                          jsonGuardian[0].fields.city,
                          jsonUser[0].fields.email,
                          jsonGuardian[0].fields.phone,
                          jsonGuardian[0].fields.privacity,
                          jsonGuardian[0].fields.terms,
                          jsonGuardian[0].fields.newsletter,
                          jsonGuardian[0].fields.activated,
                          jsonGuardian[0].fields.image
                          );
                        
                          if (guardian.activado=="No"){
                              guardian.activado="no";
                          }else{
                              guardian.activado="si";
                          }

                          if(guardian.activado=="si"){
                              document.getElementById("id_code").value="";
                              createalert("El usuario con ese código ya está activado.");
                              cleaninputs();
                          }
                          else{
                              /**Muestra de datos en el formulario */
                              document.getElementById('id_dni').value=guardian.dni.toUpperCase();
                              document.getElementById('name').value=guardian.nombre;
                              document.getElementById('username').value=guardian.username;
                              document.getElementById('last_name').value=guardian.apellidos;
                              document.getElementById('id_birthdate').value=guardian.nacimiento;
                              document.getElementById("id_viatype").selected=viatypes.get(guardian.tipovia);
                              document.getElementById("id_vianame").value=guardian.nombrevia;
                              document.getElementById("id_vianumber").value=guardian.numerovia;
                              document.getElementById("id_floor").value=guardian.piso;
                              document.getElementById("id_letter").value=guardian.letra;
                              document.getElementById("id_cp").value=guardian.cp;
                              document.getElementById("id_city").value=guardian.ciudad;
                              document.getElementById('id_phonenumber').value=guardian.numero;
                            //   document.getElementById('email').value=guardian.value;
          
                          }
                  
                      }
              },
              failure:function(data){
                  createalert("Se ha producido un error durante la operación.");
              }
          })
      }
    });
  });



function createalert(text){
    let divalerta=document.getElementById("alerta");
   document.getElementById("message").textContent=text;  
   document.getElementById('pagetitle').scrollIntoView();
   divalerta.style="display:block;border: 3px solid black;text-align: center;width: 85.5%;height:70px;margin: auto;border-radius: 10px;background-color: #FAA81D;font-weight: 800;margin-bottom:5%" ;           
        setTimeout(() => {
          divalerta.style="display:none";
        }, 5000);
}

//validación de la contraseña y su repetición
function validatepasswords(){
    let password=document.getElementById("password");
    let repetition=document.getElementById("passwordrepetition");
    if(password.length!=repetition.length || password.value!=repetition.value){
        createalert("Las contraseñas introducidas no coinciden. Inténtelo de nuevo");
        document.getElementById('pagetitle').scrollIntoView(); //para que vaya a mostrar el mensaje
        password.value="";
        repetition.value="";
    }
}

//limpieza de los inputs del formulario
function cleaninputs(){
    document.querySelectorAll("input").forEach(input => {
        if(input.getAttribute("id")!="id_code"){
            input.value="";
        }    
    });
}

