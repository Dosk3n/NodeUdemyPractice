const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);

// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

console.log(data.name);
console.log(data.planet);
console.log(data.age);

data.name = "Dean";
data.planet = "Mars";
data.age = 34;

jsonString = JSON.stringify(data);
fs.writeFileSync('1-json.json', jsonString);
