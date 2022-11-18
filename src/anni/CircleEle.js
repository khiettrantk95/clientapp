import {React, useCallback, useState} from "react";
import ReactPlayer from 'react-player/youtube';

import images from "./Images";
import TextCircle from "./TextCircle";

const videos = [
    'https://www.youtube.com/shorts/oz3qL5g1i0Y',
    'https://www.youtube.com/shorts/cVrRK1IRkQU',
    'https://www.youtube.com/shorts/pS08B3B9S8g',
    'https://www.youtube.com/shorts/lJlQYet8QT8',
    'https://www.youtube.com/shorts/GVNjdycmdHk',
    'https://www.youtube.com/shorts/eOR-BbA_6Ak',
    'https://www.youtube.com/shorts/2000jLe8AAQ',
    'https://www.youtube.com/shorts/_WyvgSCn4GQ',
    'https://www.youtube.com/shorts/tDdbMo37erA',
    'https://www.youtube.com/shorts/oNJiDtUNtFQ'
];

const CircleEle = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(-1);
    const [playedVideoCount, setPlayedVideoCount] = useState(0);
    const [playedVideoNumbers, setPlayedVideoNumbers] = useState([]);
    const [isLastVideoPlayed, setIsLastVideoPlayed] = useState(false);

    const handleMouseMove = useCallback((event) => {
        let x = event.clientX/2;
        let y = event.clientY;
        let slider = document.getElementsByClassName('slider');
        slider[0].style.transform = 'perspective(1000px) rotateY('+x+'deg) rotateZ(-'+y+'deg)';
    });

    const onEndedPlayFinal = () => {
        setIsLastVideoPlayed(true);
    };

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
            window.removeEventListener('mousemove', handleMouseMove);
        }  
    };

    const chooseImage = (index) => {
        setSelectedNumber(index);
    };

    return (
        <div>
            {(!isLastVideoPlayed && playedVideoCount>=9) && 
            <div className="main-screen-player">
                <ReactPlayer 
                    key={9}
                    url={videos[9]}
                    width='100%'
                    height='100%'
                    light={images[9]}
                    controls={true}
                    onEnded={onEndedPlayFinal}
                />
            </div>}
            {selectedNumber !== -1 && 
            <div className="main-screen-player">
                <ReactPlayer 
                    key={selectedNumber}
                    url={videos[selectedNumber]}
                    width='100%'
                    height='100%'
                    light={images[selectedNumber]}
                    controls={true}
                    onEnded={onEndedPlay}
                />
            </div>}
            {(playedVideoCount < 9) && <div className={'slider ' + (isPressed ? 'pressed-mouse' : 'auto-scroll')} 
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
            </div>}
            {(playedVideoCount>=9 && isLastVideoPlayed) && <TextCircle />}
        </div>  
	);
}

export default CircleEle;
