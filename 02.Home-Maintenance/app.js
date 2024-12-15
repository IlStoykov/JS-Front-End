function solve(){
    const placeInputField = document.getElementById('place');
    const actionInputField = document.getElementById('action');
    const personInputField = document.getElementById('person');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const doneList = document.getElementById('done-list');
    const deleteBtn = document.createElement('button');
    

    addButton.addEventListener('click', () => {

        const place = placeInputField.value;
        const action = actionInputField.value;
        const person = personInputField.value;

        if(!place || !action || !person){
            return;
        }
        const articleElement = (createArticleElement(place, action, person));
        taskList.appendChild(articleElement);
        fieldCliner();  

        const editBtnElement = document.querySelector('.edit');
        const doneBtnElement = document.querySelector('.done');

        editBtnElement.addEventListener('click', () => {
            placeInputField.value = place;
            actionInputField.value = action;
            personInputField.value = person;            
            cleanTaskElement(taskList);
        });
        
        doneBtnElement.addEventListener('click', ()=>{
            doneList.appendChild(articleElement);
            
            deleteBtn.classList.add('delete');
            deleteBtn.textContent = 'Delete';
            const buttonsForDel = document.querySelector('.buttons');
            buttonsForDel.innerHTML = '';
            articleElement.appendChild(deleteBtn);            
            taskList.remove(articleElement);
        });
        deleteBtn.addEventListener('click', () => {
            // doneList.remove(articleElement);
            location.reload();

        })

    });

    function cleanTaskElement(taskList){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        };
    };

    function fieldCliner(){
        const place = placeInputField.value = '';
        const action = actionInputField.value = '';
        const person = personInputField.value = '';
        return {place, action, person}
    };
    function createArticleElement(place, action, person){
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        editBtn.textContent = 'Edit';        

        const doneBtn = document.createElement('button');
        doneBtn.classList.add('done');
        doneBtn.textContent = 'Done';

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons')
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(doneBtn);

        const articleContainer = document.createElement('article');
    
        const placeElement = document.createElement('p');
        placeElement.textContent = `Place:${place}`;

        const actionElement = document.createElement('p');
        actionElement.textContent = `Action:${action}`;

        const personElement = document.createElement('p');
        personElement.textContent = `Person:${person}`;

        articleContainer.appendChild(placeElement);
        articleContainer.appendChild(actionElement);
        articleContainer.appendChild(personElement);
        
        const liElement = document.createElement('li');
        liElement.classList.add('clean-task');

        liElement.appendChild(articleContainer);
        liElement.appendChild(buttonContainer);

        return liElement;
    };
}