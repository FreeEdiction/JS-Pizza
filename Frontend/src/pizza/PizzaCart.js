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

var Servak = require("../API");
$(".buttonNext").click(function () {
    var ORDER = {
        name: $("#name").val(),
        number:$("#phoneNumber").val(),
        address: $(".address2").text(),
        cost: $(".sumOfBuy").text(),
        order: Cart
    }
        Servak.createOrder(ORDER, function (err, info) {
            if (err) {
                console.log("Houston, We've Got a Problem")
            }
            console.log("SUCCESFUL");
            console.log(JSON.stringify(info));
            console.log(ORDER);
            LiqPayCheckout.init({
                data:	info.data,
                signature:	info.signature,
                embedTo:	"#liqpay",
                mode:	"popup"	//	embed	||	popup
            }).on("liqpay.callback",	function(data){
                console.log(data.status);
                console.log(data);
            }).on("liqpay.ready",	function(data){
//	ready
            }).on("liqpay.close",	function(data){
//	close
            });
        });
});



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
       // console.log(JSON.stringify(Cart));
//set
        Storage.set("cart",JSON.stringify(Cart));
        $cart.append($node);
    }



    Cart.forEach(showOnePizzaInCart);

}
$(".deleteZam").click(function () {
    Cart= [];
    Storage.set("cart",JSON.stringify(Cart));
   // console.log(JSON.stringify(Cart));
    updateCart();
});
$('.buy').click(function () {
    window.location.href = "/order.html";
    $(".buy").addClass("none");
    $(".correct").removeClass("none");

});
$('.correct').click(function () {
    window.location.href = "/index.html";
    $(".buy").removeClass("none");
    $(".correct").addClass("none");
});

if($(".buttonNext").click(function () {
        $(".name").hide();
        $(".numberPhone").hide();
        var c  = $("#name").val();
        var x = $("#phoneNumber").val();
        // console.log(x);
        // console.log(c);
        if(c.length == 0){
            $(".name").show();
        }
        for(var i = 0 ; i<c.length; i++){
            //console.log(c[i]);
            if((c[i]<64 || (c[i]>91) && (c[i]<97) || c[i]>123) ){
                $(".name").show();
                i= c.length-1;
            }
        }
        c= [];
        if(x[0] === "+") {
            $(".numberPhone").show();
            for (var v = 1; v < x.length; v++) {

                if (x[v] === "0" || x[v] === "1" || x[v] === "2" || x[v] === "3" || x[v] === "4" || x[v] === "5" ||
                    x[v] === "6" || x[v] === "7" || x[v] === "8" || x[v] === "9") {
                    $(".numberPhone").hide();
                    //console.log(x);
                    continue;
                }
                $(".numberPhone").show();
                v=x.length -1;
            }
        }
        if(x[0] !== "+") {
            $(".numberPhone").show();
            for (var v = 0; v < x.length; v++) {

                if (x[v] === "0" || x[v] === "1" || x[v] === "2" || x[v] === "3" || x[v] === "4" || x[v] === "5" ||
                    x[v] === "6" || x[v] === "7" || x[v] === "8" || x[v] === "9") {
                    $(".numberPhone").hide();
                   // console.log(x);
                    continue;
                }
                $(".numberPhone").show();
                v= x.length-1;
            }
        }
}));


function	initialize()	{
//Тут починаємо працювати з картою
    var mapProp =	{
        center:	new	google.maps.LatLng(50.464379,30.519131),
        zoom:	14
    };
    var html_element =	document.getElementById("googleMap");
    var map	=	new	google.maps.Map(html_element,	 mapProp);
//Карта створена і показана
    var point	=	new	google.maps.LatLng(50.464379,30.519131);
    var marker	=	new	google.maps.Marker({
        position:	point,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
    map:	map,
        icon:	"assets/images/map-icon.png"
});
   // var marker1 = null;

    $("#address").keypress(function(){
            var coordinates;

            var addr = $("#address").val();
            $(".address2").text(addr);
            geocodeAddress(addr, function(err,Coordinates){
                // if(marker1!= null){
                //     marker1 = null;
                // }
                if(!err){
                    coordinates = Coordinates;

                    console.log(coordinates);

                    //  marker1 = new google.maps.Marker({
                    //     position: coordinates,
                    //     animation: google.maps.Animation.DROP,
                    //     map: map,
                    //     icon: "assets/images/home-icon.png"
                    // });
                    geocodeLatLng(coordinates, function(err, adress){
                        if(!err) {
                            console.log(addr);
                            $(".address2").text(adress);
                        }else{
                            console.log("Адресу невизначено");
                        }
                    });
                    calculateRoute(point,  coordinates, function(err, time){
                        if(!err){
                            $(".time").text(time.duration.text);
                        }else{
                            console.log("Шляху немає");
                        }
                    });
                }
            });
    });



    google.maps.event.addListener(map,
        'click',function(me){
            var coordinates	=	me.latLng;
            // if(marker1!= null){
            //     marker1 = null;
            // }
            geocodeLatLng(coordinates,	function(err,	adress){

                if(!err)	{
//Дізналися адресу
//                      marker1 = new google.maps.Marker({
//                         position: coordinates,
//                         animation: google.maps.Animation.DROP,
//                         map: map,
//                         icon: "assets/images/home-icon.png"
//                     });
                    console.log(adress);
                    $(".address2").text(adress);
                    $("#address").val(adress);

                    calculateRoute(point,	 coordinates,	function(err,	route){
                        if(!err)	{
//Дізналися адресу

                            console.log(route);
                            $(".time").text(route.duration.text);
                        }	else	{
                            console.log("Немає routa")
                        }
                    })
                }	else	{
                    console.log("Немає адреси")
                }
            })
        });


}
function	geocodeLatLng(latlng,	 callback){
//Модуль за роботу з адресою
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'location':	latlng},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
            var adress =	results[1].formatted_address;
            callback(null,	adress);
            console.log(adress);
        }	else	{
            callback(new	Error("Can't	find	adress"));
        }
    });
}
function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK&& results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can not find the adress"));
        }
    });
}

function	calculateRoute(A_latlng,	 B_latlng,	callback)	{
    var directionService =	new	google.maps.DirectionsService();
    directionService.route({
        origin:	A_latlng,
        destination:	B_latlng,
        travelMode:	google.maps.TravelMode["DRIVING"]
    },	function(response,	status)	{
        if	(	status	==	google.maps.DirectionsStatus.OK )	{
            var leg	=	response.routes[	0	].legs[	0	];
            callback(null,	{
                duration:	leg.duration
            });
        }	else	{
            callback(new	Error("Can'	not	find	direction"));
        }
    });
}

//Коли сторінка завантажилась
google.maps.event.addDomListener(window,	 'load',	initialize);





exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.PizzaSize = PizzaSize;