/* eslint-disable react-hooks/exhaustive-deps */
// https://www.youtube.com/watch?v=PBrEq9Wd6_U&t=121s
import { useState, useEffect } from "react";
import bluePop from './images/blue-pop.png';
import greenPop from './images/green-pop.png';
import orangePop from './images/orange-pop.png';
import purplePop from './images/purple-pop.png';
import redPop from './images/red-pop.png';
import yellowPop from './images/yellow-pop.png';
import blank from './images/blank.png';


const width = 8;
const candyColors = [
  bluePop,
  greenPop,
  orangePop,
  purplePop,
  redPop,
  yellowPop
];

// functional expression. same as function App() {}
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);



  const checkForColumnOfFour = () => {
    // square with index 39 is the last square we have to check
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    // square with index 47 is the last square we have to check
    for (let i = 0; i < 64; i++) {
      //if on square 0, checks 3 squares following
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];

      // the last three squares of each column should not be checked, since they will never make a row of 4
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      
      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    // square with index 47 is the last square we have to check
    for (let i = 0; i <= 47; i++) {
      //if on square 0, checks square 8 and 16. i.e. the two squares below square 0
      const columnOfThree = [i, i + width, i + width * 2];
      //grabs first color
      const decidedColor = currentColorArrangement[i];

      //check if each number has the same color
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        // replaces color with empty string
        columnOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    // square with index 47 is the last square we have to check
    for (let i = 0; i < 64; i++) {
      //if on square 0, checks 2 squares following
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];

      // the last two squares of each column should not be checked, since they will never make a row of 3
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      
      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArrangement[square] = blank)
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for(let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i);
      
      // if square in first row is blank, fill with random color
      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      // if the square below the square we are looping equals nothing
      if ((currentColorArrangement[i + width]) === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  }

  const dragEnd = (e) => {
    //get id for square being relaced + square being dragged
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'));
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'));

    //swaps the square being replaced & dragged 
    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    // only able to swap squares that are next to each other
    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId);

    //check is where square is going is a column/row of 3/4
    //will save whatever the boolean returns as
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if(squareBeingReplacedId && 
      validMove && 
      ( isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
        //resetting
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      } else {
        //changing color back
        currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
        //setting to new current color arrangement
        setCurrentColorArrangement([...currentColorArrangement])
      }
  }

  const createBoard = () => {
    //create an array of 64 random colors
    const randomColorArrangement = [];
    for (let i = 0; i <width * width; i++) {
      const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNumberFrom0to5];

      randomColorArrangement.push(randomColor);
    }
    //sets the random colors to state
    setCurrentColorArrangement(randomColorArrangement);
  }

  // lets createBoard only get called once
  useEffect(()=> {
    createBoard();
  }, []);


  useEffect(() => {
    //check board every 100 ms
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      //spread operator splits out array
      setCurrentColorArrangement([...currentColorArrangement])
    }, 75)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])
  
  // console.log(currentColorArrangement);


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
