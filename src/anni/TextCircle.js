import {React, useState} from "react";

const TEXT = "_W_I_L_L_Y_O_U_M_A_R_R_Y_M_E_?"

const TextCircle = () => {
    return (
        <div className={'text-circle'} >
            {TEXT.split("").map((text, index) => (
                <div
                    key={index} 
                    className={"char" + (text === '_' ? " hidd" : "")}
                    style={{"--t": +(index).toString()}} 
                >{text}</div>
            ))}
        </div>
    );

};

export default TextCircle;