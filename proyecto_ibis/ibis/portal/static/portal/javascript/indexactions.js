
  // months: Lista que guarda los meses del año para compararlos con el que devuelve la fecha numéricamente
  const months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  let eventslist; 
  let eventsdisplayed=0;

// //Esta variable almacenará todas las noticias que se rescaten de la base de datos para poder manejarlas y cargar las anteriores o las posteriores
let newslist; 
// //contador de las noticias totales que se están mostrando
let newsdisplayed=0;

$(document).ready(function(){
//     //En esta petición se piden los tres primeros eventos que haya en la base de datos, en caso de que haya se crea el elemento
//     //donde se visualiza y en caso contrario se muestra una alerta
    $.ajax({
        url: '/getevents',
        method: 'GET',
        dataType: 'json',
        success: function (data){
            //json: Paso los eventos que se han recibido a un JSON para así manejarlos más facilmente
          

            let jsonEvents=JSON.parse(data.events); //se le
            eventslist=jsonEvents;
            //en caso de que no haya eventos se va mostrar un mensaje
            if(jsonEvents.length==0){
                document.getElementById("see-more__events").style="display:none";
                createAlert("alertEvent");
            }else{
                //En caso de que haya eventos:
                //Para cada elemento se va a crear el contenedor donde se muestran todos los datos y se va a hacer que 
                //se muestre en pantalla
                let eventscounter=0;
                //Si hay más de tres eventos se cargan tres y cuando a los que habia se le han sumado 3
                //se sale del bucle
                if(jsonEvents.length>3){
                    while(true){
                        let actualevent=jsonEvents[eventscounter];
                        createEvent(actualevent);
                        eventscounter++;
                        eventsdisplayed++;
                        if(eventscounter==3){
                            break
                        }
                    }
                    /*En caso de que los eventos restantes esten entre 1-3, se van a cargar todos los que hay 
                    y cuando se llegue al final se deshabilitará el botón de carga */
                }else if(jsonEvents.length>=1 && jsonEvents.length<=3){
                    document.getElementById("charge-events").style="display:none";
                    for(element of jsonEvents){
                        createEvent(element)
                    }

                }
            }

        },
        failure: function(data){
            console.log("failure");
            console.log(data);
        }
    });
    /*Se hace una petición al servidor para rescatar todas las noticias:
         -Si NO hay noticias -> Se informa de ello
         -Si hay más de 6 noticias -> Se cogen las primeras
         -Si hay entre 1 y 5 noticias -> Se cogen TODAS */
         $.ajax({
            url:'/getnews',
            method: 'GET',
            dataType: 'json',
            success: function (data){
                //Paso de lo recibido a JSON para facilitar el manejo
                //Se le da la vuelta para que aparezcan los más recientes primeros
                let jsonNews=JSON.parse(data.news).reverse(); 
                newslist=jsonNews;  //Se cargan los datos en la lista
               
                if(jsonNews.length==0){
                    document.getElementById("charge-news").style="display:none";
                    createAlert("alertNews");
                }else{
                   let newscounter=0; //contador de noticias que se han procesado
                    if(jsonNews.length>6){
                        while(true){
                            let actualnew=jsonNews[newscounter];
                            createNew(actualnew);
                            newscounter++; //se pasa a la siguiente noticia aumentando el contador
                            newsdisplayed++; //se suma una noticia al total de las mostradas en la web
                            //Cuando se hayan procesado 6 noticias se para
                            if(newscounter==6){
                               break;
                            }
                       }
                   }  
                   else if(jsonNews.length>=1 && jsonNews.length<=6){
                       document.getElementById("charge-news").style="display:none";
                       for(element of jsonNews){
                           createNew(element);
                       }
                   }     
            }
        },
            failure:function(data){
                console.log("failure");
                console.log(data);
            }
        });

});

/*Esta función toma la lista en la que se han cargado los eventos y el contador de todas los eventos
que se están mostrando en la página.
Se comienza procesando el evento que ocupa el lugar en el que se han dejado de procesar las anteriores
Se suma uno a las evento mostradas y cuando hay 3 más, se termina */
function chargeEvents(){
    let auxcont=eventsdisplayed;
    if(eventslist.length-eventsdisplayed>3){
        while(true){
            createEvent(eventslist[eventsdisplayed]);
            eventsdisplayed++;
            if(eventsdisplayed==auxcont+3){
                break
            }
        }
    }
    else if(eventslist.length-eventsdisplayed<=3){
        for(let i=eventsdisplayed;i<=eventslist.length-1;i++){
            createEvent(eventslist[i]);
            eventsdisplayed++;
        }
    }
}

/*Esta función toma la lista en la que se han cargado todas las noticias y el contador de todas las noticias
que se están mostrando en la página.
Se comienza procesando la noticia que ocupa el lugar en el que se han dejado de procesar las anteriores
Se suma uno a las noticias mostradas y cuando hay 6 más, se termina */

function chargeNews(){
    console.log(newsdisplayed);
    let auxcont=newsdisplayed;
    if(newslist.length-newsdisplayed>6){
        while(true){
            createNew(newslist[newsdisplayed]);
            newsdisplayed++;
            if(newsdisplayed==auxcont+6){
                break
            }
        }
    }
    else if(newslist.length-newsdisplayed<=6){
        for(let i=newsdisplayed;i<=newslist.length-1;i++){
            createNew(newslist[i]);
            newsdisplayed++;
        }
        document.getElementById("charge-news").style="display:none";
    }

}


/*Crea la parte visual del evento */
function createEvent(element){
    let container=document.createElement("div");
    container.className="event-container";
    let date=new Date(element.fields.date);
                    
    let containerdate=document.createElement("div");
    containerdate.className="date";

    let spanday=document.createElement("span");
    spanday.className="date-day";
    spanday.textContent=date.getDate();
    let linebreak=document.createElement("br");

                    

    let spanmonth=document.createElement("span");
    spanmonth.className="date-month";
    spanmonth.textContent=months[date.getMonth()]+"/"+date.getFullYear(); //se coge el mes que corresponde en la lista de meses declarada

    containerdate.appendChild(spanday);
    containerdate.appendChild(linebreak);
    containerdate.appendChild(spanmonth);
    container.appendChild(containerdate);

    let containerdescription=document.createElement("div");
    containerdescription.className="event";
    let descriptiontext=document.createElement("p");
    descriptiontext.textContent=element.fields.Description;

    containerdescription.appendChild(descriptiontext);
    container.appendChild(containerdescription);

    document.getElementById("event-container").appendChild(container);
}

//Se va a ir creando el elemento que muestra la noticia en pantalla
function createNew(element){

    // Se crea el div que contiene toda la noticia
    let containernew=document.createElement("div");
    containernew.id=element.fields.title;

    //Se crea el contenedor que va a tener el título de la noticia
    let containertitle=document.createElement("div");//                 <div class="new-title"> containertitle
        containertitle.className="new-title";
        //titulo de la noticia
        let newtitle=document.createElement("h3");//                     <h3>{{new.title}}</h3>       newtitle  
        newtitle.textContent=element.fields.title;
                    
        containertitle.appendChild(newtitle);
        containernew.appendChild(containertitle);
                    
        let containerdescription=document.createElement("div");
        containerdescription.className="new-description";
        containerdescription.id=element.fields.title;

        let description=document.createElement("div");
        description.className="description";
        let text=document.createElement("a");
        text.href="details/"+element.pk;
        text.textContent=element.fields.subtitle;
        text.className="new-description-text";
        description.appendChild(text);


        let wrapperimg=document.createElement("div");
        wrapperimg.className="wrapperimg";
        let principalimg=document.createElement("img");
        principalimg.alt=element.fields.title;
        principalimg.className="new-img";
        principalimg.src="/media/"+element.fields.media1;
        wrapperimg.appendChild(principalimg);

        containerdescription.appendChild(description);
        containerdescription.appendChild(wrapperimg);

                    
        containernew.appendChild(containerdescription);
        document.getElementById("news-container").appendChild(containernew);
}
//muestra la alerta cuando no hay ningún elemento, eventos en este caso
function createAlert(divToShow){
    let notElementsWarn=document.getElementById(divToShow);
    notElementsWarn.style.display="block";
}





     






