'use strict'

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;
document.getElementById('date').textContent = currentDate;


const getData = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setData = (dataBank) => localStorage.setItem('todoList', JSON.stringify(dataBank));

function createItem (name, status, index) {
    const item = document.createElement('label');
    item.classList.add('marketList');
    item.id='item'; item.className='item';
    item.innerHTML = `
    <label class="container">
    <input type="checkbox" ${status} dataIndex=${index}>
    <span class="checkmark"></span>
    </label>
    <div> ${name} </div>
    <input type="button" value="x" dataIndex=${index}>
    `
    document.getElementById('marketList').appendChild(item);
}

const clearTasks = () => {
    const marketlist = document.getElementById('marketList');
    while (marketlist.firstChild) {
        marketlist.removeChild(marketlist.lastChild);
    };
}

const displayUpdate = () => {
    clearTasks();
    const dataBank = getData();
    dataBank.forEach((item, index)=> createItem (item.name, item.status, index));
}

const addItem = (event) => {
    const key = event.key;
    const dataBank = getData();
    if (key == 'Enter' && !event.shiftKey) {
        dataBank.push ({'name' : event.target.value, 'status' : ''});
        event.target.value = '';
        setData(dataBank);
        displayUpdate();
    } else if (key == 'Enter' && event.shiftKey) {
        dataBank.push ({'name' : event.target.value, 'status' : 'checked'});
        event.target.value = '';
        setData(dataBank);
        displayUpdate();
    }
};
const removeItem = (index) => {
    const dataBank =getData();
    dataBank.splice(index,1);
    setData(dataBank);
    displayUpdate();
}
const itemUpdate = (index) => {
    const dataBank =getData();
    dataBank[index].status = dataBank[index].status === '' ? 'checked': '';
    setData(dataBank);
    displayUpdate();
};
const clickItem = (event) => {
    const element = event.target;
    if (element.type == 'button') {
        const index = element.dataset.index; 
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        itemUpdate(index);
    }
};

document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('marketList').addEventListener('click', clickItem);

displayUpdate();