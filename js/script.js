const squares_board = [0,0,0,0,0,0,0,0,0]
const winning_combinations = [ [0,1,2],
                                  [3,4,5],  
                                  [6,7,8],
                                  [0,3,6],
                                  [1,4,7],
                                  [2,5,8],
                                  [2,4,6],
                                  [0,4,8]
                              ]


squares_x = []
squares_O = []

const TURN_X = 'turn_x'

const img_winner_x = '<img src="/img/Ganador_X.png" alt=""></img>'
const img_winner_O = '<img src="/img/Ganador_O.png" alt="No se encuentra imagen ganador X"></img>'
const img_tie = '<img src="/img/Empate.png" alt=""></img>'

const url_x = '<img src="img/ficha_x.png" alt=""> </img>'
const url_circle = '<img src="img/ficha_círculo.png" alt="">'
turn = 'turn_x'

games_x = 0
games_O = 0

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

const check_squares = (square) => {
    let id_square = 'c' + square
    marcar_square (id_square, square)
    change_turn()
}

function change_turn () {
    
    if (turn == 'turn_x') {
        turn = 'turn_circle'
        document.getElementById('score_x_wrap').classList.remove('active')
        document.getElementById('score_circle').classList.add('active')
        document.getElementById('lbl_turn').innerHTML = 'turn de O'
    }
    else {
        turn = 'turn_x';
        document.getElementById('score_circle').classList.remove('active')
        document.getElementById('score_x_wrap').classList.add('active')
        document.getElementById('lbl_turn').innerHTML = 'turn de X'       
    }
}

const there_is_a_winner = () => {

    for (let i = 0; i<winning_combinations.length; i++) {
        let counter_x = 0
        let counter_O = 0
        for (let j=0; j<3; j++){          
            if ( squares_x.includes(winning_combinations[i][j])){
                counter_x++
            }                
            if (squares_O.includes(winning_combinations[i][j])){
                counter_O++                
            }            
            if (counter_x  == 3 || counter_O == 3){                                
                return true
            }                    
        }
    }
    return false
}


const restart_game = () => {
    sessionStorage.setItem('games_x', games_x)
    sessionStorage.setItem('games_O', games_O)
    location.reload()
}

const score_container = () => {    
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
