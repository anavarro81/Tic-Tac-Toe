// Si estos son constantes la convención dice que lo hagamos en mayusculas SQUARES_BOARD. 
// Veo que este lo modificas, así que si es una variable squaresBoard seria lo correcto (camelCase)
// Separacion entre elementos, [0, 0, 0, 0] Normalmente esto lo hace de forma automatica eslint (Puedes descargarte el plugin y probarlo pero mejor que aprendas tu a mano estas cosas al principio) 
const squares_board = [0,0,0,0,0,0,0,0,0]
// Este si seria WINNING_COMBINATIONS
const winning_combinations = [ [0,1,2],
                                  [3,4,5],  
                                  [6,7,8],
                                  [0,3,6],
                                  [1,4,7],
                                  [2,5,8],
                                  [2,4,6],
                                  [0,4,8]
                              ]

// Tendria que mirar la docu para ver como no te salta un error al no declararlas con let/const/var, pero es mala practica no hacerlo igualmente 
squares_x = []
squares_O = []

// Sacaria este tipo de String a constantes
const TURN_X = 'turn_x'


// Bien sacadas las constantes, pero si son constantes la convencion es IMG_WINNER_X
const img_winner_x = '<img src="/img/Ganador_X.png" alt=""></img>'
const img_winner_O = '<img src="/img/Ganador_O.png" alt="No se encuentra imagen ganador X"></img>'
const img_tie = '<img src="/img/Empate.png" alt=""></img>'

const url_x = '<img src="img/ficha_x.png" alt=""> </img>'
const url_circle = '<img src="img/ficha_círculo.png" alt="">'
turn = 'turn_x'

games_x = 0
games_O = 0

// Al ser una función, usamos camelCase marcarSquare
const marcar_square = (id_square, square) => {

    if (squares_board[square] == 0) {              
        if (turn == TURN_X) {
            document.getElementById(id_square).innerHTML = url_x
            squares_x.push(square)
        }
        else {
            document.getElementById(id_square).innerHTML = url_circle
            squares_O.push(square)
        }
        // check the square, to avoid to be pressed again. 
        squares_board[square] = 1        
    }
   
    if (there_is_a_winner()) {                        
        document.getElementById('board').style.display = 'none'                                    //  hide the board
        document.getElementById('winner_screen').style.display =  'flex'                             //  show winner screen
        
        if (turn == 'turn_x') {
           games_x++; 
           document.getElementById('img-winner').innerHTML = img_winner_x                         // Show winner screen. 
           document.getElementById('score_x').innerHTML = games_x
        }else {
           games_O++ 
           document.getElementById('img-winner').innerHTML = img_winner_O
           document.getElementById('score_circle').innerHTML = games_O            
        }               
    
    }else if (!squares_board.includes(0)){        
        document.getElementById('board').style.display = 'none'
        document.getElementById('winner_screen').style.display =  'flex'
        document.getElementById('img-winner').innerHTML = img_tie
    }


}

// Al ser una función, usamos camelCase 
const check_squares = (square) => {
    let id_square = 'c' + square
    marcar_square (id_square, square)
    change_turn()
}

// Al ser una función, usamos camelCase
function change_turn () {

    // Cuando tenemos un if else y luego nada mas se puede eliminar el else y poner un return dentro del if

    // if (turn == 'turn_x') {
    //     turn = 'turn_circle'
    //     document.getElementById('score_x_wrap').classList.remove('active')
    //     document.getElementById('score_circle').classList.add('active')
    //     document.getElementById('lbl_turn').innerHTML = 'turn de O'
    //     return
    // }
    //     turn = 'turn_x';
    //     document.getElementById('score_circle').classList.remove('active')
    //     document.getElementById('score_x_wrap').classList.add('active')
    //     document.getElementById('lbl_turn').innerHTML = 'turn de X'       
    //
    

    // Aparte del if-else por el return fijate que hay codigo que se repite, con lo que los dos primero remove/add no dependen del turno, podrias hacerlos fuera del if/else   
    // Esta función se puede quedar bastante mas refactorizado, dale una vuelta.
    if (turn == 'turn_x') {
        turn = 'turn_circle'
        document.getElementById('score_x_wrap').classList.remove('active')
        document.getElementById('score_circle').classList.add('active')
        document.getElementById('lbl_turn').innerHTML = 'turn de O'
    } else {
        turn = 'turn_x';
        document.getElementById('score_circle').classList.remove('active')
        document.getElementById('score_x_wrap').classList.add('active')
        document.getElementById('lbl_turn').innerHTML = 'turn de X'       
    }
}

// Al ser una función, usamos camelCase marcarSquare
const there_is_a_winner = () => {

    // Evitamos usar for. Sin entrar mucho en el codigo, de momento cambialo por foreach, es mejor practica.
    for (let i = 0; i<winning_combinations.length; i++) {
        let counter_x = 0
        let counter_O = 0
        // En este caso no te queda otra que un for, pero seguro que se puede mejorar.
        for (let j=0; j<3; j++){          
            if ( squares_x.includes(winning_combinations[i][j])){
                counter_x++
            }                
            if (squares_O.includes(winning_combinations[i][j])){
                counter_O++                
            } 
            // Aqui puedes ahorrar el uso del if
            // recuerda, usa la comparación extricta === en lugar de ==
            // return counter_x  == 3 || counter_O == 3           
            if (counter_x  == 3 || counter_O == 3){                                
                return true
            }                    
        }
    }
    return false
}

// Al ser una función, usamos camelCase marcarSquare
const restart_game = () => {
    sessionStorage.setItem('games_x', games_x)
    sessionStorage.setItem('games_O', games_O)
    location.reload()
}

// Al ser una función, usamos camelCase marcarSquare
const score_container = () => {  
    
    // Esto se  podria mejorar de la siguiente  manera:
    // games_x = sessionStorage.getItem('games_x') || 0
    // Si es null se considera un falsy y obtendriamos el cero. Si es cero tambien es un falsy pero nos volvemos a quedar con el cero
    //  https://developer.mozilla.org/en-US/docs/Glossary/Falsy  
    // Esta función, su contenido, lo podrias dejar en 2 lineas literalmente.
    games_x = sessionStorage.getItem('games_x')
    games_O = sessionStorage.getItem('games_O')

    if (games_x == null) {
        games_x = 0
    }

    if (games_O == null) {
        games_O = 0
    }

    document.getElementById('score_x').innerHTML = games_x
    document.getElementById('marcado_O').innerHTML = games_O

}
