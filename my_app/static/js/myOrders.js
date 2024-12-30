

const o1 = document.getElementById('price1');
const o2 = document.getElementById('price2');
const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const totalCost = document.querySelector('.Total-cost')

const product1 = parseFloat(o1.textContent);
const product2 = parseFloat(o2.textContent);
const quantity1 = parseFloat(q1.textContent);
const quantity2 = parseFloat(q2.textContent);

const total = product1*quantity1 + product2*quantity2;
totalCost.textContent= `Total cost: ${total}$`;
