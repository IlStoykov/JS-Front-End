window.addEventListener("load", solve);

function solve(){
    const addBtnElement = document.getElementById('add-btn');
    const expenseInputElement = document.getElementById('expense');
    const amountInputElement = document.getElementById('amount');
    const dateInputElement = document.getElementById('date');
    const previewList = document.getElementById('preview-list');
    

    addBtnElement.addEventListener('click', () => {
        // get input info
        const expense = expenseInputElement.value;
        const amount = amountInputElement.value;
        const  date = dateInputElement.value;

        // Check empty element
        if(!expense || !amount || !date){
            return
        }
        const expenseLiElement = createArticleElement(expense, amount, date);
        previewList.appendChild(expenseLiElement);

        //Disable add btn
        addBtnElement.setAttribute('disabled', 'disabled');

        //clear all wallet fields
        filedsCliner(expenseInputElement, amountInputElement, dateInputElement);

        //return information from Preview to input fields and clear buttons
        const editBtn = expenseLiElement.querySelector('.btn.edit');// check if use liExpenseElement
        editBtn.addEventListener('click', () => 
        {
            expenseInputElement.value = expense;
            amountInputElement.value = amount;
            dateInputElement.value = date;
            const expencesContainer = document.getElementById('preview-list');
            
            clearexpenseLiElement(expencesContainer);
            
            addBtnElement.disabled = false;            
        })

    });
    function createArticleElement(expense, amount, date){
        const pTyepElement = document.createElement('p');
        pTyepElement.textContent = `Type: ${expense}`;

        const pAmountElement = document.createElement('p');
        pAmountElement.textContent = `Amount: ${amount}$`;

        const pDateElement = document.createElement('p');
        pDateElement.textContent = `Date: ${date}`;

        const articleElement = document.createElement('article');
        
        articleElement.appendChild(pTyepElement);
        articleElement.appendChild(pAmountElement);
        articleElement.appendChild(pDateElement);

        const buttonsElement = document.createElement('div');
        buttonsElement.classList.add('buttons');

        const buttonEditElement = document.createElement('button');
        buttonEditElement.classList.add('btn', 'edit');
        buttonEditElement.textContent = 'edit';

        const buttonOkElement = document.createElement('button');
        buttonOkElement.classList.add('btn', 'ok');
        buttonOkElement.textContent = 'ok';

        buttonsElement.appendChild(buttonEditElement);
        buttonsElement.appendChild(buttonOkElement);

        const liExpenseElement = document.createElement('li');
        liExpenseElement.classList.add('expense-item');

        liExpenseElement.appendChild(articleElement);
        liExpenseElement.appendChild(buttonsElement);

        return liExpenseElement; 
        
    };
    function  filedsCliner(expenseInputElement, amountInputElement, dateInputElement){
        return (expenseInputElement.value = '', amountInputElement.value = '', dateInputElement.value = '')
    };
    function clearexpenseLiElement(container){
        while(container.firstChild){
            container.removeChild(container.firstChild)
        }
    }
}