window.onload = function() {
    !function() {
        var counter = 0,
            player1 = document.getElementById('player1'),
            player2 = document.getElementById('player2'),
            boxesList = document.getElementById('js-boxes'),
            startBtn = document.getElementById('js-start-btn'),
            newGameBtn = document.getElementById('js-new-game-btn'),
            startScrn = document.getElementById('js-start'),
            board = document.getElementById('js-board'),
            finishScrn = document.getElementById('finish'),
            message = document.getElementById('message');

        // If all of the squares are filled and no players have three in a row, the game is a tie.
        function isTie() {
            var playerOneBoxes = document.querySelectorAll('.box.box-filled-1'),
                playerTwoBoxes = document.querySelectorAll('.box.box-filled-2');

            console.log(playerOneBoxes.length);
            console.log(playerTwoBoxes.length);

            if (playerOneBoxes.length + playerTwoBoxes.length === 9) {
                finishGame(false);
                emptyBoard();
            }
        }

        // Hide the board, show the finish screen with the message the word "Winner" or the phrase "It's a Tie!"
        function finishGame(winner) {
            // Add the appropriate class to the winning screen
            if (winner === 'box-filled-1') {
                finishScrn.classList.add('screen-win-one');
                message.innerHTML = 'Winner!';
            } else if (winner === 'box-filled-2') {
                finishScrn.classList.add('screen-win-two');
                message.innerHTML = 'Winner!';
            } else {
                finishScrn.classList.add('screen-win-tie');
                message.innerHTML = "It's a Tie!";
            }
            // Hide the board
            board.classList.remove('show');
            board.classList.add('hide');
            // Show the finish screen
            finishScrn.classList.remove('hide');
            finishScrn.classList.add('show');
        }

        function emptyBoard() {
            for (var i = 0; i < boxesList.children.length; i++) {
                // Remove all classes on the boxes besides the default
                boxesList.children[i].classList = 'box';
                boxesList.children[i].style.backgroundColor = ''; // Setting to an empty value sets it back to the default value
                boxesList.children[i].style.backgroundImage = '';
                boxesList.children[i].style.pointerEvents = '';
            }
        }

        function switchPlayer() {
            if (player1.classList.contains('active')) {
                player1.classList.remove('active');
                player2.classList.add('active');
            } else { // Switch to player one
                player2.classList.remove('active')
                player1.classList.add('active');
            }
        }

        // Check to see if a player has won a row, column, or diag
        // muti-case switch statement
        function whoWon(player) {
            switch (true) {
                case boxesList.children[0].classList.contains(player) && boxesList.children[1].classList.contains(player) && boxesList.children[2].classList.contains(player):
                case boxesList.children[0].classList.contains(player) && boxesList.children[3].classList.contains(player) && boxesList.children[6].classList.contains(player):
                case boxesList.children[0].classList.contains(player) && boxesList.children[4].classList.contains(player) && boxesList.children[8].classList.contains(player):
                case boxesList.children[1].classList.contains(player) && boxesList.children[4].classList.contains(player) && boxesList.children[7].classList.contains(player):
                case boxesList.children[2].classList.contains(player) && boxesList.children[5].classList.contains(player) && boxesList.children[8].classList.contains(player):
                case boxesList.children[3].classList.contains(player) && boxesList.children[4].classList.contains(player) && boxesList.children[5].classList.contains(player):
                case boxesList.children[2].classList.contains(player) && boxesList.children[4].classList.contains(player) && boxesList.children[6].classList.contains(player):
                case boxesList.children[6].classList.contains(player) && boxesList.children[7].classList.contains(player) && boxesList.children[8].classList.contains(player):
                    finishGame(player);
                    emptyBoard();
                    break;
                default:
                    break;
            }
        }

        // Add listener to start button
        startBtn.addEventListener('click', function() {
            // Make start screen disapear
            startScrn.classList.remove('show');
            startScrn.classList.add('hide');

            // Show the board
            board.classList.remove('hide');
            board.classList.add('show');
        });

        // Add listener to new game button
        newGameBtn.addEventListener('click', function() {
            // Make finish screen disapear
            finishScrn.classList.remove('show');
            finishScrn.classList.add('hide');

            // Show the board
            board.classList.remove('hide');
            board.classList.add('show');
        });

        // add 'active' class to player1
        player1.classList.add('active');

        for (var i = 0; i < boxesList.children.length; i++) {
            // Show hover image of player's symbol, O or X
            boxesList.children[i].addEventListener('mouseover', function() {
                // Check to see which player is active
                if (!this.classList.contains('box-filled-1') && !this.classList.contains('box-filled-2')) {
                    if (player1.classList.contains('active')) {
                        // show 'o' img if player one is active
                        this.style.backgroundImage = "url('img/o.svg')";
                    } else {
                        // show 'x' img if player two is active
                        this.style.backgroundImage = "url('img/x.svg')";
                    }
                }
            });

            // When player stops hovering(mouses out) box, show the original styles of the box
            boxesList.children[i].addEventListener('mouseout', function() {
                // if the box isn't filled in by player one or player two
                if (!this.classList.contains('box-filled-1') && !this.classList.contains('box-filled-2')) {
                    this.style.backgroundColor = ''; // Setting to an empty value sets it back to the default value
                    this.style.backgroundImage = '';            }
            });

            // Add click event to boxes to fill in the box when clicked
            boxesList.children[i].addEventListener('click', function() {
                // Only fill in box if it's not already filled in, add box-filled-1 for player 1 and box-filled-2 for player 2
                if (player1.classList.contains('active') && !this.classList.contains('box-filled-1') && !this.classList.contains('box-filled-2')) {
                    this.classList.add('box-filled-1');
                } else {
                    this.classList.add('box-filled-2');
                }

                // Don't allow user to click same square twice
                this.style.pointerEvents = 'none';

                // Check if someone won
                if (player1.classList.contains('active')) {
                    var player = 'box-filled-1';
                    whoWon(player);
                } else if (player2.classList.contains('active')) {
                    player = 'box-filled-2';
                    whoWon(player);
                }
                isTie();
                switchPlayer();
            });
        }
    }();
} //onload
