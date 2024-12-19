const baseURL = 'http://localhost:3030/jsonstore/orders/';
const loadOrdersBtn = document.getElementById('load-orders');
const orderBtn = document.getElementById('order-btn');
const editOrderBtn = document.getElementById('edit-order');
const listElement = document.getElementById('list');

const stockNameInput = document.getElementById('name');
const quantityInput = document.getElementById('quantity');
const dateInput = document.getElementById('date');

let currentId = null;

const loadOrders = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    listElement.innerHTML = '';

    Object.values(data).forEach(order => {
        const orderDiv = createOrderElement(order);
        listElement.appendChild(orderDiv);
    });
};
const createOrder = async () => {
    const stockName = stockNameInput.value.trim();
    const quantity = quantityInput.value.trim();
    const orderDate = dateInput.value.trim();

    if (!stockName || !quantity || !orderDate) {
        return;
    }

    const newOrder = { name: stockName, quantity, date: orderDate };

    const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
    });

    if (response.ok) {
        clearInputs();
        await loadOrders();
    } else {
        alert('Failed to create order. Please try again.');
    }
};

const editOrder = async () => {
    const stockName = stockNameInput.value.trim();
    const quantity = quantityInput.value.trim();
    const orderDate = dateInput.value.trim();

    if (!stockName || !quantity || !orderDate) {
        alert('All fields are required!');
        return;
    }

    const updatedOrder = { name: stockName, quantity, date: orderDate };

    const response = await fetch(`${baseURL}${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder),
    });

    if (response.ok) {
        clearInputs();
        currentId = null;
        orderButtons(true);
        await loadOrders();
    } else {
        alert('Failed to update order. Please try again.');
    }
};
const deleteOrder = async (id) => {
    const response = await fetch(`${baseURL}${id}`, { method: 'DELETE' });

    if (response.ok) {
        await loadOrders();
    } else {
        alert('Failed to delete order. Please try again.');
    }
};

const createOrderElement = (order) => {
    const container = document.createElement('div');
    container.className = 'container';

    const nameElement = document.createElement('h2');
    nameElement.textContent = order.name;

    const dateElement = document.createElement('h3');
    dateElement.textContent = order.date;

    const quantityElement = document.createElement('h3');
    quantityElement.textContent = order.quantity;

    const changeButton = document.createElement('button');
    changeButton.className = 'change-btn';
    changeButton.textContent = 'Change';
    changeButton.addEventListener('click', () => handleEditOrder(order));

    const doneButton = document.createElement('button');
    doneButton.className = 'done-btn';
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', () => deleteOrder(order._id));

    container.append(nameElement, dateElement, quantityElement, changeButton, doneButton);

    return container;
};
const handleEditOrder = (order) => {
    stockNameInput.value = order.name;
    quantityInput.value = order.quantity;
    dateInput.value = order.date;

    currentId = order._id;
    orderButtons(false);
};
const orderButtons = (isCreating) => {
    orderBtn.disabled = !isCreating;
    editOrderBtn.disabled = isCreating;
};
const clearInputs = () => {
    stockNameInput.value = '';
    quantityInput.value = '';
    dateInput.value = '';
};

loadOrdersBtn.addEventListener('click', loadOrders);
orderBtn.addEventListener('click', createOrder);
editOrderBtn.addEventListener('click', editOrder);
