// Статусы заказов
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "\u0412 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438";
    OrderStatus["Confirmed"] = "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0435\u043D";
    OrderStatus["Shipped"] = "\u0412 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0435";
    OrderStatus["Delivered"] = "\u0414\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D";
    OrderStatus["Canceled"] = "\u041E\u0442\u043C\u0435\u043D\u0435\u043D";
})(OrderStatus || (OrderStatus = {}));
// Класс товара
var Product = /** @class */ (function () {
    function Product(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    return Product;
}());
// Класс корзины
var Cart = /** @class */ (function () {
    function Cart() {
        this.items = [];
    }
    // Добавить товар в корзину
    Cart.prototype.addProduct = function (product, quantity) {
        var existingItem = this.items.find(function (item) { return item.product.id === product.id; });
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            this.items.push({ product: product, quantity: quantity });
        }
        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u043E ".concat(quantity, " ").concat(product.name, " \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443"));
    };
    // Удалить товар из корзины
    Cart.prototype.removeProduct = function (productId) {
        this.items = this.items.filter(function (item) { return item.product.id !== productId; });
        console.log("\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0441 ID ".concat(productId, " \u0443\u0431\u0440\u0430\u043D \u0438\u0437 \u043A\u043E\u0440\u0437\u0438\u043D\u044B"));
    };
    // Показать содержимое корзины
    Cart.prototype.viewCart = function () {
        if (this.items.length === 0) {
            console.log("Корзина пуста");
        }
        else {
            console.log("Товары в корзине:");
            this.items.forEach(function (item) {
                console.log("\u0422\u043E\u0432\u0430\u0440: ".concat(item.product.name, ", \u041A\u043E\u043B-\u0432\u043E: ").concat(item.quantity, ", \u041E\u0431\u0449\u0430\u044F \u0446\u0435\u043D\u0430: $").concat(item.product.price * item.quantity));
            });
        }
    };
    // Очистить корзину
    Cart.prototype.clearCart = function () {
        this.items = [];
        console.log("Корзина очищена");
    };
    // Получить текущие товары в корзине
    Cart.prototype.getItems = function () {
        return this.items;
    };
    return Cart;
}());
// Класс заказа
var Order = /** @class */ (function () {
    function Order(id, items) {
        this.id = id;
        this.items = items;
        this.status = OrderStatus.Pending;
    }
    // Изменить статус заказа
    Order.prototype.changeStatus = function (status) {
        this.status = status;
        console.log("\u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 ".concat(this.id, " \u0438\u0437\u043C\u0435\u043D\u0435\u043D \u043D\u0430 ").concat(status));
    };
    // Показать информацию о заказе
    Order.prototype.viewOrder = function () {
        console.log("ID \u0437\u0430\u043A\u0430\u0437\u0430: ".concat(this.id, ", \u0421\u0442\u0430\u0442\u0443\u0441: ").concat(this.status));
        this.items.forEach(function (item) {
            console.log("\u0422\u043E\u0432\u0430\u0440: ".concat(item.product.name, ", \u041A\u043E\u043B-\u0432\u043E: ").concat(item.quantity, ", \u041E\u0431\u0449\u0430\u044F \u0446\u0435\u043D\u0430: $").concat(item.product.price * item.quantity));
        });
    };
    return Order;
}());
// Класс для управления товарами
var ProductManager = /** @class */ (function () {
    function ProductManager() {
        this.products = [];
    }
    // Добавить товар
    ProductManager.prototype.addProduct = function (product) {
        this.products.push(product);
        console.log("\u0422\u043E\u0432\u0430\u0440 ".concat(product.name, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043D\u0430\u043B\u0438\u0447\u0438\u0435"));
    };
    // Удалить товар
    ProductManager.prototype.removeProduct = function (productId) {
        this.products = this.products.filter(function (product) { return product.id !== productId; });
        console.log("\u0422\u043E\u0432\u0430\u0440 \u0441 ID ".concat(productId, " \u0443\u0434\u0430\u043B\u0435\u043D \u0438\u0437 \u043D\u0430\u043B\u0438\u0447\u0438\u044F."));
    };
    // Показать все товары
    ProductManager.prototype.viewProducts = function () {
        console.log("Товаы в наличии:");
        this.products.forEach(function (product) {
            console.log("ID: ".concat(product.id, ", \u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435: ").concat(product.name, ", \u0426\u0435\u043D\u0430: $").concat(product.price, ", \u041E\u0441\u0442\u0430\u0442\u043E\u043A: ").concat(product.stock));
        });
    };
    // Найти товар по ID
    ProductManager.prototype.getProductById = function (productId) {
        return this.products.find(function (product) { return product.id === productId; });
    };
    return ProductManager;
}());
// Класс для управления заказами
var OrderManager = /** @class */ (function () {
    function OrderManager() {
        this.orders = [];
        this.orderIdCounter = 1;
    }
    // Добавить новый заказ
    OrderManager.prototype.createOrder = function (cart) {
        var items = cart.getItems();
        var order = new Order(this.orderIdCounter++, items);
        this.orders.push(order);
        cart.clearCart();
        console.log("\u0417\u0430\u043A\u0430\u0437 ".concat(order.id, " \u0441\u043E\u0437\u0434\u0430\u043D"));
        return order;
    };
    // Показать все заказы
    OrderManager.prototype.viewOrders = function () {
        if (this.orders.length === 0) {
            console.log("Заказы не найдены");
        }
        else {
            console.log("Все заказы:");
            this.orders.forEach(function (order) { return order.viewOrder(); });
        }
    };
    // Найти заказ по ID
    OrderManager.prototype.getOrderById = function (orderId) {
        return this.orders.find(function (order) { return order.id === orderId; });
    };
    return OrderManager;
}());
// Пример использования системы
var productManager = new ProductManager();
var orderManager = new OrderManager();
var cart = new Cart();
// Создаем товары
var product1 = new Product(1, "Ноутбук", 1000, 10);
var product2 = new Product(2, "Телефон", 500, 20);
var product3 = new Product(3, "Наушники", 100, 50);
// Добавляем товары в менеджер товаров
productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
// Показать все товары
productManager.viewProducts();
// Добавляем товары в корзину
cart.addProduct(product1, 2);
cart.addProduct(product3, 1);
cart.viewCart();
// Создаем заказ
var order1 = orderManager.createOrder(cart);
order1.viewOrder();
// Меняем статус заказа
order1.changeStatus(OrderStatus.Confirmed);
// Показать все заказы
orderManager.viewOrders();
