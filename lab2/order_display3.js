document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = document.getElementById('order-summary');
    const orderDetails = document.getElementById('order-details');
    const totalCostBlock = document.getElementById('total-price-block');
    const totalCostValue = document.getElementById('total-price');
    const orderForm = document.getElementById('orderForm');
    const resetButtonContainerAFK = document.querySelector('reset_button .reset');
    const resetButtonContainer = document.getElementById('reset_button');
    const resetButton = document.querySelector('#reset_button button[type="reset"]');

    const apiKey = '65f931a2-29e2-4ca0-b490-5a19bb332145';

    let dishes = [];
    let selectedDishes = {
        soup: null,
        mainCourse: null,
        salad: null,
        drink: null,
        dessert: null
    };

    async function loadDishes() {
        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке блюд');
            }
            dishes = await response.json();
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
            updateOrderDetails();
        }
    }

    function updateOrderSummary() {
        orderSummary.innerHTML = '';
        let totalCost = 0;

        if (!Object.values(selectedDishes).some(dish => dish)) {
            orderSummary.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу <a href="index.html">Собрать ланч</a>.</p>';
            totalCostBlock.style.display = 'none';
            return;
        }

        Object.entries(selectedDishes).forEach(([category, dish]) => {
            const categoryName = {
                soup: 'Суп',
                mainCourse: 'Главное блюдо',
                salad: 'Салат',
                drink: 'Напиток',
                dessert: 'Десерт'
            }[category];

            if (dish) {
                const div = createDishElement(dish, true);
                orderSummary.appendChild(div);
                totalCost += parseInt(dish.price);
            }
        });

        totalCostValue.textContent = `${totalCost}₽`;
        totalCostBlock.style.display = 'block';
    }

    function updateOrderDetails() {
        orderDetails.innerHTML = '';

        const hasSelectedDishes = Object.values(selectedDishes).some(dish => dish);

        if (!hasSelectedDishes) {
            const div = document.createElement('div');
            div.classList.add('order-item');
            div.innerHTML = '<p>Не выбрано</p>';
            orderDetails.appendChild(div);
            return;
        }

        Object.entries(selectedDishes).forEach(([category, dish]) => {
            const categoryName = {
                soup: 'Суп',
                mainCourse: 'Главное блюдо',
                salad: 'Салат',
                drink: 'Напиток',
                dessert: 'Десерт'
            }[category];

            const div = document.createElement('div');
            div.classList.add('order-item');
            div.innerHTML = `<h4>${categoryName}</h4><p>${dish ? `${dish.name} ${dish.price}₽` : 'Не выбрано'}</p>`;
            orderDetails.appendChild(div);
        });
    }

    function removeDishFromOrder(dishId) {
        const dish = dishes.find(dish => dish.id === Number(dishId));

        if (dish) {
            const category = dish.category === 'main-course' ? 'mainCourse' : dish.category;
            selectedDishes[category] = null;
            updateOrderSummary();
            updateOrderDetails();
            saveSelectedDishesToLocalStorage();
        }
    }

    resetButton.addEventListener('click', (event) => {
        orderForm.reset();
        selectedDishes = {
            soup: null,
            mainCourse: null,
            salad: null,
            drink: null,
            dessert: null
        };
        updateOrderSummary();
        updateOrderDetails();
        localStorage.removeItem('selectedDishes');
    });

    function saveSelectedDishesToLocalStorage() {
        const selectedDishIds = Object.values(selectedDishes).filter(dish => dish).map(dish => dish.id);
        localStorage.setItem('selectedDishes', JSON.stringify(selectedDishIds));
    }

    orderSummary.addEventListener('click', event => {
        if (event.target.classList.contains('btn')) {
            const dishId = event.target.getAttribute('data-dish');
            removeDishFromOrder(dishId);
        }
    });

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

    orderForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!validateOrder()) {
            event.preventDefault();
            return;
        }

        const formData = new FormData(orderForm);
        formData.append('soup_id', selectedDishes.soup ? selectedDishes.soup.id : '');
        formData.append('main_course_id', selectedDishes.mainCourse ? selectedDishes.mainCourse.id : '');
        formData.append('salad_id', selectedDishes.salad ? selectedDishes.salad.id : '');
        formData.append('drink_id', selectedDishes.drink ? selectedDishes.drink.id : '');
        formData.append('dessert_id', selectedDishes.dessert ? selectedDishes.dessert.id : '');

        // Добавление цены блюд в форму
        formData.append('soup_price', selectedDishes.soup ? selectedDishes.soup.price : '');
        formData.append('main_course_price', selectedDishes.mainCourse ? selectedDishes.mainCourse.price : '');
        formData.append('salad_price', selectedDishes.salad ? selectedDishes.salad.price : '');
        formData.append('drink_price', selectedDishes.drink ? selectedDishes.drink.price : '');
        formData.append('dessert_price', selectedDishes.dessert ? selectedDishes.dessert.price : '');

        // Добавление комментария в форму
        const comment = formData.get('comment');
        if (comment) {
            formData.append('comment', comment.trim());
        } else {
            formData.append('comment', '');
        }

        // Проверка и сохранение времени доставки
        const deliveryType = formData.get('delivery_type');
        if (deliveryType === 'by_time') {
            const deliveryTime = formData.get('delivery-time');
            if (!deliveryTime) {
                showNotification('Укажите время доставки');
                return;
            }
            formData.append('delivery_time', deliveryTime);
        }

        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Ошибка при отправке заказа');
            }
            const result = await response.json();
            console.log('Заказ успешно оформлен:', result);
            showNotification('Заказ успешно оформлен!');
            localStorage.removeItem('selectedDishes');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Ошибка:', error);
            showNotification('Ошибка при отправке заказа');
        }
    });

    function validateOrder() {
        const selectedDishesArray = Object.values(selectedDishes).filter(dish => dish !== null);

        if (selectedDishesArray.length === 0) {
            showNotification('Ничего не выбрано. Выберите блюда для заказа');
            return false;
        }

        const hasSoup = selectedDishesArray.some(dish => dish.category === 'soup');
        const hasMainCourse = selectedDishesArray.some(dish => dish.category === 'main-course');
        const hasSalad = selectedDishesArray.some(dish => dish.category === 'salad');
        const hasDrink = selectedDishesArray.some(dish => dish.category === 'drink');

        if (!hasDrink) {
            showNotification('Выберите напиток');
            return false;
        }

        if (hasSoup && !hasMainCourse && !hasSalad) {
            showNotification('Выберите главное блюдо/салат/стартер');
            return false;
        }

        if ((hasSalad || hasMainCourse) && !hasSoup && !hasMainCourse) {
            showNotification('Выберите суп или главное блюдо');
            return false;
        }

        if (hasDrink && !hasMainCourse) {
            showNotification('Выберите главное блюдо');
            return false;
        }

        return true;
    }

    function createDishElement(dish, isOrderPage = false) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('dish');
        gridItem.setAttribute('data-dish', dish.id);
        gridItem.setAttribute('data-kind', dish.category);

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
        button.textContent = isOrderPage ? 'Удалить' : 'Добавить';
        button.setAttribute('data-dish', dish.id);

        productDetails.appendChild(price);
        productDetails.appendChild(name);
        productDetails.appendChild(weight);
        productDetails.appendChild(button);

        gridItem.appendChild(productImage);
        gridItem.appendChild(productDetails);

        return gridItem;
    }

    loadDishes();
});
