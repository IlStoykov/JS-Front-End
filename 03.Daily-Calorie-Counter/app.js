const baseUrl = 'http://localhost:3030/jsonstore/tasks';

const loadBtnElement = document.getElementById('load-meals');
const listElement = document.querySelector('#list');
const addMealBtn = document.getElementById('add-meal');
const editMealBtn = document.getElementById('edit-meal');
const foodInputElement = document.getElementById('food');
const timeInputElement = document.getElementById('time');
const caloriesInputElement = document.getElementById('calories');

const loadMeaAllMeals = async() => {
    //Fetch all meals
    const response = await fetch(baseUrl);
    const data = await response.json()

    listElement.innerHTML = '';
    //Create meal element for each record from the server
    for(const meal of Object.values(data)){        
        const changeBtnElement = document.createElement('button');
        changeBtnElement.classList.add('change-meal');
        changeBtnElement.textContent = 'Change';

        const deletBtnElement = document.createElement('button');
        deletBtnElement.classList.add('delete-meal');
        deletBtnElement.textContent = 'Delete';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = 'meal-buttons';

        buttonsContainer.appendChild(changeBtnElement);
        buttonsContainer.appendChild(deletBtnElement);         

        const h2FoodElement = document.createElement('h2');
        h2FoodElement.textContent = meal.food;

        const h3TimeElement = document.createElement('h3');
        h3TimeElement.textContent = meal.time;

        const h3CaloriesElement = document.createElement('h3');
        h3CaloriesElement.textContent = meal.calories;

        const mealContainerElement = document.createElement('div');
        mealContainerElement.classList.add('meal');
        
        mealContainerElement.appendChild(h2FoodElement);
        mealContainerElement.appendChild(h3TimeElement);
        mealContainerElement.appendChild(h3CaloriesElement);
        mealContainerElement.appendChild(buttonsContainer);

        // attach meal to dom
        listElement.appendChild(mealContainerElement);
    }
};

loadBtnElement.addEventListener('click', loadMeaAllMeals);

addMealBtn.addEventListener('click', async () =>{
    // get input fields data
    const food = foodInputElement.value;
    const time = timeInputElement.value;
    const calories = caloriesInputElement.value;

    //POST reùest to create new resource on the server
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify({
            food, time, calories        
        }),
    });
    if(!response.ok){
        return;
    }
    // load all meals
    await loadMeaAllMeals();

    //clear all fields
    food.textContent = '';
    time.textContent = '';
    calories.textContent = '';
});  
