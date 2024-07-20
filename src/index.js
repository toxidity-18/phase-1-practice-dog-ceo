document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.getElementById('dog-images');
            data.message.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = "Random Dog Image";
                imgElement.style.width = "200px";
                imgElement.style.height = "auto";
                imagesContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

 
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedsContainer = document.getElementById('dog-breeds');
            allBreeds = Object.keys(data.message);
            renderBreeds(allBreeds, breedsContainer);
        })
        .catch(error => console.error('Error fetching breeds:', error));


    document.getElementById('dog-breeds').addEventListener('click', function(event) {
        if (event.target && event.target.nodeName === "LI") {
            event.target.style.color = 'blue'; 
        }
    });

    document.getElementById('breed-filter').addEventListener('change', function(event) {
        const selectedLetter = event.target.value;
        const breedsContainer = document.getElementById('dog-breeds');
        let filteredBreeds = allBreeds;
        if (selectedLetter !== "all") {
            filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        }
        renderBreeds(filteredBreeds, breedsContainer);
    });

    function renderBreeds(breeds, container) {
        container.innerHTML = '';
        breeds.forEach(breed => {
            const liElement = document.createElement('li');
            liElement.textContent = breed;
            container.appendChild(liElement);
        });
    }
});