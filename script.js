function createWordCard(word, meaning){
    const card = document.createElement('div');
    card.className = 'word-card';

    const heading = document.createElement('h2');
    heading.textContent = word;

    const definition = document.createElement('p');
    definition.textContent = "Meaning -> " + meaning;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', ()=>{
        card.remove();
        removeWordFromLocalStorage(word);
    })

    card.appendChild(heading);
    card.appendChild(definition);
    card.appendChild(deleteButton);

    return card;
}


async function getWordData(word){
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
            return meaning;
        }else{
            throw new Error(`Network response was not ok. Status code: ${response.status}`)
        }
    } catch (error) {
        alert('Enter a valid word');
        console.log('Error:', error.message);
        return null;
    }
}