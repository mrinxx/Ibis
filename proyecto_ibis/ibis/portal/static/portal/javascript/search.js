$(function(){
    /*Cuando se pulse el boton de cerrar el cuadro de búsqueda */
    $("#close").click(function(){
        document.getElementById("searchbar").style.display="none";
        document.getElementById("search").value="";
        document.getElementById("content-news").innerHTML="";
        document.getElementById("content-events").innerHTML="";
    })
    /*Esta función realiza el proceso de busqueda. Cada vez que se pulse algo en el teclado, 
    se llamará a esta petición, la cual llamará a una URL que le devolverá un listado de 
    noticias y eventos que coincidan con la búsqueda*/
    $("#search").keyup(function(){
        
        document.getElementById("content-news").innerHTML="";
        document.getElementById("content-events").innerHTML="";
        let value=$(this).val();
        if(value!=""){
        $.ajax({
            url: '/search',
            method: 'GET',
            dataType: 'json',
            data:{
                'toSearch':value
            },
            success:function(data){
                
                const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
                let dataEvents=JSON.parse(data.events).reverse(); //eventos de más próximos a menos
                let dataNews=JSON.parse(data.news).reverse();
                
                //creación de la noticia en la barra de búsqueda
                dataNews.forEach(New => {
                    let newlink= document.createElement("a");
                    let linkparagraph=document.createElement("p");

                    newlink.textContent=New.fields.title;
                    newlink.href="news/details/"+New.pk;
                    linkparagraph.appendChild(newlink);
                    linkparagraph.className="found";
                    document.getElementById("content-news").appendChild(linkparagraph);
                    

                });
                //Creación de los eventos en la barra de busqueda
                dataEvents.forEach(Event => {
                    let eventparagraph=document.createElement("p");
                    let datespan=document.createElement("span");
                    let date=new Date(Event.fields.date);
                    datespan.textContent=date.getDate()+" de "+months[date.getMonth()]+" del "+date.getFullYear();
                    let description=document.createElement("span");
                    description.textContent=Event.fields.Description;
                    eventparagraph.textContent=datespan.textContent+" "+description.textContent;
                    eventparagraph.className="found";
                    document.getElementById("content-events").appendChild(eventparagraph);
                });


            },
            error:function(data){
                console.log("error")
                console.log(data)
            }
        })

    }})
})