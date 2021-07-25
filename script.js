// Todo en ingles
// Separamos en funciones
// Respetamos espacios e identaciones
// Uso correcto de const y let por encima de var
// Depraceted ; y el porque

// Repositirio
// Git
// Github
// Commit
// pull
// push


// Tienes que instalar git en la consola de comando y configurarlo.
// Una vez que hagas git en la consola y te lo reconozca.
// git clone urldelrepo
// En la carpeta que te crea, mueves los archivos del 3 en raya
// git add .
// git commit -m 'First commit'
// git push


// Trabajar en ramas
// git checkout -B nombre-de-la-rama

// Nombres de las variables autodescriptivas
// Javascript ES6, Vue, React, Node + Mongo + Express
// Css, preprocesadores sass
// https://100dayscss.com/
// Box model - Padding - Margin - Border
// https://www.codewars.com/
// https://github.com/curso-programacion-dcasas/dia-2-arrays-funciones
// Frontend masters --> https://frontendmasters.com/
// https://flexboxfroggy.com/#es
// https://codepip.com/games/grid-garden/
// https://twitter.com/jen4web
// https://www.jenkramer.org/#courses

// https://www.getmanfred.com/ofertas-empleo

// "Proyecto de fin de carrera"

// Aplicar buenas practicas en este juego del 3 en raya.

// Enumerarme cuales son las buenas practicas.



var casillas_tablero = [0,0,0,0,0,0,0,0,0];
const combinaciones_ganadoras = [ [0,1,2],
                                  [3,4,5],  
                                  [6,7,8],
                                  [0,3,6],
                                  [1,4,7],
                                  [2,5,8],
                                  [2,4,6],
                                  [0,4,8]
                              ];

casillas_x = [];
casillas_O = [];

const img_ganador_x = '<img src="/img/Ganador_X.png" alt=""></img>';
const img_ganador_O = '<img src="/img/Ganador_O.png" alt="No se encuentra imagen ganador X"></img>';
const img_empate = '<img src="/img/Empate.png" alt=""></img>';

const url_x = '<img src="img/ficha_x.png" alt=""> </img>';
const url_circulo = '<img src="img/ficha_círculo.png" alt="">';
turno = 'turno_x';

partidas_x = 0;
partidas_O = 0;

function validar_casilla(casilla) {

    var id_casilla = 'c' + casilla;

    marcar_casilla (id_casilla, casilla);
    
    cambiar_turno();
    
}

function marcar_casilla (id_casilla, casilla) {



    if (casillas_tablero[casilla] == 0) {
        
        
        if (turno == 'turno_x') {
            document.getElementById(id_casilla).innerHTML = url_x;
            casillas_x.push(casilla);
        }
        else {
            document.getElementById(id_casilla).innerHTML = url_circulo;
            casillas_O.push(casilla);
        }

        // Marcamos la casilla para que no se pueda volver a pulsar.
        casillas_tablero[casilla] = 1
        
    }

   
    if (hay_ganador()) {

        
                   
        document.getElementById('tablero').style.display = 'none';                                    //  Oculta el tablero de juego. 
        document.getElementById('winner_screen').style.display =  'flex';                             //  Muestra la pantalla del ganador.  
        
        if (turno == 'turno_x') {
           partidas_x++; 
           document.getElementById('img-ganador').innerHTML = img_ganador_x;                         // Muestra la pantalla de quien ha ganado. 
           document.getElementById('marcador_x').innerHTML = partidas_x;
        }else {
           partidas_O++; 
           document.getElementById('img-ganador').innerHTML = img_ganador_O;
           document.getElementById('marcador_circulo').innerHTML = partidas_O; 
           
        }               
    
    }else if (!casillas_tablero.includes(0)){
        console.log('emplate');
        document.getElementById('tablero').style.display = 'none';
        document.getElementById('winner_screen').style.display =  'flex';
        document.getElementById('img-ganador').innerHTML = img_empate;
    }

    
}

function cambiar_turno () {

    
    if (turno == 'turno_x') {
        turno = 'turno_circulo';
        document.getElementById('marcador_x_wrap').classList.remove('activo');
        document.getElementById('marcador_circulo').classList.add('activo');
        document.getElementById('lbl_turno').innerHTML = 'Turno de O'
    }
    else {
        turno = 'turno_x';
        document.getElementById('marcador_circulo').classList.remove('activo');
        document.getElementById('marcador_x_wrap').classList.add('activo');
        document.getElementById('lbl_turno').innerHTML = 'Turno de X'
       
    }
    

}


function hay_ganador(){



    console.log('hay ganador')
    console.log('casillas x: ' + casillas_x);
    console.log('casillas O: ' + casillas_O);
    console.log('long combinaciones = ' + combinaciones_ganadoras.length);

    for (var i = 0; i<combinaciones_ganadoras.length; i++) {

        var contador_x = 0;
        var contador_O = 0;

        for (var j=0; j<3; j++){

            

            if ( casillas_x.includes(combinaciones_ganadoras[i][j])){
                contador_x++;
            }
                
            if (casillas_O.includes(combinaciones_ganadoras[i][j])){
                contador_O++;
                console.log('> numero de o = ' + combinaciones_ganadoras[i][j]);
            }
            
            if (contador_x  == 3 || contador_O == 3){
                console.log('hay ganador');
                
                return true;
            }
                    
        }
    }

return false;
}

function reiniciar_partida() {
    sessionStorage.setItem('partidas_x', partidas_x);
    sessionStorage.setItem('partidas_O', partidas_O);
    location.reload();


}

function cargar_marcador () {
    
    partidas_x = sessionStorage.getItem('partidas_x');
    partidas_O = sessionStorage.getItem('partidas_O');

    if (partidas_x == null) {
        partidas_x = 0;
    }

    if (partidas_O == null) {
        partidas_O = 0;
    }

    document.getElementById('marcador_x').innerHTML = partidas_x;
    document.getElementById('marcado_O').innerHTML = partidas_O;

    

}


