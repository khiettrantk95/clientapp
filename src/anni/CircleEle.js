import {React, useCallback, useState} from "react";
import ReactPlayer from 'react-player/youtube';

import images from "./Images";
import TextCircle from "./TextCircle";

const videos = [
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/shorts/loY5-1Qm3aw',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE',
    'https://www.youtube.com/watch?v=oB2vlGfk5bE'
];

const CircleEle = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(-1);
    const [playedVideoCount, setPlayedVideoCount] = useState(0);
    const [playedVideoNumbers, setPlayedVideoNumbers] = useState([]);

    const handleMouseMove = useCallback((event) => {
        let x = event.clientX/2;
        let y = event.clientY;
        let slider = document.getElementsByClassName('slider');
        slider[0].style.transform = 'perspective(1000px) rotateY('+x+'deg) rotateZ(-'+y+'deg)';
    });

    const onEndedPlay = () => {
        if (!playedVideoNumbers.includes(selectedNumber)) {
            setPlayedVideoNumbers([...playedVideoNumbers, selectedNumber]);
            let count = playedVideoCount+1;
            setPlayedVideoCount(count);
        }
        setSelectedNumber(-1);

    };

    const onPressMouse = () => {
        console.log('on double click');
        if (!isPressed) 
        {
            setIsPressed(true);
            window.addEventListener('mousemove', handleMouseMove);
        }
        else 
        {
            setIsPressed(false);
            // todo: make remove work - root cause: not same function
            window.removeEventListener('mousemove', handleMouseMove);
        }  
    };

    const chooseImage = (index) => {
        setSelectedNumber(index);
    };

    return (
        <div>
            <div className="main-screen-player">
                {selectedNumber !== -1 && 
                <ReactPlayer 
                    key={selectedNumber}
                    url={videos[selectedNumber]}
                    width='100%'
                    height='100%'
                    light={images[selectedNumber]}
                    controls={true}
                    onEnded={onEndedPlay}
                />}
            </div>
            <TextCircle />
            {/* {(playedVideoCount < 9) && <div className={'slider ' + (isPressed ? 'pressed-mouse' : 'auto-scroll')} 
                onDoubleClick={onPressMouse} 
            >
                {images.map((img, index) => (
                    <span
                        key={index} 
                        style={{"--i": +(index).toString()}} 
                        onClick={()=>chooseImage(index)}
                    >
                        <img src={img} alt={img}/>
                    </span>
                ))}
            </div>} */}
        </div>  
	);
}

export default CircleEle;
