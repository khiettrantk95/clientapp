import React from "react";

const Image = (index, img) => {
    
    return (
		<img key={index} src={img} alt={img} />
	);
}

export default Image;
