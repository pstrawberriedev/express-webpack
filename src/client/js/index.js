import $ from 'wetfish-basic';

$('html').on('click', (e) => console.log('clicked teh html'));

const testArr = ['personal space', 'personal space', 'personal space'];
let counter = 0;
for (let value of testArr) {
  counter ++;
  console.log(counter + ' ' + value);
};
