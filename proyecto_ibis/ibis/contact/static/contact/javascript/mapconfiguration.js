
// Con esta función se inicializará y se añadirá el mapa a la página
function initMap() {
    //Pongo como localización el punto donde está la escuela, en este caso utilizaré la del instituto
    const location = { lat: 36.51298086326767, lng: -6.274760740702732 }; 
    //Creo el mapa con centro en la localización anterior y con un zoom de 18 , es decir, que se vea cerca
    const map = new google.maps.Map(document.getElementById("contact-zone__map"), {zoom: 18,center: location,});
    //Se crea el marcador del mapa, el cual se colocará justo encima de la localización creada en el mapa creado
    const marker = new google.maps.Marker({position: location,map: map,});
}
