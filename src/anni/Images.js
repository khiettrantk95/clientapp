function getImagePaths(directory) {
    let images = [];
    directory.keys().map((item, index) => images.push(item.replace("./", "")));
    return images;
}

const directory = require.context("./images", false, /\.(png|jpe?g|svg)$/);
let imagePaths = getImagePaths(directory);

let images = [];
imagePaths.map((path) => {
    images.push(require("./images/" + path));
});

export default images;
