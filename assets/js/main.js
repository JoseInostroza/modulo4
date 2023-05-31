const primerContenedor = $('.firstRow')
const segundoContenedor = $('.secondRow')
const tercerContenedor = $('.thirdRow')

function crearElemento(nombre, altura, peso, color){
    let elemento = `
    <div class="col-12 col-md-6 col-lg-4 ">
        <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
            <div class="timeline-icon" style="background-color: ${color};"><i class="fa fa-address-card" aria-hidden="true"></i></div>
            <div class="timeline-text">
                <h6>${nombre}</h6>
                <p>Altura: ${altura} Peso: ${peso}</p>
            </div>
        </div>
    </div>`
    return elemento
}

let obtenerPersonaje = (id) => {
    return new Promise ( async (resolve) => {
        /**
         * obtenerData retorna una nueva promise, donde: 
         * - asyncronamente hace fetch a 2 apis con el mismo id
         * - formates la data a json
         * - resuelve la promesa retornando un array con la data de la foto y el post del ID
         */
        try {
            let urlPersonaje = `https://swapi.dev/api/people/${id}`;
            let respPersonaje = await fetch(urlPersonaje);
            let personaje = await respPersonaje.json()
            resolve ([personaje.name, personaje.height, personaje.mass])
        }
        catch (error) {
            console.error('Ocurrió un error:', error);
        }
    })
}

async function* crearPersonaje(id,contenedor,color){
    while(true){
        data = await obtenerPersonaje(id)
        carta = crearElemento(data[0],data[1],data[2],color)
        contenedor.append(carta);
        yield console.log("Card Renderizado");
    }
} 

$(()=>{
    const primerGatillo = $('#generar1')
    const segundoGatillo = $('#generar2')
    const tercerGatillo = $('#generar3')
    let contador = {'seccionUno': 1, 'seccionDos': 6, 'seccionTres':12}
    primerGatillo.on({
        mouseover: ()=>{
            if(contador.seccionUno === 6){
                primerGatillo.off()
                console.log('No hay mas personajes de esta seccion');
            }else{
                crearPersonaje(contador.seccionUno, primerContenedor, 'salmon').next()
                contador.seccionUno +=1
            }
            
        }
    })
    segundoGatillo.on({
        mouseover: ()=>{
            if(contador.seccionDos === 11){
                segundoGatillo.off()
                console.log('No hay mas personajes de esta seccion');
            }else{
                crearPersonaje(contador.seccionDos, segundoContenedor, 'lightgreen').next()
                contador.seccionDos +=1
            }
            
        }
    })
    tercerGatillo.on({
        mouseover: ()=>{
            if(contador.seccionTres === 17){
                tercerGatillo.off()
                console.log('No hay mas personajes de esta seccion');
            }else{
                crearPersonaje(contador.seccionTres, tercerContenedor, 'lightskyblue').next()
                contador.seccionTres +=1
            }
            
        }
    })
}
)