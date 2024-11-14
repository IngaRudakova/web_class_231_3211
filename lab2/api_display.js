document.addEventListener("DOMContentLoaded", () => {
    const soupSection = document.querySelector("#soup-section .dishes");
    const mainSection = document.querySelector("#main-course-section .dishes");
    const saladSection = document.querySelector("#salad-section .dishes");
    const dessertSection = document.querySelector("#dessert-section .dishes");
    const drinkSection = document.querySelector("#drink-section .dishes");

    let dishes = [];

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

    // Функция для отображения блюд
    const renderDishes = (section, category) => {
        section.innerHTML = ''; // Очистка секции перед добавлением новых элементов
        dishes.filter(dish => dish.category === category).forEach(dish => {
            const dishElement = document.createElement("div");
            dishElement.classList.add("dish");
            dishElement.setAttribute("data-dish", dish.keyword);
            dishElement.setAttribute("data-kind", dish.kind); // Устанавливаем атрибут для фильтрации
            dishElement.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <div class="dish-info">
                    <p class="price">${dish.price}₽</p>
                    <p class="name">${dish.name}</p>
                    <p class="weight">${dish.count}</p>
                    <button class="add">Добавить</button>
                </div>
            `;
            section.appendChild(dishElement);
        });
    };

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
        salat: document.getElementById("selected-salad"),
        desert: document.getElementById("selected-dessert"),
        drink: document.getElementById("selected-drink"),
        totalPrice: document.querySelector("#total-price .price-value")
    };

    let selectedDishes = {
        soup: null,
        main: null,
        salat: null,
        desert: null,
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
    // Когда происходит клик по одному из этих элементов,
    //  выполняется функция-обработчик. Внутри нее сначала извлекается
    //   значение атрибута data-dish с помощью метода getAttribute("data-dish").
    //    Это значение сохраняется в переменную dishKeyword.
    // Найти в массиве и добавить в заказ
    document.querySelectorAll(".dish").forEach(dishElement => {
        dishElement.addEventListener("click", (event) => {
            const keyword = dishElement.getAttribute("data-dish"); 
            // Метод find ищет первый элемент массива,
            //  удовлетворяющий условию, переданному в виде функции.
            //   Здесь условие заключается в том, что keyword блюда
            //    совпадает с dishKeyword.
            const dish = dishes.find(d => d.keyword === keyword);
            if (dish) {
                selectedDishes[dish.category] = dish;
                updateOrder();
            }
        });
    });
    // При клике на кнопку сброса объект
    //  selectedDishes очищается,
    //   устанавливая все его свойства (soup, main, salat, desert, drink) в null.
    // Обработчик для кнопки сброса
    document.querySelector('button[type="reset"]').addEventListener('click', () => {
        selectedDishes = {
            soup: null,
            main: null,
            salat: null,
            desert: null,
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
