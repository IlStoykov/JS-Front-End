const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const loadBtnElement = document.getElementById('load-meals');

loadBtnElement.addEventListener('click', async() => {
    //Fetch all meals
    const response = await fetch(baseUrl);
    const data = await response.json()

    console.log(data);

    //Attach meals to dom
})