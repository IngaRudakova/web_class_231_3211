document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        soup: document.querySelector('#soup-section .dishes'),
        mainCourse: document.querySelector('#main-course-section .dishes'),
        salad: document.querySelector('#salad-section .dishes'),
        drink: document.querySelector('#drink-section .dishes'),
        dessert: document.querySelector('#dessert-section .dishes')
    };

    const orderPanel = document.getElementById('order-panel');
    const totalPriceBlock = document.getElementById('total-price-block');
    const totalPriceValue = document.querySelector('#total-price');
    const checkoutLink = document.getElementById('checkout-link');

    const selectedDishes = {
        soup: null,
        mainCourse: null,
        salad: null,
        drink: null,
        dessert: null
    };

    let dishes = [];

    function updateOrderSummary() {
        let totalCost = 0;

        Object.values(selectedDishes).forEach(dish => {
            if (dish) {
                totalCost += parseInt(dish.price);
            }
        });

        totalPriceValue.textContent = `${totalCost}₽`;
        totalPriceBlock.style.display = totalCost > 0 ? 'block' : 'none';
        checkoutLink.style.pointerEvents = validateOrder() ? 'auto' : 'none';
        checkoutLink.style.display = totalCost > 0 ? 'inline' : 'none';
        orderPanel.style.display = totalCost > 0 ? 'block' : 'none';

        
        if (validateOrder()) {
            checkoutLink.style.backgroundColor = 'red';
        } else {
            checkoutLink.style.backgroundColor = '';
        }
    }

    function saveSelectedDishesToLocalStorage() {
        const selectedDishIds = Object.entries(selectedDishes)
            .filter(([category, dish]) => dish !== null)
            .map(([category, dish]) => dish.id);
        localStorage.setItem('selectedDishes', JSON.stringify(selectedDishIds));
    }

    function handleDishClick(event) {
        const dishElement = event.currentTarget;
        const dishId = dishElement.getAttribute('data-dish');
        if (!dishId) {
            console.error('Атрибут data-dish не установлен');
            return;
        }
        const dish = dishes.find(d => d.id === parseInt(dishId));

        if (dish) {
            const category = dish.category === 'main-course' ? 'mainCourse' : dish.category;
            selectedDishes[category] = dish;
            updateOrderSummary();
            saveSelectedDishesToLocalStorage();
        } else {
            console.error('Блюдо не найдено:', dishId);
        }
    }

    function createDishElement(dish) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('dish');
        gridItem.setAttribute('data-dish', dish.id);
        gridItem.setAttribute('data-kind', dish.kind);
        gridItem.addEventListener('click', handleDishClick);

        const productImage = document.createElement('div');
        productImage.classList.add('product-image');
        const img = document.createElement('img');
        img.src = dish.image;
        img.alt = dish.name;
        productImage.appendChild(img);

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');
        const price = document.createElement('p');
        price.classList.add('into');
        price.textContent = `${dish.price} ₽`;
        const name = document.createElement('p');
        name.classList.add('name_product');
        name.textContent = dish.name;
        const weight = document.createElement('p');
        weight.classList.add('weight');
        weight.textContent = dish.weight;
        const button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = 'Добавить';

        productDetails.appendChild(price);
        productDetails.appendChild(name);
        productDetails.appendChild(weight);
        productDetails.appendChild(button);

        gridItem.appendChild(productImage);
        gridItem.appendChild(productDetails);

        return gridItem;
    }

    async function loadDishes() {
        try {
            const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке блюд');
            }
            dishes = await response.json();
            const categories = ['soup', 'main-course', 'salad', 'drink', 'dessert'];

            categories.forEach(category => {
                const dishesInCategory = dishes.filter(dish => dish.category === category).sort((a, b) => a.name.localeCompare(b.name));
                dishesInCategory.forEach(dish => {
                    sections[category === 'main-course' ? 'mainCourse' : category].appendChild(createDishElement(dish));
                });
            });

            loadSelectedDishesFromLocalStorage();
        } catch (error) {
            console.error('Ошибка:', error);
            showNotification('Ошибка при загрузке блюд');
        }
    }

    function loadSelectedDishesFromLocalStorage() {
        const savedDishIds = JSON.parse(localStorage.getItem('selectedDishes'));
        if (savedDishIds) {
            savedDishIds.forEach(dishId => {
                const dish = dishes.find(d => d.id === dishId);
                if (dish) {
                    const category = dish.category === 'main-course' ? 'mainCourse' : dish.category;
                    selectedDishes[category] = dish;
                }
            });
            updateOrderSummary();
        }
    }

    document.querySelectorAll('.filters button').forEach(filterButton => {
        filterButton.addEventListener('click', event => {
            const filter = event.target.getAttribute('data-kind');
            const categoryContainer = event.target.closest('.filters').nextElementSibling;
            const dishesInCategory = categoryContainer.querySelectorAll('.dish');
            const isActive = event.target.classList.contains('active');

            document.querySelectorAll('.filters button').forEach(button => {
                button.classList.remove('active');
            });
            if (!isActive) {
                event.target.classList.add('active');
            }

            dishesInCategory.forEach(dishElement => {
                if (!event.target.classList.contains('active')) {
                    dishElement.style.display = 'block';
                } else {
                    dishElement.style.display = dishElement.getAttribute('data-kind') === filter ? 'block' : 'none';
                }
            });
        });
    });

    function validateOrder() {
        const selectedDishesArray = Object.values(selectedDishes).filter(dish => dish !== null);

        if (selectedDishesArray.length === 0) {
            return false;
        }

        const hasSoup = selectedDishesArray.some(dish => dish.category === 'soup');
        const hasMainCourse = selectedDishesArray.some(dish => dish.category === 'main-course');
        const hasSalad = selectedDishesArray.some(dish => dish.category === 'salad');
        const hasDrink = selectedDishesArray.some(dish => dish.category === 'drink');

        if (!hasDrink) {
            return false;
        }

        if (hasSoup && !hasMainCourse && !hasSalad) {
            return false;
        }

        if ((hasSalad || hasMainCourse) && !hasSoup && !hasMainCourse) {
            return false;
        }

        if (hasDrink && !hasMainCourse) {
            return false;
        }

        return true;
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <p>${message}</p>
            <button>Окей 👌</button>
        `;
        document.body.appendChild(notification);

        notification.querySelector('button').addEventListener('click', () => {
            closeNotification(notification);
        });
    }

    function closeNotification(notification) {
        notification.remove();
    }

    loadDishes();
});
