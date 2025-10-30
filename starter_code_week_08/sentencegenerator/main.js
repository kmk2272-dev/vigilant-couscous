console.log('this works!');
let noun =["dog","nigga","swigga","pigga"];
let verb =["yeet","heat","beat","sweet"];
let adjective = ["small","wiggery","piggery","large"];

let nouns = noun[Math.floor(Math.random()*noun.length)];
let verbs = verb[Math.floor(Math.random()*verb.length)];
let adjectives = adjective[Math.floor(Math.random()*adjective.length)];

let sentence_1=`The ${nouns} leaps ${adjectives} when I ${verbs} a rainbow in the sky.`;

console.log(sentence_1);

let myElement = document.getElementById('special')
console.log(myElement);
