import { useState, useEffect } from "react";

const width = 8;
const candyColors = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
];


// functional expression. same as function App() {}
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);

  const checkForColumnOfFour = () => {
    // square with index 39 is the last square we have to check
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = () => {
    // square with index 47 is the last square we have to check
    for (let i = 0; i < 47; i++) {
      //if on square 0, checks square 8 and 16. i.e. the two squares below square 0
      const columnOfThree = [i, i + width, i + width * 2];
      //grabs first color
      const decidedColor = currentColorArrangement[i];

      //check if each number has the same color
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {
        // replaces color with empty string
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  };


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
      checkForColumnOfThree();
      checkForRowOfThree();
      checkForRowOfFour();
      //spread operator splits out array
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, checkForRowOfFour, currentColorArrangement])
  
  console.log(currentColorArrangement);


  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
