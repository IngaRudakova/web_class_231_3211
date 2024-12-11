
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '65f931a2-29e2-4ca0-b490-5a19bb332145';

    const dishTitles = {
        soup: {},
        mainCourse: {},
        salad: {},
        drink: {},
        dessert: {}
    };

    async function loadDishes() {
        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке блюд');
            }
    
            const dishes = await response.json();
            console.log('ddd', dishes);
    
            // Заполняем dishTitles, распределяя блюда по их категориям
            dishes.forEach(dish => {
                // Убедитесь, что категория существует в dishTitles
                if (!dishTitles[dish.category]) {
                    console.warn(`Неизвестная категория блюда: ${dish.category}`);
                    return;
                }
    
                // Назначаем имя блюда его идентификатору внутри соответствующей категории
                dishTitles[dish.category][dish.id] = dish.name;
                
            });
    
            console.log('Загруженные блюда:', dishTitles);
        } catch (error) {
            console.error('Ошибка:', error);
            // showNotification предполагается, что существует, чтобы отображать уведомления пользователю
            showNotification('Ошибка при загрузке блюд');
        }
    }
    function updateOrderSummary() {
        let totalCost = 0;

        Object.values(selectedDishes).forEach(dish => {
            if (dish) {
                totalCost += parseInt(dish.price);
            }
        });
    }

    loadDishes();

    async function loadOrders() {
        try {
            const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Не удалось получить данные заказов');
            }

            const orders = await response.json();
            populateTable(orders);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    function getDishName(type, id) {
        console.log('dishTitles[type][id]', dishTitles[type][id])
        return dishTitles[type][id];
    }


    function getSum(dishesArray, dishTitles) {
        let totalSum = 0;
    
        for (let i = 0; i < dishesArray.length; i++) {
            let dish = dishesArray[i];
            if (dishTitles[dish] !== undefined) {
                totalSum += dishTitles[dish];
            }
        }
    
        return totalSum;
    }


    function populateTable(orders) {
        const orderList = document.getElementById('orderList');
        orderList.innerHTML = '';

        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        orders.forEach((order, index) => {
            const row = document.createElement('tr');

            const dishesArray = [
                getDishName('soup', order.soup_id),
                getDishName('mainCourse', order.main_course_id),
                getDishName('salad', order.salad_id),
                getDishName('drink', order.drink_id),
                getDishName('dessert', order.dessert_id)
            ]

            const filteredDishes = dishesArray.filter(dish => dish);
            const dishes = filteredDishes.join(', ');
            console.log('dishesArray', dishes)
            console.log('dishesArray1', filteredDishes)
            ///tyt



            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.created_at.slice(0, 10)} ${order.created_at.slice(11, -3)}</td>
                <td>${dishes}</td>
                
                
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>
                    <span class="actions">
                        <button class="view" title="Просмотреть">&#128065;</button>
                        <button class="edit" title="Редактировать">&#9998;</button>
                        <button class="delete" title="Удалить">&#128465;</button>
                    </span>
                </td>
            `;
            orderList.appendChild(row);
        });
    }

    loadOrders();
});



// //////////////////////////////////22222222
// document.addEventListener('DOMContentLoaded', () => {
//     const apiKey = 'dcb5d2ae-8c34-4792-96a9-b8819055c047';

//     const dishTitles = {
//         soup: { 1: "Гаспачо", 2: "Борщ" },
//         mainCourse: { 2: "Курица гриль" },
//         salad: { 3: "Цезарь" },
//         drink: { 4: "Кола" },
//         dessert: { 5: "Тирамису" }
//     };

//     async function loadOrders() {
//         try {
//             const response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders?api_key=${apiKey}`);
//             if (!response.ok) {
//                 throw new Error('Не удалось получить данные заказов');
//             }

//             const orders = await response.json();
//             populateTable(orders);
//         } catch (error) {
//             console.error('Ошибка:', error);
//         }
//     }

//     function getDishName(type, id) {
//         return dishTitles[type][id] || "Неизвестно";
//     }

//     function populateTable(orders) {
//         const orderList = document.getElementById('orderList');
//         orderList.innerHTML = '';

//         orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

//         orders.forEach((order, index) => {
//             const row = document.createElement('tr');

//             const dishes = [
//                 getDishName('soup', order.soup_id),
//                 getDishName('mainCourse', order.main_course_id),
//                 getDishName('salad', order.salad_id),
//                 getDishName('drink', order.drink_id),
//                 getDishName('dessert', order.dessert_id)
//             ].join(', ');

//             row.innerHTML = `
//                 <td>${index + 1}</td>
//                 <td>${order.full_name}</td>
//                 <td>${order.email}</td>
//                 <td>${order.phone}</td>
//                 <td>${order.delivery_address}</td>
//                 <td>${order.delivery_type}</td>
//                 <td>${order.delivery_time.slice(0, 5)}</td>
//                 <td>${order.comment || ''}</td>
//                 <td>${dishes}</td>
//                 <td>${new Date(order.created_at).toLocaleString()}</td>
//                 <td>
//                     <span class="actions">
//                         <button class="view" title="Просмотреть">&#128065;</button>
//                         <button class="edit" title="Редактировать">&#9998;</button>
//                         <button class="delete" title="Удалить">&#128465;</button>
//                     </span>
//                 </td>
//             `;
//             orderList.appendChild(row);
//         });
//     }

//     loadOrders();
// });
