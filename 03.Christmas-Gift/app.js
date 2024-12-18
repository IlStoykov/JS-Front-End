const baseUrl = 'http://localhost:3030/jsonstore/gifts';
const loadPresentsBtn = document.getElementById('load-presents');
const giftListElement = document.getElementById('gift-list');
const addPresentBtn = document.getElementById('add-present');
const editPresentBtn = document.getElementById('edit-present');

const giftInputField = document.getElementById('gift');
const forInputFieeld = document.getElementById('for');
const priceInputField = document.getElementById('price');

let currentId = null;

const loadPresentsFunction = async ()=>{
    const response = await fetch(baseUrl),
    const data = await response.json();
    giftListElement.innerHTML = '';

    for(gift of Object.values(data)){
        const changeBtn = document.createElement('button');
        changeBtn.classList.add('change-btn');
        changeBtn.textContent = 'Change';

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';

        // add event Listner for change Btn
        attachChangeListener(changeBtn, gift);

        // add event Listener for delete Btn

        deleteBtn.addEventListener('click', async () => {
            await fetch(`${baseUrl}/${gift._id}`, {method: 'DELETE'});
            await loadPresentsFunction();
        });

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
//Change Btn Function descrip

const attachChangeListener = (changeBtn, gift) => {
    changeBtn.addEventListener('click', ()=>{
        giftInputField.value = gift.gift;
        forInputFieeld.value = gift.for;
        priceInputField.value = gift.price;

        editPresentBtn.disabled = false;
        addPresentBtn.disabled = true;

        currentId = gift._id;
    })
};

//Edit present functionality
editPresentBtn.addEventListener('click', async () => {
    const updatedGift = {
        gift: giftInputField.value.trim(),
        for: forInputFieeld.value.trim(),
        price: priceInputField.trim()
    };
    if(!giftInputField || !forInputFieeld || !priceInputField){
        alert('All fields are rquired!');
        return;
    };
    // sent PUT request
    await fetch(`${baseUrl}/${currentId}`,{
        method: 'PUT',
        headers:{'content-type': 'application/json'},
        method: JSON.stringify(updatedGift)
    });
    //reload presents and cler firlds
    await loadPresentsFunction();
    clearFields();
})

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
        alert('All fields are required!');  
        return;
    }
    await loadPresentsFunction();
    clearFields();
});

function clearFields(){
    return (giftInputField.value = '', forInputFieeld.value = '', priceInputField.value = '');
};
