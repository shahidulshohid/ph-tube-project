
// created 3 buttons here
const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}

// display buttons here 

const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('categories')
    categories.forEach(item => {
        const button = document.createElement('button')
        button.classList = 'btn';
        button.innerText = item.category
        categoryContainer.appendChild(button)
    })
}

loadCategories()