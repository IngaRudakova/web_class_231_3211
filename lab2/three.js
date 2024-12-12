// нет цены в апи как передовать непонятно //done
// почему то главное блюдо пропадает в списках //done
// исправить чтобы вместо индексов  в "редактировать " были названия блюд //done
// сделать красивое "редактировать"

document.addEventListener('DOMContentLoaded', () => {
    // Ключ API для доступа к данным блюд
    const apiKey = '65f931a2-29e2-4ca0-b490-5a19bb332145';

    // Объект для хранения названий блюд по категориям
    const dishTitles = {
        soup: {},
        mainCourse: {},
        salad: {},
        drink: {},
        dessert: {}
    };

    // Массив для хранения заказов
    let orders = [];

    // Объект для хранения цен всех блюд
    const allDishPrice = {}

    // Асинхронная функция для загрузки блюд
    async function loadDishes() {
        try {
            // Отправка запроса на сервер для получения данных блюд
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=${apiKey}`);
            // Проверка успешности запроса
            if (!response.ok) {
                throw new Error('Ошибка при загрузке блюд');
            }

            // Преобразование ответа в формат JSON
            const dishes = await response.json();
            console.log('DISHES', dishes);

            // Перебор каждого блюда и добавление его в соответствующую категорию
            dishes.forEach(dish => {
                let category = dish.category;

                // Преобразование категории 'main-course' в 'mainCourse'
                if (category === 'main-course') {
                    category = 'mainCourse';
                }

                // Проверка наличия категории в объекте dishTitles
                if (!dishTitles[category]) {
                    console.warn(`Неизвестная категория блюда: ${category}`);
                    return;
                }

                // Добавление названия блюда в соответствующую категорию
                dishTitles[category][dish.id] = dish.name;

            });

            // Перебор каждого блюда и добавление его цены в объект allDishPrice
            dishes.forEach(dish => {
                allDishPrice[dish.id] = dish.price;

            });
            console.log('DISHPR', allDishPrice)

        } catch (error) {
            // Обработка ошибок и вывод сообщения об ошибке в консоль
            console.error('Ошибка:', error);
            showNotification('Ошибка при загрузке блюд');
        }
    }


    async function loadOrders() {
        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Не удалось получить данные заказов');
            }

            orders = await response.json();
            populateTable(orders);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    function getDishName(type, id) {
        return dishTitles[type][id] || '';
    }



/////////////////////
    function updateOrderSummary(order) {

        console.log('seeeeeeee',order)
        let totalCost = 0;

        
        const dishIds = {
            [order.soup_id]: null,
            [order.main_course_id]: null,
            [order.salad_id]: null,
            [order.drink_id]: null,
            [order.dessert_id]: null,
        };
        
        console.log('DISHIDDD', dishIds)
        console.log('ALLDISHPR', allDishPrice)
        Object.keys(dishIds).forEach(dishKey => {
            if (dishKey) {
                Object.keys(allDishPrice).forEach(allDishPriceKey => {
                    if (dishKey === allDishPriceKey) {
                        dishIds[dishKey] = allDishPrice[allDishPriceKey];
                        totalCost += allDishPrice[allDishPriceKey]; // здесь
                    }
                });
            }
        });
   
        console.log('totcost' , totalCost)
        return totalCost;
    }




    function populateTable(orders) {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';

        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            console.log('order', order);



            const dishesArray = [
                getDishName('soup', order.soup_id),
                getDishName('mainCourse', order.main_course_id),
                getDishName('salad', order.salad_id),
                getDishName('drink', order.drink_id),
                getDishName('dessert', order.dessert_id)
            ];

            const filteredDishes = dishesArray.filter(dish => dish);
            const dishes = filteredDishes.join(', ');
            const totalSum = updateOrderSummary(order);
            const deliveryTime = order.delivery_type === 'now' ? 'Как можно быстрее' : order.delivery_time;
            row.innerHTML = `
            <td>${index + 1}</td>
            <td>${new Date(order.created_at).toLocaleString()}</td>
            <td>${dishes}</td>
            <td>${totalSum}</td>
            <td>${deliveryTime}</td>
            <td>
                <span class="action-buttons">
                    <button class="view" title="Просмотреть" data-order-id="${order.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <button class="edit" title="Редактировать" data-order-id="${order.id}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="delete" title="Удалить" data-order-id="${order.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </span>
            </td>
        `;
            orderList.appendChild(row);
        });

        document.querySelectorAll('.view').forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.getAttribute('data-order-id');
                openViewModal(orderId);
            });
        });

        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.getAttribute('data-order-id');
                openEditModal(orderId);
                
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.getAttribute('data-order-id');
                openDeleteModal(orderId);
            });
        });
    }


    function takeName(dish_id) {
        // Перебор всех категорий в dishTitles
        for (let category in dishTitles) {
            // Проверка, если нужный идентификатор блюда есть в текущей категории
            if (dishTitles[category][dish_id]) {
                console.log('DDDDD', dishTitles[category][dish_id])
                return dishTitles[category][dish_id]; // Возврат названия блюда
            }
        }
        
        console.warn(`Блюдо с ID ${dish_id} не найдено.`);
        return 'Не выбрано'; // Возвращаем пустую строку, если блюда нет в списке
    }
    function takePrice(dish_id) {
        // Перебор всех категорий в 
        // for (let category in allDishPrice) {
        //     // Проверка, если нужный идентификатор блюда есть в текущей категории
            if (allDishPrice[dish_id]) {
                console.log('DDDDD', allDishPrice[dish_id])
                return allDishPrice[dish_id]; // Возврат названия блюда
            
        }
        
        console.warn(`Блюдо с ID ${dish_id} не найдено.`);
        return '0'; // Возвращаем пустую строку, если блюда нет в списке
    }

    function getGoodPage (order) {
        const items = {
            soup: getDishName('soup', order.soup_id),
            mainCourse: getDishName('mainCourse', order.main_course_id),
            salad: getDishName('salad', order.salad_id),
            drink: getDishName('drink', order.drink_id),
            dessert: getDishName('dessert', order.dessert_id)
            
        };
        // Карта перевода ключей
        const translationMap = {
            soup: "Суп",
            mainCourse: "Основное блюдо",
            salad: "Салат",
            drink: "Напиток",
            dessert: "Десерт"
        };
        
        // Новый словарь items2 с русскими ключами
        const items2 = {};
        
        for (const key in items) {
            if (items.hasOwnProperty(key) && items[key]) {
                // Перевод ключа и добавление в новый словарь
                const translatedKey = translationMap[key];
                items2[translatedKey] = items[key];
            }
        }
        
        console.log('ITEMSSS', items);
        console.log('ITEMSS2', items2);
        return items2;
    }




    function openViewModal(orderId) {
        const order = orders.find(o => o.id === parseInt(orderId));
        if (!order) {
            console.error('Order not found');
            return;
        }

        // Заполняем данные заказа в модальное окно
        document.getElementById('viewOrderDate').innerText = `Дата оформления: ${new Date(order.created_at).toLocaleString()}`;
        document.getElementById('viewOrderDelivery').innerHTML = `


            <div class="order-details">
                <div class="field-names">
                    <p>Имя:</p>
                    <p>Адрес:</p>
                    <p>Время доставки:</p>
                    <p>Телефон:</p>
                    <p>Email:</p>
                </div>
                <div class="field-values">
                    <p>${order.full_name}</p>
                    <p>${order.delivery_address}</p>
                    <p>${order.delivery_type === 'now' ? 'Сейчас' : order.delivery_time}</p>
                    <p>${order.phone}</p>
                    <p>${order.email}</p>
                </div>
            </div>



        `;
        document.getElementById('viewOrderComment').innerText = order.comment || 'Без комментария';

        const items2 = getGoodPage(order);
        document.getElementById('viewOrderItems').innerHTML = 
        
        `
        <div class="order-details">
                <div class="field-names">
                    ${Object.keys(items2).map(key => `<p>${key}</p>`).join('')}
                </div>
                <div class="field-values">
                    ${Object.values(items2).map(value => `<p>${value}</p>`).join('')}
                </div>

            </div>
        
        
        
    
        
        
        `;



        document.getElementById('viewOrderCost').innerText = `Стоимость: ${updateOrderSummary(order)} руб.`;

        // Отображаем модальное окно
        document.getElementById('viewModal').style.display = 'block';
    }

    function openEditModal(orderId) {
        const order = orders.find(o => o.id === parseInt(orderId));
        const form = document.getElementById('editOrderForm');
        form.querySelector('[name="order-date"]').value = new Date(order.created_at).toLocaleString();
        form.querySelector('[name="full_name"]').value = order.full_name;
        form.querySelector('[name="email"]').value = order.email;
        form.querySelector('[name="phone"]').value = order.phone;
        form.querySelector('[name="delivery_address"]').value = order.delivery_address;
        form.querySelector(`[name="delivery_type"][value="${order.delivery_type}"]`).checked = true;
        form.querySelector('[name="delivery_time"]').value = order.delivery_time;
        form.querySelector('[name="comment"]').value = order.comment;

        ////

        
    
        

        form.querySelector('[name="soup_id"]').value = takeName(order.soup_id);
        console.log('TAKENAME', `${takeName(order.soup_id)}`)
        //form.querySelector('[name="soup_id"]').value = order.soup_id;
        
        form.querySelector('[name="main_course_id"]').value = takeName(order.main_course_id);
        form.querySelector('[name="salad_id"]').value = takeName(order.salad_id);
        form.querySelector('[name="drink_id"]').value = takeName(order.drink_id);
        form.querySelector('[name="dessert_id"]').value = takeName(order.dessert_id);


    
        // Заполняем цены блюд
        document.getElementById('soup_price').innerText = `${takePrice(order.soup_id)} руб.`;
        document.getElementById('main_course_price').innerText = `${takePrice(order.main_course_id)} руб.`;
        document.getElementById('salad_price').innerText = `${takePrice(order.salad_id)} руб.`;
        document.getElementById('drink_price').innerText = `${takePrice(order.drink_id)} руб.`;
        document.getElementById('dessert_price').innerText = `${takePrice(order.dessert_id)} руб.`;
    
        document.getElementById('editModal').style.display = 'block';
        document.getElementById('saveEditOrder').setAttribute('data-order-id', orderId);
    }
    
    function getDishPrice(type, id) {
        const dish = dishTitles[type][id];
        return dish ? dish.price : 0;
    }
    

    function openDeleteModal(orderId) {
        document.getElementById('deleteModal').style.display = 'block';
        document.getElementById('confirmDeleteOrder').setAttribute('data-order-id', orderId);
    }

    document.querySelectorAll('.close').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            closeModal();
        });
    });

    // кнопка ок и отмена
    document.getElementById('cancelDeleteOrder').addEventListener('click', closeModal);
    document.getElementById('cancelEditOrder').addEventListener('click', closeModal);
    document.getElementById('closeViewModal').addEventListener('click', closeModal);

    //Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.
//Его особенность заключается в том,
//  что методы для работы с сетью, например fetch, позволяют указать объект FormData в свойстве тела запроса body.

// сервер видит как обычная отправка формы и не обязательно прописывать все поля так как берется из штмл файл 



// Объекты FormData используются, 
// чтобы взять данные из HTML-формы и отправить их с помощью fetch или 
// другого метода для работы с сетью.

// Мы можем создать такой объект уже с данными,
//  передав в конструктор HTML-форму – new FormData(form),
//   или же можно создать объект вообще без формы и затем добавить к нему поля с помощью методов
    // Добавление обработчика события для кнопки сохранения изменений заказа
document.getElementById('saveEditOrder').addEventListener('click', async () => {
    // Получение ID заказа из атрибута data-order-id кнопки
    const orderId = document.getElementById('saveEditOrder').getAttribute('data-order-id');

    // Создание объекта FormData из формы редактирования заказа
    const formData = new FormData(document.getElementById('editOrderForm'));

    // Создание объекта с данными заказа на основе данных из формы
    const orderData = {
        full_name: formData.get('full_name'), // Получение полного имени
        email: formData.get('email'), // Получение email
        phone: formData.get('phone'), // Получение телефона
        delivery_address: formData.get('delivery_address'), // Получение адреса доставки
        delivery_type: formData.get('delivery_type'), // Получение типа доставки
        delivery_time: formData.get('delivery_time'), // Получение времени доставки
        comment: formData.get('comment'), // Получение комментария
        soup_id: formData.get('soup_id'), // Получение ID супа
        main_course_id: formData.get('main_course_id'), // Получение ID основного блюда
        salad_id: formData.get('salad_id'), // Получение ID салата
        drink_id: formData.get('drink_id'), // Получение ID напитка
        dessert_id: formData.get('dessert_id') // Получение ID десерта
    };

    try {
        // Отправка запроса на сервер для обновления данных заказа
        const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`, {
            method: 'PUT', // Метод запроса - PUT (обновление данных)
            headers: {
                'Content-Type': 'application/json' // Установка заголовка Content-Type для отправки данных в формате JSON
            },
            body: JSON.stringify(orderData) // Преобразование объекта orderData в строку JSON и отправка в теле запроса
        });

        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error('Ошибка при обновлении заказа'); // Генерация ошибки, если запрос не удался
        }

        // Отображение уведомления об успешном обновлении заказа
        showNotification('Заказ успешно обновлен');

        // Закрытие модального окна редактирования заказа
        closeModal();

        // Перезагрузка списка заказов
        loadOrders();
    } catch (error) {
        // Обработка ошибок и вывод сообщения об ошибке в консоль
        console.error('Ошибка:', error);

        // Отображение уведомления об ошибке при обновлении заказа
        showNotification('Ошибка при обновлении заказа');
    }
});


    document.getElementById('confirmDeleteOrder').addEventListener('click', async () => {
        const orderId = document.getElementById('confirmDeleteOrder').getAttribute('data-order-id');

        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${orderId}?api_key=${apiKey}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении заказа');
            }

            showNotification('Заказ успешно удален');
            closeModal();
            orders = orders.filter(order => order.id !== parseInt(orderId));
            populateTable(orders);
        } catch (error) {
            console.error('Ошибка:', error);
            showNotification('Ошибка при удалении заказа');
        }
    });

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    function showNotification(message) {
        alert(message);
    }

    loadDishes();
    loadOrders();

    

});
