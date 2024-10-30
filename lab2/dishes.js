const dishes = [
    {
        keyword: 's_chicken', 
        name: "Суп с курицей", 
        kind: "meat",
        price: 300, 
        category: 'soup', 
        count: '300 мл',
        image: 'soup1.jpg'
    },
    {
        keyword: 's_mushroom',
        name: "Суп с грибами",
        kind: "veg",
        price: 250,
        category: 'soup', 
        count: '300 мл', 
        image: 'soup2.jpg'
    },
    {
        keyword: 's_meat',
        name: "Суп с фрикадельками",
        kind: "meat",
        price: 400,
        category: 'soup', 
        count: '450 мл', 
        image: 'soup4.jpg'
    },
    {
        keyword: 's_fish', 
        name: "Суп с рыбой", 
        kind: "fish",
        price: 350,
        category: 'soup', 
        count: '250 мл', 
        image: 'soup3.jpg'
    },
    {
        keyword: 's_grecha',
        name: "Гречневый суп",
        kind: "veg",
        price: 250,
        category: 'soup', 
        count: '400 мл', 
        image: 'soup5.jpg'
    },
    {
        keyword: 's_miso',
        name: "Мисосуп",
        kind: "fish",
        price: 450,
        category: 'soup', 
        count: '300 мл', 
        image: 'soup6.jpg'
    },
    {
        keyword: 'chicken_potato', 
        name: "Курица с картошкой", 
        kind: "meat",
        price: 300, 
        category: 'main', 
        count: '250 г',
        image: 'dish1.jpg'
    },
    {
        keyword: 'lazaniy', 
        name: "Лазанья", 
        kind: "meat",
        price: 300, 
        category: 'main', 
        count: '250 г',
        image: 'dish2.jpg'
    },
    {
        keyword: 'rise_with_meat', 
        name: "Гуляш с рисом", 
        kind: "meat",
        price: 400, 
        category: 'main', 
        count: '450 г',
        image: 'dish3.jpg'
    },
    {
        keyword: 'fish_min', 
        name: "Рыбное ассорти мини", 
        kind: "fish",
        price: 600, 
        category: 'main', 
        count: '650 г',
        image: 'dish4.jpg'
    },
    {
        keyword: 'fish_max', 
        name: "Рыбное ассорти макси", 
        kind: "fish",
        price: 900, 
        category: 'main', 
        count: '1050 г',
        image: 'dish5.jpg'
    },
    {
        keyword: 'mushroom_pasta', 
        name: "Греческая паста с грибами", 
        kind: "veg",
        price: 500, 
        category: 'main', 
        count: '600 г',
        image: 'dish6.jpg'
    },
    {
        keyword: 'veget_pasta', 
        name: "Греческая паста с овощами", 
        kind: "veg",
        price: 400, 
        category: 'main', 
        count: '600 г',
        image: 'dish7.jpg'
    },
    {
        keyword: 'salat_rukola', 
        name: "Салат с рукколой", 
        kind: "veg",
        price: 300, 
        category: 'salat', 
        count: '400 г',
        image: 'salat1.jpg'
    },
    {
        keyword: 'salat_imbir', 
        name: "Салат с имберем", 
        kind: "veg",
        price: 350, 
        category: 'salat', 
        count: '400 г',
        image: 'salat2.jpg'
    },
    {
        keyword: 'salat_gov', 
        name: "Салат с говядиной", 
        kind: "meat",
        price: 400, 
        category: 'salat', 
        count: '300 г',
        image: 'salat3.jpg'
    },
    {
        keyword: 'salat_indeika', 
        name: "Салат с индейкой", 
        kind: "meat",
        price: 350, 
        category: 'salat', 
        count: '250 г',
        image: 'salat4.jpg'
    },
    {
        keyword: 'salat_tun', 
        name: "Салат с тунцом", 
        kind: "fish",
        price: 400, 
        category: 'salat', 
        count: '250 г',
        image: 'salat5.jpg'
    },
    {
        keyword: 'salat_krevetka', 
        name: "Салат с креветками", 
        kind: "fish",
        price: 500, 
        category: 'salat', 
        count: '350 г',
        image: 'salat6.jpg'
    },
    {
        keyword: 'napoleon', 
        name: "Наполеон", 
        kind: "medium",
        price: 300, 
        category: 'desert', 
        count: '150 г',
        image: 'desert1.jpg'
    },
    {
        keyword: 'ice_cream_min', 
        name: "Шоколадное мороженое", 
        kind: "medium",
        price: 200, 
        category: 'desert', 
        count: '90 г',
        image: 'desert2.jpg'
    },
    {
        keyword: 'ice_cream_max', 
        name: "Snikers мороженое", 
        kind: "large",
        price: 400, 
        category: 'desert', 
        count: '300 г',
        image: 'desert3.jpg'
    },
    {
        keyword: 'panakota', 
        name: "Панакота с орехами", 
        kind: "large",
        price: 350, 
        category: 'desert', 
        count: '250 г',
        image: 'desert4.jpg'
    },
    {
        keyword: 'ulitka', 
        name: "Улитка с изюмом", 
        kind: "small",
        price: 250, 
        category: 'desert', 
        count: '60 г',
        image: 'desert5.jpg'
    },
    {
        keyword: 'halva', 
        name: "Халва", 
        kind: "small",
        price: 150, 
        category: 'desert', 
        count: '50 г',
        image: 'desert6.jpg'
    },
    {
        keyword: 'fruit_drink', 
        name: "Компот", 
        kind: "cold",
        price: 80, 
        category: 'drink', 
        count: '400 мл',
        image: 'drink1.jpg'
    },
    {
        keyword: 'smuzi', 
        name: "Смузи", 
        kind: "cold",
        price: 250, 
        category: 'drink', 
        count: '250 мл',
        image: 'drink2.jpg'
    },
    {
        keyword: 'carrot_drink', 
        name: "Морковный сок", 
        kind: "cold",
        price: 200, 
        category: 'drink', 
        count: '300 мл',
        image: 'drink3.jpg'
    },
    {
        keyword: 'fruit_drink_apple', 
        name: "Компот яблочный", 
        kind: "cold",
        price: 90, 
        category: 'drink', 
        count: '400 мл',
        image: 'drink4.jpg'
    },
    {
        keyword: 'smuzi_banan', 
        name: "Смузи на молоке с бананом", 
        kind: "cold",
        price: 350, 
        category: 'drink', 
        count: '250 мл',
        image: 'drink5.jpg'
    },
    {
        keyword: 'sprite', 
        name: "Спрайт", 
        kind: "cold",
        price: 250, 
        category: 'drink', 
        count: '500 мл',
        image: 'drink6.jpg'
    },
    {
        keyword: 'americano', 
        name: "Американо", 
        kind: "hot",
        price: 200, 
        category: 'drink', 
        count: '100 мл',
        image: 'drink7.jpg'
    },
    {
        keyword: 'mokko', 
        name: "Мокко", 
        kind: "hot",
        price: 200, 
        category: 'drink', 
        count: '200 мл',
        image: 'drink8.jpg'
    },
    {
        keyword: 'tea', 
        name: "Чай", 
        kind: "hot",
        price: 150, 
        category: 'drink', 
        count: '300 мл',
        image: 'drink9.jpg'
    }

    
];

