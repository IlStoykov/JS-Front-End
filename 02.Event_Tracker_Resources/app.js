window.addEventListener("load", solve);

function solve() {
    const eventNameInput = document.getElementById("event");
    const noteInput = document.getElementById('note');
    const dateInput = document.getElementById('date');
    const saveButton = document.getElementById('save');
    const deleteButton = document.querySelector('.btn.delete');
    const upcomingList = document.getElementById('upcoming-list');
    const donesList = document.getElementById('events-list');

    saveButton.addEventListener('click', () => {
        const eventName = eventNameInput.value;
        const note = noteInput.value;
        const date = dateInput.value;

        if (!eventName || !note || !date) {
            return;
        }

        const eventItem = createEventItem(eventName, note, date);
        upcomingList.appendChild(eventItem);

        clearInputs();
    });

    deleteButton.addEventListener("click", () => {
        donesList.innerHTML = "";
    });

    function createEventItem(eventName, note, date) {
        const li = document.createElement("li");
        li.classList.add("event-item");

        const editButton = document.createElement("button");
        editButton.classList.add("btn", "edit");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            eventNameInput.value = eventName;
            noteInput.value = note;
            dateInput.value = date;

            upcomingList.removeChild(li);
        });

        const doneButton = document.createElement("button");
        doneButton.classList.add("btn", "done");
        doneButton.textContent = "Done";
        doneButton.addEventListener("click", () => {
            upcomingList.removeChild(li);

            const doneEvent = document.createElement("li");
            doneEvent.classList.add("event-item");
            
            const clonedArticle = article.cloneNode(true);
            doneEvent.appendChild(clonedArticle);

            donesList.appendChild(doneEvent);
        });

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons");

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(doneButton);

        const article = document.createElement("article");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = `Name: ${eventName}`;

        const noteParagraph = document.createElement("p");
        noteParagraph.textContent = `Note: ${note}`;

        const dateParagraph = document.createElement("p");
        dateParagraph.textContent = `Date: ${date}`;

        article.appendChild(nameParagraph);
        article.appendChild(noteParagraph);
        article.appendChild(dateParagraph);

        li.appendChild(article);
        li.appendChild(buttonsContainer);

        return li;
    };

    function clearInputs() {
        eventNameInput.value = "";
        noteInput.value = "";
        dateInput.value = "";
    }
};


