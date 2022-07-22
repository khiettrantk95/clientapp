import React, { useState, useRef, createContext } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "./chess";


const Home = ({ boardWidth }) => {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());

    const [moveFrom, setMoveFrom] = useState('');

    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});

    const safeGameMutate = modify => {
    	setGame(g => {
            const update = { ...g };
            modify(update);
            return update;
        });
  	};

    const getMoveOptions = (square) => {
        let moves = game.moves({
            square,
            verbose: true
        });
        if (moves.length === 0) {
            return;
        }

        let newSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) && game.get(move.to).color !== game.get(square).color
                    ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%'
                    : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%',
                borderRadius: '50%'
            };
            return move;
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0 ,0.4)'
        };
        setOptionSquares(newSquares);
    }

    const makeRandomMove = () => {
        const possibleMoves = game.moves();
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
            return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
    }

    const onSquareClick = (square) => {
        setRightClickedSquares({});

        const resetFirstMove = () => {
            setMoveFrom(square);
            getMoveOptions(square);
        };

        if (!moveFrom) {
            resetFirstMove(square);
            return;
        }

        // attempt to make move
        let gameCopy = {...game };
        let move = gameCopy.move({
            from: moveFrom,
            to: square,
            promotion: 'q' // always promote to a queen
        });
        setGame(gameCopy);

        // if invalid, setMoveFrom and getMoveOptions
        if (move === null) {
            resetFirstMove(square);
            return;
        }

        setTimeout(makeRandomMove, 300);
        setMoveFrom('');
        setOptionSquares({});
    }

    const onSquareRightClick = (square) => {
        let colour = 'rgba(0, 0, 255, 0.4)';
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] && rightClickedSquares[square.backgroundColor === colour ]
                    ? undefined
                    : { backgroundColor : colour }
        });
    }

    const onDrop = (sourceSquare, targetSquare) => {
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q", // always promote to a queen for example simplicity
            });
        });
        if (move === null) return false; // illegal move
        setTimeout(makeRandomMove, 200);
        return true;
    }

    return (
        <div>
            <Chessboard 
                id="chessBoard" 
                animationDuration={200}
                arePiecesDraggable={true} // could support both?
                boardWidth={boardWidth}
                position={game.fen()}
                onSquareClick={onSquareClick} 
                onSquareRightClick={onSquareRightClick}
                onPieceDrop={onDrop}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                customSquareStyles={{
                    ...moveSquares,
                    ...optionSquares,
                    ...rightClickedSquares
                }}
                ref={chessboardRef}
            />
            <button
                className="rc-button"
                onClick={() => {
                    safeGameMutate((game) => {
                        game.reset();
                    });
                    chessboardRef.current.clearPromoves();
                    setMoveSquares({});
                    setRightClickedSquares({});
                }}
            >
                reset
            </button>
            <button
                className="rc-button"
                onClick={() => {
                safeGameMutate((game) => {
                    game.undo();
                });
                chessboardRef.current.clearPremoves();
                setMoveSquares({});
                }}
            >
                undo
            </button>
        </div>
    )
}

export default Home;