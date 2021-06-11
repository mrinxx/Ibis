function Teacher(etapa,username,password,dni,nombre,apellidos,nacimiento,tipovia,nombrevia,numerovia,piso,letra,cp,ciudad,email){
    this.etapa=etapa;
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
}


let elementbutton=document.getElementById("edit-personal-data");

$(function(){ 
    $("#passwordchanger").click(function(){
        $("#passwordModal").show();
    })

    $("#close-modal").click(function(){
        $("#passwordModal").hide();
    })

    $('#form-inputs').find('input, select').attr('disabled',true);


    

    $.ajax({
        url:'/users/teacherdetails',
        method:"GET",
        data:{},
        dataType:'json',
        success:function(data){          
            let jsonTeacher=JSON.parse(data.teacher); //guarda los datos especificos de la tabla guardian
            let jsonUser=JSON.parse(data.user); //guarda los datos especificos de la tabla user
              
            //establezco guardian de tipo Guardian para poder acceder más facilmente a los datos que debe de
            //tener el tutor de los alumnos
                teacher=new Teacher(
                    jsonTeacher[0].pk,
                    jsonUser[0].fields.username,
                    jsonUser[0].fields.password,
                    jsonTeacher[0].fields.dni,
                    jsonUser[0].fields.first_name,
                    jsonUser[0].fields.last_name,
                    jsonTeacher[0].fields.birth_date,
                    jsonTeacher[0].fields.via_type,
                    jsonTeacher[0].fields.via_name,
                    jsonTeacher[0].fields.via_number,
                    jsonTeacher[0].fields.address_floor,
                    jsonTeacher[0].fields.floor_letter,
                    jsonTeacher[0].fields.cp,
                    jsonTeacher[0].fields.city,
                    jsonUser[0].fields.email,
                    );
                       document.getElementById('id_birthdate').value=teacher.nacimiento;
                        document.getElementById("id_viatype").selected=teacher.viatipo;
                        document.getElementById("id_vianame").value=teacher.nombrevia;
                        document.getElementById("id_vianumber").value=teacher.numerovia;
                        document.getElementById("id_floor").value=teacher.piso;
                        document.getElementById("id_letter").value=teacher.letra;
                        document.getElementById("id_cp").value=teacher.cp;
                        document.getElementById("id_city").value=teacher.ciudad;          
            },
        failure:function(data){
            createalert("Se ha producido un error durante la operación.");
        }
})
})

function enabledataedition(){  
    document.getElementById("clickerformdata").style.display="block";
    document.getElementById("editor-closer").style.display="block";
    $('#form-inputs').find('input, select').attr('disabled',false);
}

function disabledataedition(){
    document.getElementById("clickerformdata").style.display="none";
    document.getElementById("editor-closer").style.display="none";
    $('#form-inputs').find('input, select').attr('disabled',true);
}
