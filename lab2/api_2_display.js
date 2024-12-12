document.addEventListener("DOMContentLoaded", () => {
    const soupSection = document.querySelector("#soup-section .dishes");
    const mainSection = document.querySelector("#main-course-section .dishes");
    const saladSection = document.querySelector("#salad-section .dishes");
    const dessertSection = document.querySelector("#dessert-section .dishes");
    const drinkSection = document.querySelector("#drink-section .dishes");

    let dishes = [];

    // Функция для отображения блюд
    const renderDishes = (section, category) => {
        section.innerHTML = ''; // Очистка секции перед добавлением новых элементов
        dishes.filter(dish => dish.category === category).forEach(dish => {
            const dishElement = createDishElement(dish);
            section.appendChild(dishElement);
        });
    };

    // Функция для загрузки блюд из API
    const loadDishes = () => {
        const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dishes = data; // Сохранение загруженных блюд в переменную
                dishes.sort((a, b) => a.name.localeCompare(b.name)); // Сортировка блюд

                // Отображение всех категорий блюд
                renderDishes(soupSection, 'soup');
                renderDishes(mainSection, 'main-course');
                renderDishes(saladSection, 'salad');
                renderDishes(dessertSection, 'dessert');
                renderDishes(drinkSection, 'drink');
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    };

    loadDishes(); // Загрузка блюд

    // Функция фильтрации блюд
    const filterDishes = (section, kind) => {
        const dishElements = section.querySelectorAll(".dish");
        dishElements.forEach(dishElement => {
            if (kind === "all" || dishElement.getAttribute("data-kind") === kind) {
                dishElement.style.display = "block";
            } else {
                dishElement.style.display = "none";
            }
        });
    };

    // Обработчик событий для кнопок фильтров
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.closest('section').id.replace('-section', '');
            const section = document.querySelector(`#${category}-section .dishes`);
            const kind = event.target.getAttribute('data-kind');

            if (event.target.classList.contains('active')) {
                event.target.classList.remove('active');
                filterDishes(section, 'all'); // Отображение всех блюд
            } else {
                event.target.closest('.filters').querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');
                filterDishes(section, kind);
            }
        });
    });

    // Определение элементов формы заказа
    const orderForm = {
        soup: document.getElementById("selected-soup"),
        main: document.getElementById("selected-main-course"),
        salad: document.getElementById("selected-salad"),
        dessert: document.getElementById("selected-dessert"),
        drink: document.getElementById("selected-drink"),
        totalPrice: document.querySelector("#total-price .price-value")
    };

    let selectedDishes = {
        soup: null,
        main: null,
        salad: null,
        dessert: null,
        drink: null
    };

    const updateOrder = () => {
        let total = 0;
        let isAnyDishSelected = false; // Обновляем информацию
        for (let category in selectedDishes) {
            if (selectedDishes[category]) {
                orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
                total += selectedDishes[category].price;
                isAnyDishSelected = true;
            } else {
                orderForm[category].textContent = "Не выбрано";
            }
        }
        // Определение элементов для отображения сообщений и блоков заказа
        const noSelectionMessage = document.getElementById("no-selection-message");
        const soupOrder = document.getElementById("soup-order");
        const mainOrder = document.getElementById("main-course-order");
        const salatOrder = document.getElementById("salad-order");
        const desertOrder = document.getElementById("dessert-order");
        const drinkOrder = document.getElementById("drink-order");
        const totalPriceBlock = document.getElementById("total-price-block");

        if (!isAnyDishSelected) {
            noSelectionMessage.style.display = 'block';
            soupOrder.style.display = 'none';
            mainOrder.style.display = 'none';
            salatOrder.style.display = 'none';
            desertOrder.style.display = 'none';
            drinkOrder.style.display = 'none';
            totalPriceBlock.style.display = 'none';
        } else {
            noSelectionMessage.style.display = 'none';
            soupOrder.style.display = 'block';
            mainOrder.style.display = 'block';
            salatOrder.style.display = 'block';
            desertOrder.style.display = 'block';
            drinkOrder.style.display = 'block';
            totalPriceBlock.style.display = 'block';
            orderForm.totalPrice.textContent = `${total}₽`;
        }
    };

    // Нажатие по блюду
    function handleDishClick(event) {
        const dishElement = event.currentTarget;
        const keyword = dishElement.getAttribute('data-dish');
        if (!keyword) {
            console.error('Атрибут data-dish не установлен');
            return;
        }
        const dish = dishes.find(d => d.keyword === keyword);

        if (dish) {
            const category = dish.category === 'main-course' ? 'main' : dish.category;
            selectedDishes[category] = dish;
            console.log(`Добавлено блюдо: ${dish.name} в категорию ${category}`);
            updateOrder();
        } else {
            console.error('Блюдо не найдено:', keyword);
        }
    }

    // Функция для создания элемента блюда
    function createDishElement(dish) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item', 'dish');
        gridItem.setAttribute('data-dish', dish.keyword);
        gridItem.setAttribute('data-kind', dish.kind);
        gridItem.addEventListener('click', handleDishClick);

        const productImage = document.createElement('div');
        productImage.classList.add('produtc-image');
        const img = document.createElement('img');
        img.src = dish.image;
        img.alt = dish.name;
        productImage.appendChild(img);

        const productDetails = document.createElement('div');
        productDetails.classList.add('produtc-details');
        const price = document.createElement('p');
        price.classList.add('into');
        price.textContent = `${dish.price} ₽`;
        const name = document.createElement('p');
        name.classList.add('name_produtc');
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

    // Обработчик для кнопки сброса
    document.querySelector('button[type="reset"]').addEventListener('click', () => {
        selectedDishes = {
            soup: null,
            main: null,
            salad: null,
            dessert: null,
            drink: null
        };
        updateOrder();
    });

    // Функция для проверки выбранных блюд
    function validateOrder() {
        // Получаем массив выбранных блюд, исключая null значения
        const selectedDishesArray = Object.values(selectedDishes).filter(dish => dish !== null);

        // Проверяем, есть ли выбранные блюда
        if (selectedDishesArray.length === 0) {
            // Если нет, показываем уведомление и возвращаем false
            showNotification('Ничего не выбрано. Выберите блюда для заказа');
            return false;
        }

        // Проверяем, есть ли суп в выбранных блюдах
        const hasSoup = selectedDishesArray.some(dish => dish.category === 'soup');
        // Проверяем, есть ли главное блюдо в выбранных блюдах
        const hasMainCourse = selectedDishesArray.some(dish => dish.category === 'main-course');
        // Проверяем, есть ли салат в выбранных блюдах
        const hasSalad = selectedDishesArray.some(dish => dish.category === 'salad');
        // Проверяем, есть ли напиток в выбранных блюдах
        const hasDrink = selectedDishesArray.some(dish => dish.category === 'drink');

        // Проверяем, есть ли напиток в выбранных блюдах
        if (!hasDrink) {
            // Если нет, показываем уведомление и возвращаем false
            showNotification('Выберите напиток');
            return false;
        }

        // Проверяем, есть ли суп, но нет главного блюда и салата
        if (hasSoup && !hasMainCourse && !hasSalad) {
            // Если да, показываем уведомление и возвращаем false
            showNotification('Выберите главное блюдо/салат/стартер');
            return false;
        }

        // Проверяем, есть ли салат или главное блюдо, но нет супа и главного блюда
        if ((hasSalad || hasMainCourse) && !hasSoup && !hasMainCourse) {
            // Если да, показываем уведомление и возвращаем false
            showNotification('Выберите суп или главное блюдо');
            return false;
        }

        // Проверяем, есть ли напиток, но нет главного блюда
        if (hasDrink && !hasMainCourse) {
            // Если да, показываем уведомление и возвращаем false
            showNotification('Выберите главное блюдо');
            return false;
        }

        // Если все проверки пройдены, возвращаем true
        return true;
    }

    // Функция для отображения уведомления
    function showNotification(message) {
        // Создаем элемент div для уведомления
        const notification = document.createElement('div');
        // Добавляем класс 'notification' к элементу div
        notification.className = 'notification';
        // Устанавливаем HTML-содержимое уведомления
        notification.innerHTML = `
            <p>${message}</p>
            <button>Окей 👌</button>
        `;
        // Добавляем уведомление в конец body
        document.body.appendChild(notification);

        // Добавляем обработчик события для кнопки "Окей"
        notification.querySelector('button').addEventListener('click', () => {
            // Закрываем уведомление при нажатии на кнопку
            closeNotification(notification);
        });
    }

    // Функция для закрытия уведомления
    function closeNotification(notification) {
        // Удаляем уведомление из DOM
        notification.remove();
    }

    // Добавляем обработчик события для формы
    document.querySelector('form').addEventListener('submit', event => {
        // Проверяем заказ перед отправкой формы
        if (!validateOrder()) {
            // Если заказ не прошел проверку, предотвращаем отправку формы
            event.preventDefault();
        }
    });
});
