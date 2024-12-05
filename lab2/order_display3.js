document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = document.getElementById('order-summary');
    const orderDetails = document.getElementById('order-details');
    const totalCostBlock = document.getElementById('total-price-block');
    const totalCostValue = document.getElementById('total-price');
    const orderForm = document.getElementById('orderForm');
    console.log(orderForm)
    const resetButtonContainerAFK = document.querySelector('reset_button .reset');
    const resetButtonContainer = document.getElementById('reset_button');
    const resetButton = document.querySelector('#reset_button button[type="reset"]');


    console.log('666 b 222', resetButton)
    console.log('11',resetButtonContainerAFK)
    console.log('22', resetButtonContainer)
    const apiKey = '65f931a2-29e2-4ca0-b490-5a19bb332145'

    let dishes = [];
    let selectedDishes = {
        soup: null,
        mainCourse: null,
        salad: null,
        drink: null,
        dessert: null
    };

    // Функция для загрузки блюд с API
    //делает функцию асинхронной
    // 
    async function loadDishes() {
       
        try {
            // await: Ожидает завершения запроса. Пока запрос не выполнится, выполнение функции приостанавливается.
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

        
        console.log('2', selectedDishes)
    }

    // Функция для загрузки выбранных блюд из localStorage
function loadSelectedDishesFromLocalStorage() {
    // Получаем сохраненные идентификаторы блюд из localStorage и парсим их из JSON
    const savedDishIds = JSON.parse(localStorage.getItem('selectedDishes'));
    // Если есть сохраненные идентификаторы блюд
    if (savedDishIds) {
        // Перебираем каждый сохраненный идентификатор блюда
        savedDishIds.forEach(dishId => {
            // Находим блюдо по идентификатору в массиве dishes
            const dish = dishes.find(d => d.id === dishId);
            // Если блюдо найдено
            if (dish) {
                // Определяем категорию блюда
                const category = dish.category === 'main-course' ? 'mainCourse' : dish.category;
                // Добавляем блюдо в объект selectedDishes по соответствующей категории
                selectedDishes[category] = dish;
            }
        });
        // Обновляем сводку заказа
        updateOrderSummary();
        // Обновляем детали заказа
        updateOrderDetails();

        // Выводим в консоль объект selectedDishes для отладки
        console.log('1', selectedDishes);
    }
}

// Функция для обновления сводки заказа
function updateOrderSummary() {
    // Очищаем содержимое блока сводки заказа
    orderSummary.innerHTML = '';
    // Инициализируем общую стоимость заказа
    let totalCost = 0;

    // Проверяем, есть ли выбранные блюда
    if (!Object.values(selectedDishes).some(dish => dish)) {
        // Если блюда не выбраны, отображаем сообщение и скрываем блок общей стоимости
        orderSummary.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на страницу <a href="index_lab8.html">Собрать ланч</a>.</p>';
        totalCostBlock.style.display = 'none';
        return;
    }

    // Перебираем выбранные блюда
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        // Определяем название категории блюда
        const categoryName = {
            soup: 'Суп',
            mainCourse: 'Главное блюдо',
            salad: 'Салат',
            drink: 'Напиток',
            dessert: 'Десерт'
        }[category];

        // Если блюдо выбрано
        if (dish) {
            // Создаем элемент для отображения блюда
            const div = createDishElement(dish, true);
            // Добавляем элемент в блок сводки заказа
            orderSummary.appendChild(div);
            // Добавляем стоимость блюда к общей стоимости
            totalCost += parseInt(dish.price);
        }
    });

    // Обновляем отображение общей стоимости
    totalCostValue.textContent = `${totalCost}₽`;
    // Отображаем блок общей стоимости
    totalCostBlock.style.display = 'block';
}

// Функция для обновления деталей заказа
function updateOrderDetails() {
    // Очищаем содержимое блока деталей заказа
    orderDetails.innerHTML = '';

    // Проверяем, есть ли выбранные блюда
    const hasSelectedDishes = Object.values(selectedDishes).some(dish => dish);

    // Если блюда не выбраны, отображаем сообщение
    if (!hasSelectedDishes) {
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = '<p>Не выбрано</p>';
        orderDetails.appendChild(div);
        return;
    }

    // Перебираем выбранные блюда
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        // Определяем название категории блюда
        const categoryName = {
            soup: 'Суп',
            mainCourse: 'Главное блюдо',
            salad: 'Салат',
            drink: 'Напиток',
            dessert: 'Десерт'
        }[category];

        // Создаем элемент для отображения блюда
        const div = document.createElement('div');
        div.classList.add('order-item');
        div.innerHTML = `<h4>${categoryName}</h4><p>${dish ? `${dish.name} ${dish.price}₽` : 'Не выбрано'}</p>`;
        // Добавляем элемент в блок деталей заказа
        orderDetails.appendChild(div);
    });
}

// Функция для удаления блюда из заказа
function removeDishFromOrder(dishId) {
    // Находим блюдо по идентификатору в массиве dishes
    const dish = dishes.find(dish => dish.id === Number(dishId));

    // Если блюдо найдено
    if (dish) {
        // Определяем категорию блюда
        const category = dish.category === 'main-course' ? 'mainCourse' : dish.category;
        // Удаляем блюдо из объекта selectedDishes
        selectedDishes[category] = null;
        // Обновляем сводку заказа
        updateOrderSummary();
        // Обновляем детали заказа
        updateOrderDetails();
        // Сохраняем выбранные блюда в localStorage
        saveSelectedDishesToLocalStorage();
    }
}


    // Обработчик события для кнопки "Сбросить"
    resetButton.addEventListener('click', (event) => {
        // Сбрасываем форму
        orderForm.reset();
        // Очищаем выбранные блюда
        selectedDishes = {
            soup: null,
            mainCourse: null,
            salad: null,
            drink: null,
            dessert: null
        };
        // Обновляем сводку и детали заказа
        updateOrderSummary();
        updateOrderDetails();
        // Очищаем localStorage
        localStorage.removeItem('selectedDishes');
    });

    // Функция для сохранения выбранных блюд в localStorage
    function saveSelectedDishesToLocalStorage() {
        const selectedDishIds = Object.values(selectedDishes).filter(dish => dish).map(dish => dish.id);
        localStorage.setItem('selectedDishes', JSON.stringify(selectedDishIds));
    }

    // Обработчик события для кнопки "Удалить"
    orderSummary.addEventListener('click', event => {
        if (event.target.classList.contains('btn')) {
            const dishId = event.target.getAttribute('data-dish');
            removeDishFromOrder(dishId);
        }
    });

    // Функция для отображения уведомления
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

    // Функция для закрытия уведомления
    function closeNotification(notification) {
        notification.remove();
    }

    // Добавляем обработчик события для формы
    orderForm.addEventListener('submit', async event => {
        console.log('777', selectedDishes)
        event.preventDefault();
        if (!validateOrder()) {
            console.log('3', dishes)
            console.log('3', selectedDishes)
            event.preventDefault();
        }

        const formData = new FormData(orderForm);
        formData.append('soup_id', selectedDishes.soup ? selectedDishes.soup.id : '');
        formData.append('main_course_id', selectedDishes.mainCourse ? selectedDishes.mainCourse.id : '');
        formData.append('salad_id', selectedDishes.salad ? selectedDishes.salad.id : '');
        formData.append('drink_id', selectedDishes.drink ? selectedDishes.drink.id : '');
        formData.append('dessert_id', selectedDishes.dessert ? selectedDishes.dessert.id : '');

        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Ошибка при отправке заказа');
            }
            const result = await response.json();
            showNotification('Заказ успешно оформлен!');
            localStorage.removeItem('selectedDishes');
            window.location.href = 'index_lab8.html';
        } catch (error) {
            console.error('Ошибка:', error);
            showNotification('Ошибка при отправке заказа');
        }



    });

    // Функция для проверки выбранных блюд
    function validateOrder() {
        console.log(dishes)
        console.log(selectedDishes)
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

    // Функция для создания элемента блюда
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
