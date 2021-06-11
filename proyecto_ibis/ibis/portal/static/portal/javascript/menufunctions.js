
/*Muestra la barra de búsqueda */
function search(){
    document.getElementById("searchbar").style.display="block";
}

$(function(){ 
/*Muestra el menu de navegación en pantallas pequeñas */
$("#min-menu-navegacion_icon__link").click(function(){
    let menu=document.getElementById('min_menu');
    if(menu.style.display=="none"){
        menu.style.display="block";
    }else{
        menu.style.display="none";
    }
})
})

/* "Modo oscuro" */
function darkMode(){
    //Se produce el cambio de iconos y función en el elemento de cambio de modo
    let headericon=document.getElementById("dark-icon");
    headericon.className='far fa-sun';
    headericon.onclick = function() {lightMode()};

    let headericonmin=document.getElementById("min-dark-icon");
    headericonmin.className='far fa-sun';
    headericonmin.onclick=function() {lightMode()};

    //cambio de headers
    let headers1=document.getElementsByTagName("h1");
    for(headers of headers1){
        headers.style="color:#F9F9F8";
    }

    let headers2=document.getElementsByTagName("h2");
    for(headers of headers2){
        headers.style="color:#F9F9F8";
    }

    //cambio de enlaces
    let listlinks=document.getElementsByTagName("a");
    for(item of listlinks){
        item.style="color:#F9F9F8"
    }
    let listicons=document.getElementsByTagName("i");
    for(item of listicons){
        item.style="color:black"
    }
    //cambio de iconos
    document.getElementById("search-icon").style="color:#F9F9F8";
    document.getElementById("min-search-icon").style="color:#F9F9F8"
    document.getElementById("min-dark-icon").style="color:#F9F9F8"
    document.getElementById("dark-icon").style="color:#F9F9F8"
    document.getElementById("min-menu-icon").style="color:#F9F9F8"
    let listmybuttons=document.getElementsByClassName("see-more");
    for(item of listmybuttons){
        item.style="color:black"
    }

    document.getElementById("zona-logo-max").style="background-color:#333533";
    document.getElementById("zona-logo-min").style="background-color:#333533";
    document.body.style.backgroundColor="#333533";
    document.getElementById("max-menu-navegacion").style="background-color:#202020;color:#F9F9F8";
    document.querySelector('footer').style ="background-color:#202020;color:#F9F9F8";
    document.getElementById('footer-max_social-media').style="color:black";
    let eventsdisplay=document.getElementsByClassName('event');
    for(part of eventsdisplay){
        part.style="background-color:#202020;color:#F9F9F8";
    }
}

/*"Modo claro" */
function lightMode(){
    let headericon=document.getElementById("dark-icon");
    headericon.className='far fa-moon';
    headericon.onclick= function() {darkMode()};

    let headericonmin=document.getElementById("min-dark-icon");
    headericonmin.className='far fa-moon';
    headericonmin.onclick=function() {darkMode()};

    document.getElementById("dark-icon").style="display:inline-block";
    document.getElementById("zona-logo-max").style="background-color:#FAA81D";
    document.getElementById("zona-logo-min").style="background-color:#F9F9F8";
    document.getElementById("max-menu-navegacion").style="background-color:#FFC267";
    document.querySelector('footer').style ="background-color:##FAA81D;color:black";
    let eventsdisplay=document.getElementsByClassName('event');
    for(part of eventsdisplay){
        part.style="background-color:#F9F9F8;color:black";
    }
    document.body.style="background-color:#F9F9F8";

    let listlinkstolight=document.getElementsByTagName("a");
    for(item of listlinkstolight){
        item.style="color:black"
    }

    let headers1tolight=document.getElementsByTagName("h1");
    for(headers of headers1tolight){
        headers.style="color:black";
    }

    let headers2tolight=document.getElementsByTagName("h2");
    for(headers of headers2tolight){
        headers.style="color:black";
    }

    let listmybuttons=document.getElementsByClassName("see-more");
    for(item of listmybuttons){
        item.style="color:black"
    }
    

    let listicons=document.getElementsByTagName("i");
    for(item of listicons){
        item.style="color:black"
    }

    document.getElementById("min-menu-icon").style="color:#F9F9F8"
}   

