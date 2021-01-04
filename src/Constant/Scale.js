import { Dimensions } from 'react-native';

const window = Dimensions.get('window')
// let WIDTH_DIMENSION = window.width > window.height ? window.height : window.width
// let HEIGHT_DIMENSION = window.width > window.height ? window.width : window.height
let WIDTH_DIMENSION = window.width;
let HEIGHT_DIMENSION = window.height;




const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

// export const WIDTH_DIMENSION = Dimensions.get('window').width;
// export const HEIGHT_DIMENSION = Dimensions.get('window').height;
const _widthScale = size => (size / guidelineBaseWidth) * WIDTH_DIMENSION
const _heightScale = size => (size / guidelineBaseHeight) * HEIGHT_DIMENSION

// window.width > window.height ? console.log(`Dai>Cao ${WIDTH_DIMENSION}`):console.log(`Dai<Cao ${WIDTH_DIMENSION}`)
// setInterval(() => {
//     console.log({WIDTH_DIMENSION});
    
// }, 500);


// export const _widthScale = (width) => {
//     return width / 375 * WIDTH_DIMENSION
// }

// export const _heightScale = (height) => {
//     return height / 812 * HEIGHT_DIMENSION
// }

export { _widthScale, _heightScale, WIDTH_DIMENSION, HEIGHT_DIMENSION }