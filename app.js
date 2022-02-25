document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28 x 28 = 784 squares
    let score = 0

    //layout of grid and what is in the squares
    //Legends
    // 0 for PAC dots
    // 1 for wall
    // 2 for ghost lair
    // 3 for power pellet
    // 4 for empty
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = []

// draw the grid and render it
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div')
            grid.appendChild(square) //put square in my grid
            squares.push(square) //pushing new created square into new array called squares

        // add layout styling after squares array has been created
        if (layout[i] === 0) { // I want to go into new squares array find the same item in it and
            // add the class name of pac-dot etc.
            squares[i].classList.add('pac-dot')
        } else if (layout[i] === 1) {
            squares[i].classList.add('wall')
        } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
        } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
        }
        }
    }
createBoard()

// starting position of pac-man

    let pacmanCurrentIndex = 490
   // I go into squares array and assigned to the 490th item in array classList of pacman
    squares[pacmanCurrentIndex].classList.add('pac-man')

    // move pac-man
    function movePacman(e) {
        squares[pacmanCurrentIndex].classList.remove('pac-man')

        switch(e.keyCode) {

            case 37:
        // number of divs divided by 28 and its 0 then it is border
                if  (pacmanCurrentIndex % width !== 0
                    && !squares[pacmanCurrentIndex -1].classList.contains('wall')
                    && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair'))
                    pacmanCurrentIndex -= 1

                // check if pacman is in the exit
                if((pacmanCurrentIndex - 1) === 363) {
                    pacmanCurrentIndex = 391
                }
        break
            case 38:
        // current index must be larger than width - top border
                if  (pacmanCurrentIndex - width >= 0
                    && !squares[pacmanCurrentIndex -width].classList.contains('wall')
                    && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair'))
                    pacmanCurrentIndex -= width
        break
            case 39:
        // reminder must be smaller than 27, right border
                if  (pacmanCurrentIndex % width < width - 1
                    && !squares[pacmanCurrentIndex +1].classList.contains('wall')
                    && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair'))
                    pacmanCurrentIndex += 1

                // check if pacman is in the exit
                if((pacmanCurrentIndex + 1) === 392) {
                    pacmanCurrentIndex = 364
                }
        break
            case 40:
                if  (pacmanCurrentIndex + width < width * width
                    && !squares[pacmanCurrentIndex +width].classList.contains('wall')
                    && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair'))
                    pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')

        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
}
    document.addEventListener('keyup', movePacman)

    // what happens when pac-man eats a pac-dot
    // when pac-man is in the div that contains pac-dots add 1 to the score
    function pacDotEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
        }
    }

    //ghost goes scared when pac-man eats power-pellet
    function powerPelletEaten() {
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
            score += 10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unScareGhosts, 10000)
            squares[pacmanCurrentIndex].classList.remove('power-pellet')
        }
    }

    //make ghost stop being scared
    function unScareGhosts() {
        ghosts.forEach(ghost => ghost.isScared = false)
    }


    // Ghost template
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    let ghosts = [
        new Ghost('blinky', 348, 250),
        new Ghost('pinky', 376, 400),
        new Ghost('inky', 351, 300),
        new Ghost('clyde', 379, 500)
    ]

    // draw my ghost onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })

    //move ALL ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    //the function to move the ghost
    function moveGhost(ghost) {
        const directions = [-1, 1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function() {
        // if the next square ghost is going into does not contain a wall and a ghost, he can go there
        // else find new direction to try
        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
        // remove all ghost classes in current position
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //change the currentIndex to the new safe square
            ghost.currentIndex += direction
        //redraw the ghost in the new safe space
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

            } else direction = directions[Math.floor(Math.random() * directions.length)]

            //if ghost is currently scared
        if (ghost.isScared === true) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
            }
        // if pac-man runs into scared ghost - destroy ghost
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            }
            checkForGameOver()
        }, ghost.speed)
    }

// check for game over

    function checkForGameOver() {
        if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId)) //ghosts stop moving
            document.removeEventListener('keyup', movePacman)
            setTimeout(function() {
                alert('Game Over!')
            }, 500)

        }
    }
// check for the win
    function checkForWin() {
        if (score === 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId)) //ghosts stop moving
            document.removeEventListener('keyup', movePacman)
            setTimeout(function() {
                alert('YOU WIN!')
            }, 500)
        }
    }
})