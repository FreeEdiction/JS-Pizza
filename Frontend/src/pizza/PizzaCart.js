/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
//var Storage	=	require('../storage');
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var Storage	=	require("../storage");




//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    //Приклад реалізації, можна робити будь-яким іншим способом
    var x = false;
    for(var i = 0 ; i<Cart.length;i++){
        if(Cart[i].pizza.title == pizza.title && Cart[i].size == size){
           Cart[i].quantity+=1;
            x = true;
        }
    }
if(x==false) {
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });
}
    //Оновити вміст кошика на сторінці
    updateCart();
    x= false;
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
var copy=[];
for(var i = 0 ; i<Cart.length;i++){
    if(Cart[i].pizza.title == cart_item.pizza.title&&Cart[i].size == cart_item.size ){
        if (cart_item.size == "small_size")  {
            $(".sumOfBuy").text(parseInt($(".sumOfBuy").text()) - parseInt(cart_item.pizza.small_size.price));
        }
        if (cart_item.size == "big_size") {
            $(".sumOfBuy").text(parseInt($(".sumOfBuy").text()) - parseInt(cart_item.pizza.big_size.price));
        }
        continue;
    }
copy.push(Cart[i]);
}
Cart = copy;
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
//get
    var saved_orders =	Storage.get('cart');
    //console.log(JSON.parse(saved_orders)+"ljdv");
    if(saved_orders)	{
        Cart	=	JSON.parse(saved_orders);
    }
  // Cart = JSON.parse(saved_orders);
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    $(".sumOfBuy").text(parseInt(0));
    $(".counterOfZam").text(parseInt(0));
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);

        $node.find(".plus").click(function() {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            if(cart_item.quantity <1){
                removeFromCart(cart_item);
            }
            Storage.set("cart",JSON.stringify(Cart));
       //Оновлюємо відображення
            updateCart();
        });

        $node.find(".delete").click(function(){
            //Збільшуємо кількість замовлених піц
            removeFromCart(cart_item);
            //Оновлюємо відображення
            Storage.set("cart",JSON.stringify(Cart));
            updateCart();
        });

        $(".counterOfZam").text( parseInt($(".counterOfZam").text())+parseInt("1"));

        if (cart_item.size == "small_size") {
            $(".sumOfBuy").text(parseInt($(".sumOfBuy").text()) + parseInt(cart_item.quantity)*parseInt(cart_item.pizza.small_size.price));

        }
        if (cart_item.size == "big_size") {
            $(".sumOfBuy").text(parseInt($(".sumOfBuy").text()) + parseInt(cart_item.quantity)*parseInt(cart_item.pizza.big_size.price));

        }
        console.log(JSON.stringify(Cart));
//set
        Storage.set("cart",JSON.stringify(Cart));
        $cart.append($node);
    }



    Cart.forEach(showOnePizzaInCart);

}
$(".deleteZam").click(function () {
    Cart= [];
    Storage.set("cart",JSON.stringify(Cart));
    console.log(JSON.stringify(Cart));
    updateCart();
});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.PizzaSize = PizzaSize;