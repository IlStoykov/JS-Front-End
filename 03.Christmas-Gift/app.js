const baseUrl = 'http://localhost:3030/jsonstore/gifts';
const loadPresentsBtn = document.getElementById('load-presents');
const giftListElement = document.getElementById('gift-list');
const addPresentBtn = document.getElementById('add-present');

const giftInputField = document.getElementById('gift');
const forInputFieeld = document.getElementById('for');
const priceInputField = document.getElementById('price');



const loadPresentsFunction = async ()=>{
    response = await fetch(baseUrl),
    data = await response.json();
    giftListElement.innerHTML = '';

    for(gift of Object.values(data)){
        const changeBtn = document.createElement('button');
        changeBtn.classList.add('change-btn');
        changeBtn.textContent = 'Change';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons-container');
        buttonContainer.appendChild(deleteBtn);
        buttonContainer.appendChild(changeBtn);

        pGiftElement = document.createElement('p');
        pGiftElement.textContent = `${gift.gift}`;

        pForElement = document.createElement('p');
        pForElement.textContent = `${gift.for}`;

        pPriceElement = document.createElement('p');
        pPriceElement.textContent = `${gift.price}`;

        const oneGiftElement = document.createElement('div');
        oneGiftElement.classList.add('content');
        oneGiftElement.appendChild(pGiftElement);
        oneGiftElement.appendChild(pForElement);
        oneGiftElement.appendChild(pPriceElement);

        const holeGiftElement = document.createElement('div');
        holeGiftElement.classList.add('gift-sock');
        holeGiftElement.appendChild(buttonContainer);
        holeGiftElement.appendChild(oneGiftElement);

        giftListElement.appendChild(holeGiftElement);
    }
};

loadPresentsBtn.addEventListener('click', loadPresentsFunction);
addPresentBtn.addEventListener('click', async ()=>{
    const newPresent = {
        gift: giftInputField.value,
        for: forInputFieeld.value,
        price: priceInputField.value,
    };
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newPresent),
    });
    if(!response.ok){
        return;
    }
    await loadPresentsFunction();
    clearFields();
});

function clearFields(){
    return (giftInputField.value = '', forInputFieeld.value = '', priceInputField.value = '');
};
