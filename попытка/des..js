const dishes = [
    { name: "Суп с грибами", kind: "veg", category: "soup" },
    { name: "Суп с треской", kind: "fish", category: "soup" },
    { name: "Мясной суп", kind: "meat", category: "soup" },
    { name: "Рыбное филе", kind: "fish", category: "main" },
    { name: "Котлета по-киевски", kind: "meat", category: "main" },
    { name: "Вегетарианские овощи", kind: "veg", category: "main" },
    { name: "Цезарь", kind: "meat", category: "salad" },
    { name: "Греческий", kind: "veg", category: "salad" },
    { name: "Салат с тунцом", kind: "fish", category: "salad" },
    { name: "Торт Наполеон", kind: "large", category: "dessert" },
    { name: "Фрукты", kind: "small", category: "dessert" },
    { name: "Шоколадный торт", kind: "medium", category: "dessert" },
];

function renderDishes(category) {
    const container = document.querySelector(`.category[data-category="${category}"] .dish-container`);
    container.innerHTML = '';
    const filteredDishes = dishes.filter(dish => dish.category === category);
    
    filteredDishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add('dish');
        dishElement.textContent = dish.name;
        container.appendChild(dishElement);
    });
}

function filterDishes(category, kind) {
    const container = document.querySelector(`.category[data-category="${category}"] .dish-container`);
    const filteredDishes = dishes.filter(dish => dish.category === category && dish.kind === kind);
    container.innerHTML = '';

    filteredDishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add('dish');
        dishElement.textContent = dish.name;
        container.appendChild(dishElement);
    });
}

document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.closest('.category').dataset.category;
        const kind = event.target.dataset.kind;

        if (event.target.classList.contains('active')) {
            event.target.classList.remove('active');
            renderDishes(category);
        } else {
            document.querySelectorAll(`.category[data-category="${category}"] .filter-button`).forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            filterDishes(category, kind);
        }
    });
});

// Изначально отрисуем все блюда
['soup', 'main', 'salad', 'dessert'].forEach(category => renderDishes(category));
