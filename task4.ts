// Статусы заказов
enum OrderStatus {
    Pending = "В ожидании",
    Confirmed = "Подтвержен",
    Shipped = "В доставке",
    Delivered = "Доставлен",
    Canceled = "Отменен",
}

// Интерфейс товара
interface IProduct {
    id: number;
    name: string;
    price: number;
    stock: number;
}

// Интерфейс корзины
interface ICartItem {
    product: Product;
    quantity: number;
}

// Класс товара
class Product implements IProduct {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number
    ) {}
}

// Класс корзины
class Cart {
    private items: ICartItem[] = [];

    // Добавить товар в корзину
    addProduct(product: Product, quantity: number): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        console.log(`Добавленно ${quantity} ${product.name} в корзину`);
    }

    // Удалить товар из корзины
    removeProduct(productId: number): void {
        this.items = this.items.filter(item => item.product.id !== productId);
        console.log(`Продукт с ID ${productId} убран из корзины`);
    }

    // Показать содержимое корзины
    viewCart(): void {
        if (this.items.length === 0) {
            console.log("Корзина пуста");
        } else {
            console.log("Товары в корзине:");
            this.items.forEach(item => {
                console.log(
                    `Товар: ${item.product.name}, Кол-во: ${item.quantity}, Общая цена: $${item.product.price * item.quantity}`
                );
            });
        }
    }

    // Очистить корзину
    clearCart(): void {
        this.items = [];
        console.log("Корзина очищена");
    }

    // Получить текущие товары в корзине
    getItems(): ICartItem[] {
        return this.items;
    }
}

// Класс заказа
class Order {
    public id: number;
    public status: OrderStatus;
    public items: ICartItem[];

    constructor(id: number, items: ICartItem[]) {
        this.id = id;
        this.items = items;
        this.status = OrderStatus.Pending;
    }

    // Изменить статус заказа
    changeStatus(status: OrderStatus): void {
        this.status = status;
        console.log(`Статус заказа ${this.id} изменен на ${status}`);
    }

    // Показать информацию о заказе
    viewOrder(): void {
        console.log(`ID заказа: ${this.id}, Статус: ${this.status}`);
        this.items.forEach(item => {
            console.log(
                `Товар: ${item.product.name}, Кол-во: ${item.quantity}, Общая цена: $${item.product.price * item.quantity}`
            );
        });
    }
}

// Класс для управления товарами
class ProductManager {
    private products: Product[] = [];

    // Добавить товар
    addProduct(product: Product): void {
        this.products.push(product);
        console.log(`Товар ${product.name} добавлен в наличие`);
    }

    // Удалить товар
    removeProduct(productId: number): void {
        this.products = this.products.filter(product => product.id !== productId);
        console.log(`Товар с ID ${productId} удален из наличия.`);
    }

    // Показать все товары
    viewProducts(): void {
        console.log("Товаы в наличии:");
        this.products.forEach(product => {
            console.log(
                `ID: ${product.id}, Название: ${product.name}, Цена: $${product.price}, Остаток: ${product.stock}`
            );
        });
    }

    // Найти товар по ID
    getProductById(productId: number): Product | undefined {
        return this.products.find(product => product.id === productId);
    }
}

// Класс для управления заказами
class OrderManager {
    private orders: Order[] = [];
    private orderIdCounter: number = 1;

    // Добавить новый заказ
    createOrder(cart: Cart): Order {
        const items = cart.getItems();
        const order = new Order(this.orderIdCounter++, items);
        this.orders.push(order);
        cart.clearCart();
        console.log(`Заказ ${order.id} создан`);
        return order;
    }

    // Показать все заказы
    viewOrders(): void {
        if (this.orders.length === 0) {
            console.log("Заказы не найдены");
        } else {
            console.log("Все заказы:");
            this.orders.forEach(order => order.viewOrder());
        }
    }

    // Найти заказ по ID
    getOrderById(orderId: number): Order | undefined {
        return this.orders.find(order => order.id === orderId);
    }
}

// Пример использования системы
const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();

// Создаем товары
const product1 = new Product(1, "Ноутбук", 1000, 10);
const product2 = new Product(2, "Телефон", 500, 20);
const product3 = new Product(3, "Наушники", 100, 50);

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
const order1 = orderManager.createOrder(cart);
order1.viewOrder();

// Меняем статус заказа
order1.changeStatus(OrderStatus.Confirmed);

// Показать все заказы
orderManager.viewOrders();