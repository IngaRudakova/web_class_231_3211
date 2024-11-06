
// document.addEventListener("DOMContentLoaded", () => {
//     const soupSection = document.querySelector("#soup-section .dishes");
//     const mainSection = document.querySelector("#main-section .dishes");
//     const salatSection = document.querySelector("#salat-section .dishes");
//     const desertSection = document.querySelector("#desert-section .dishes");
//     const drinkSection = document.querySelector("#drink-section .dishes");

//     dishes.sort((a, b) => a.name.localeCompare(b.name));

//     dishes.forEach(dish => { 
//         const dishElement = document.createElement("div");
//         dishElement.classList.add("dish");
//         dishElement.setAttribute("data-dish", dish.keyword);// устанавливает арибует data-dish

//         dishElement.innerHTML = ` 
//             <img src="${dish.image}" alt="${dish.name}">
//             <div class="dish-info">
//                 <p class="kind">${dish.kind}</p>
//                 <p class="name">${dish.name}</p>
//                 <p class="price">${dish.price}₽</p>
//                 <p class="weight">${dish.count}</p>
//                 <button class="add">Добавить</button>
//             </div>
//         `;
// // блюда в нужную секцию
//         if (dish.category === "soup") {
//             soupSection.appendChild(dishElement);
//         } else if (dish.category === "main") {
//             mainSection.appendChild(dishElement);
//         } else if (dish.category === "salat") {
//             salatSection.appendChild(dishElement);
//         } else if (dish.category === "desert") {
//             desertSection.appendChild(dishElement);   
//         } else if (dish.category === "drink") {
//             drinkSection.appendChild(dishElement);
//         }
//     });
//     /////////////////////////////
//     function renderDishes(category) {
//         const container = document.querySelector(`.category[data-category="${category}"] .dish-container`);
//         container.innerHTML = '';
//         const filteredDishes = dishes.filter(dish => dish.category === category);
        
//         filteredDishes.forEach(dish => {
//             const dishElement = document.createElement('div');
//             dishElement.classList.add('dish');
//             dishElement.textContent = dish.name;
//             container.appendChild(dishElement);
//         });
//     }
    
//     function filterDishes(category, kind) {
//         const container = document.querySelector(`.category[data-category="${category}"] .dishes`);
//         const filteredDishes = dishes.filter(dish => dish.category === category && dish.kind === kind);
//         container.innerHTML = '';
    
//         filteredDishes.forEach(dish => {
//             const dishElement = document.createElement('div');
//             dishElement.classList.add('dish');
//             dishElement.textContent = dish.name;
//             container.appendChild(dishElement);
//         });
//     }
//     document.querySelectorAll('.filter-button').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const category = event.target.closest('.category').dataset.category;
//             const kind = event.target.dataset.kind;
    
//             if (event.target.classList.contains('active')) {
//                 event.target.classList.remove('active');
//                 renderDishes(category);
//             } else {
//                 document.querySelectorAll(`.category[data-category="${category}"] .filter-button`).forEach(btn => btn.classList.remove('active'));
//                 event.target.classList.add('active');
//                 filterDishes(category, kind);
//             }
//         });
//     });  
//     ////////////////////////////  
//     //определение элементов формы заказа
//     const orderForm = {
//         soup: document.getElementById("selected-soup"),
//         main: document.getElementById("selected-main-dish"),
//         salat: document.getElementById("selected-salat"),
//         desert: document.getElementById("selected-desert"),
//         drink: document.getElementById("selected-drink"),
//         totalPrice: document.querySelector("#total-price .price-value")
//     };

//     let selectedDishes = {
//         soup: null,
//         main: null,
//         salat: null,
//         desert: null,
//         drink: null
//     };
//     const updateOrder = () => {
//         let total = 0;
//         let isAnyDishSelected = false;
// // обновляем информацию 
//         for (let category in selectedDishes) {
//             if (selectedDishes[category]) {
//                 orderForm[category].textContent = `${selectedDishes[category].name} ${selectedDishes[category].price}₽`;
//                 total += selectedDishes[category].price;
//                 isAnyDishSelected = true;
//             } else {
//                 orderForm[category].textContent = "Не выбрано";
//             }
//         }
// // определение элементов для отображения сообщений и блоков заказа
//         const noSelectionMessage = document.getElementById("no-selection-message");
//         const soupOrder = document.getElementById("soup-order");
//         const mainOrder = document.getElementById("main-order");
//         const salatOrder = document.getElementById("salat-order");
//         const desertOrder = document.getElementById("desert-order");
//         const drinkOrder = document.getElementById("drink-order");
//         const totalPriceBlock = document.getElementById("total-price-block");

        
//         if (!isAnyDishSelected) {
//             noSelectionMessage.style.display = 'block';
//             soupOrder.style.display = 'none';
//             mainOrder.style.display = 'none';
//             salatOrder.style.display = 'none';
//             desertOrder.style.display = 'none';
//             drinkOrder.style.display = 'none';
//             totalPriceBlock.style.display = 'none';
//         } else {
//             noSelectionMessage.style.display = 'none';
//             soupOrder.style.display = 'block';
//             mainOrder.style.display = 'block';
//             salatOrder.style.display = 'block';
//             desertOrder.style.display = 'block';
//             drinkOrder.style.display = 'block';
//             totalPriceBlock.style.display = 'block';
//             orderForm.totalPrice.textContent = `${total}₽`;
//         }
//     };
// // найти в массиве
//     document.querySelectorAll(".dish").forEach(dishElement => {
//         dishElement.addEventListener("click", (event) => {
//             const dishKeyword = dishElement.getAttribute("data-dish");
//             const dish = dishes.find(d => d.keyword === dishKeyword);

//             if (dish) {
//                 selectedDishes[dish.category] = dish;
//                 updateOrder();
//             }
//         });
//     });
//     /////////
//     document.querySelectorAll('.filter-button').forEach(button => {
//         button.addEventListener('click', (event) => {
//             const category = event.target.closest('.category').dataset.category;
//             const kind = event.target.dataset.kind;
    
//             if (event.target.classList.contains('active')) {
//                 event.target.classList.remove('active');
//                 renderDishes(category);
//             } else {
//                 document.querySelectorAll(`.category[data-category="${category}"] .filter-button`).forEach(btn => btn.classList.remove('active'));
//                 event.target.classList.add('active');
//                 filterDishes(category, kind);
//             }
//         });
//     });  
//     ////////////////////////////  
// });

document.addEventListener("DOMContentLoaded", () => {
    const soupSection = document.querySelector("#soup-section .dishes");
    const mainSection = document.querySelector("#main-section .dishes");
    const salatSection = document.querySelector("#salat-section .dishes");
    const desertSection = document.querySelector("#desert-section .dishes");
    const drinkSection = document.querySelector("#drink-section .dishes");

    dishes.sort((a, b) => a.name.localeCompare(b.name));
///////////////////

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

    // Отображение всех категорий блюд
    renderDishes(soupSection, 'soup');
    renderDishes(mainSection, 'main');
    renderDishes(salatSection, 'salat');
    renderDishes(desertSection, 'desert');
    renderDishes(drinkSection, 'drink');

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
        main: document.getElementById("selected-main-dish"),
        salat: document.getElementById("selected-salat"),
        desert: document.getElementById("selected-desert"),
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
        const mainOrder = document.getElementById("main-order");
        const salatOrder = document.getElementById("salat-order");
        const desertOrder = document.getElementById("desert-order");
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

    // Найти в массиве и добавить в заказ
    document.querySelectorAll(".dish").forEach(dishElement => {
        dishElement.addEventListener("click", (event) => {
            const dishKeyword = dishElement.getAttribute("data-dish");
            const dish = dishes.find(d => d.keyword === dishKeyword);
            if (dish) {
                selectedDishes[dish.category] = dish;
                updateOrder();
            }
        });
    });

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
});