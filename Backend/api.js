/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};
var LIQPAY_PRIVATE_KEY = "q14Ae8ywnfMzOqixBIvcbJF69z2ouLvkafrjCfaq";
var LIQPAY_PUBLIC_KEY  = "i87685463072";
function	base64(str)	 {
    return	new	Buffer(str).toString('base64');
}

var crypto	=	require('crypto');
function	sha1(string)	{
    var sha1	=	crypto.createHash('sha1');
    sha1.update(string);
    return	sha1.digest('base64');
}
exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log(order_info+ "lkrekrklg");
    var order	=	{
        version:	3,
        public_key:	LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	req.body.cost,
        currency:	"UAH",
        description: "name: "+req.body.name+"  "+"number: "+req.body.number+"  "+"address: "+req.body.address+"  amount ofPizzas: "+req.body.order.length,
        order_id:	Math.random(),
//!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox:	1
    };
    var data	=	base64(JSON.stringify(order));
    var signature	=	sha1(LIQPAY_PRIVATE_KEY	+	data	+	LIQPAY_PRIVATE_KEY);
    console.log("Creating Order", order_info);
    res.send({
        success: true,
       // count: order_info.pizza.length,
        data: data,
        signature: signature
    });
};