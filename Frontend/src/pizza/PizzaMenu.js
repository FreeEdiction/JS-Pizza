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
        $(".meat").addClass("back");
        $(".ananas").removeClass("back");
        $(".ocean").removeClass("back");
        $(".mushrooms").removeClass("back");
        $(".vega").removeClass("back");
        $(".all").removeClass("back");
    });
    $(".ananas").click(function () {
        filterPizza("pineapple");
        $(".meat").removeClass("back");
        $(".ananas").addClass("back");
        $(".ocean").removeClass("back");
        $(".mushrooms").removeClass("back");
        $(".vega").removeClass("back");
        $(".all").removeClass("back");
    });
    $(".ocean").click(function () {
        filterPizza("ocean");
        $(".meat").removeClass("back");
        $(".ananas").removeClass("back");
        $(".ocean").addClass("back");
        $(".mushrooms").removeClass("back");
        $(".vega").removeClass("back");
        $(".all").removeClass("back");
    });
    $(".mushrooms").click(function () {
        filterPizza("mushroom");
        $(".meat").removeClass("back");
        $(".ananas").removeClass("back");
        $(".ocean").removeClass("back");
        $(".mushrooms").addClass("back");
        $(".vega").removeClass("back");
        $(".all").removeClass("back");
    });
    $(".vega").click(function () {
        filterPizza("Вега піца");
        $(".meat").removeClass("back");
        $(".ananas").removeClass("back");
        $(".ocean").removeClass("back");
        $(".mushrooms").removeClass("back");
        $(".vega").addClass("back");
        $(".all").removeClass("back");
    });
    $(".all").click(function () {
        showPizzaList(Pizza_List);
        $(".meat").removeClass("back");
        $(".ananas").removeClass("back");
        $(".ocean").removeClass("back");
        $(".mushrooms").removeClass("back");
        $(".vega").removeClass("back");
        $(".all").addClass("back");
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;