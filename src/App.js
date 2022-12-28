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
