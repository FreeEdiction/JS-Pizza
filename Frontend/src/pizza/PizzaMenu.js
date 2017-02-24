/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);
console.log(pizza.content.pineapple);
        $node.find(".buy-big").click(function(){
            console.log("sdjkv");
                PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });
//console.log(pizza);
        $pizza_list.append($node);
    }
    console.log(list.length);
    $(".amOfP").text ( parseInt(list.length));
   list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza) {
        if (filter in pizza.content || pizza.type == filter){
        //Якщо піка відповідає фільтру
            pizza_shown.push(pizza);
    }
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);

    $(".meat").click(function () {
        filterPizza("meat");
    });
    $(".ananas").click(function () {
        filterPizza("pineapple");
    });
    $(".ocean").click(function () {
        filterPizza("ocean");
    });
    $(".mushrooms").click(function () {
        filterPizza("mushroom");
    });
    $(".vega").click(function () {
        filterPizza("Вега піца");
    });
    $(".all").click(function () {
        showPizzaList(Pizza_List);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;