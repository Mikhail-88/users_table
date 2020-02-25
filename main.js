'use strict';

const users = [
  {
    "_id": "5d220b10e8265cc978e2586b",
    "isActive": true,
    "balance": 2853.33,
    "age": 20,
    "name": "Buckner Osborne",
    "gender": "male",
    "company": "EMPIRICA",
    "email": "bucknerosborne@empirica.com",
    "phone": "+1 (850) 411-2997",
    "registered": "2018-08-13T04:28:45 -03:00",
		"nestedField": { total: 300 }
  },
  {
    "_id": "5d220b10144ef972f6c2b332",
    "isActive": true,
    "balance": 1464.63,
    "age": 38,
    "name": "Rosalie Smith",
    "gender": "female",
    "company": "KATAKANA",
    "email": "rosaliesmith@katakana.com",
    "phone": "+1 (943) 463-2496",
    "registered": "2016-12-09T05:15:34 -02:00",
		"nestedField": { total: 400 }
  },
  {
    "_id": "5d220b1083a0494655cdecf6",
    "isActive": false,
    "balance": 2823.39,
    "age": 40,
    "name": "Estrada Davenport",
    "gender": "male",
    "company": "EBIDCO",
    "email": "estradadavenport@ebidco.com",
    "phone": "+1 (890) 461-2088",
    "registered": "2016-03-04T03:36:38 -02:00",
		"nestedField": { total: 200 }
  }
];

const tableSchema = {
  index: '#',
  name: 'Name',
  email: 'Email',
  balance: 'Balance',
};

function creatThead(tableSchema) {
  const thead = document.createElement('thead');
  const tr = creatTr(tableSchema, 'th');

  thead.appendChild(tr);

  return thead;
}

function creatTr(tableSchema, tagName = 'td') {
  const tr = document.createElement('tr');

  Object.values(tableSchema).forEach(val => {
    const td = document.createElement(tagName);

    td.textContent = val;
    tr.appendChild(td);
  });

  return tr;
}

function creatTbody(tableSchema, items) {
  const tbody = document.createElement('tbody');

  items.forEach((item, index) => {
    item.index = index + 1;
    const itemSchema = creatItemsSchema(tableSchema, item);
    const tr = creatTr(itemSchema, 'td');
    
    tbody.appendChild(tr);
  });

  return tbody;
}

function creatItemsSchema(tableSchema, item) {
  const itemsSchema = Object.keys(tableSchema).reduce((acc, key) => {
    if (key in item) {
      acc[key] = item[key];
    }

    return acc;
  }, {});

  return itemsSchema;
}

function creatTableTemplate() {
  const table = document.createElement('table');

  table.classList.add('table');

  return table;
}

function totalBalance(tableSchema, items) {
  const total = items.reduce((acc, item) => acc + parseFloat(item.balance), 0);
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  const columnCount = Object.keys(tableSchema).length;

  td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b>`);
  td.setAttribute('colspan', columnCount);
  td.setAttribute('align', 'right');
  tr.appendChild(td);

  return tr;
}

function initTable(tableSchema, items) {
  const container = document.querySelector('.table-container');
  const table = creatTableTemplate();
  const header = creatThead(tableSchema);
  const body = creatTbody(tableSchema, items);
  const total = totalBalance(tableSchema, items);

  table.appendChild(header);
  table.appendChild(body);
  table.appendChild(total);
  container.appendChild(table);
  container.insertAdjacentHTML('beforeend', `
    <button type="button" class="btn btn-primary">Sort</button>
  `);
}

initTable(tableSchema, users);

const table = document.querySelector('.table');
const bodyRows = table.tBodies[0].rows;
const button = document.querySelector('.btn');
let count = 0;

button.addEventListener('click', () => {
  const filtered = [ ...bodyRows ];

  filtered.sort((a, b) => {
    const aValue = a.cells[3].innerHTML;
    const bValue = b.cells[3].innerHTML;

    return +aValue - +bValue;
  });
    
  if (count % 2 === 0) {
    filtered.reverse();
  }

  for (const tr of filtered) {
    table.tBodies[0].append(tr);
  }

  count++;
});