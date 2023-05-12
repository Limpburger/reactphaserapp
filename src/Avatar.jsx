import React, {useState, useRef} from "react";
import './App.css';

import { ReactComponent as head1 } from './img/head1.svg';
import { ReactComponent as head2 } from './img/head2.svg';
import { ReactComponent as head3 } from './img/head3.svg';

import { ReactComponent as chest1 } from './img/chest1.svg';
import { ReactComponent as chest2 } from './img/chest2.svg';
import { ReactComponent as chest3 } from './img/chest3.svg';

import { ReactComponent as legs1 } from './img/legs1.svg';
import { ReactComponent as legs2 } from './img/legs2.svg';
import { ReactComponent as legs3 } from './img/legs3.svg';

import { ReactComponent as shoes1 } from './img/shoes1.svg';
import { ReactComponent as shoes2 } from './img/shoes2.svg';
import { ReactComponent as shoes3 } from './img/shoes3.svg';

import { saveAs } from 'file-saver';

import { ChromePicker } from 'react-color';




function CharacterCreator(){
    const headArray = [head1, head2, head3];
    const chestArray = [chest1, chest2, chest3];
    const legsArray = [legs1, legs2, legs3];
    const shoesArray = [shoes1, shoes2, shoes3];

    //charcustom
    //const [customizeChar, setCustomizeChar] = useState(false);

    const [currentHeadIndex, setCurrentHeadIndex] = useState(0);
    const [currentChestIndex, setCurrentChestIndex] = useState(0);
    const [currentLegsIndex, setCurrentLegsIndex] = useState(0);
    const [currentShoesIndex, setCurrentShoesIndex] = useState(0);

  
    const CurrentHead = headArray[currentHeadIndex];
    const CurrentChest = chestArray[currentChestIndex];
    const CurrentLegs = legsArray[currentLegsIndex];
    const CurrentShoes = shoesArray[currentShoesIndex];

    const [currentCharacter, setCurrentCharacter] = useState(null);

    //const test = document.getElementById("style91");
  

    //console.log(test);
    // const testclass = test.style.fill = "cls-1";
    // console.log(testclass);


    // Define the color options
const colors = [
  '#FF0000', // red
  '#00FF00', // green
  '#0000FF', // blue
];

const [selectedColor, setSelectedColor] = useState(colors[0]);

// Component for each color option
const ColorOption = ({ color, setSelectedColor }) => {
  const handleClick = () => {
    setSelectedColor(color);
  };

  return (
    <div
      style={{ backgroundColor: color, width: '50px', height: '50px' }}
      onClick={handleClick}
    />
  );
};

  function DrawingArea() {
    const [color, setColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);
  
    function handleDrawingClick(event) {
      event.target.style.fill = color;
  }

  function handleColorChange(newColor) {
      setColor(newColor.hex);
  }

  function handleColorPickerClose() {
      setShowColorPicker(false);
  }
  
    return (
      <div id="svgContainer">
        <svg id="drawing" onClick={handleDrawingClick}>
          <CurrentChest/>
          <CurrentHead />
          <CurrentLegs/>
          <CurrentShoes/>
        </svg>
        <div className="colorPicker">
                <button onClick={() => setShowColorPicker(!showColorPicker)}>Choose a color</button>
                {showColorPicker ? (
                    <ChromePicker color={color} onChange={handleColorChange} onClose={handleColorPickerClose} />
                ) : null}
            </div>
      </div>
    );
  }
  

  console.log(currentHeadIndex, currentChestIndex, currentLegsIndex, currentShoesIndex, currentCharacter);

    return(
        
        <div className="character-creator">
            <div className="grid-controls">
                <button className="grid-item" onClick={() => setCurrentHeadIndex((currentHeadIndex + 1) % headArray.length)}>head</button>
                <button className="grid-item" onClick={() => setCurrentChestIndex((currentChestIndex + 1) % chestArray.length)}>chest</button>
                <button className="grid-item" onClick={() => setCurrentLegsIndex((currentLegsIndex + 1) % legsArray.length)}>legs</button>
                <button className="grid-item" onClick={() => setCurrentShoesIndex((currentShoesIndex + 1) % shoesArray.length)}>shoes</button>
                </div>
                
            <DrawingArea/>
        </div>
    );
}



export default CharacterCreator;