define(['backbone'],function(){

  var Router = Backbone.Router.extend({

      routes: {
        "index": "indexFn",
        "fast_supermarket": "fast_supermarketFn",
        "reserve": "reserveFn",
        "shopping_cart": "shopping_cartFn",
        "me_message": "me_messageFn",
        "*actions":'defaultAction'
      },

      indexFn: function() {
          require(['./modules/index/index.js'],function(index){
            index.render();
            index.size();
          })
      },
      fast_supermarketFn: function() {
        require(['./modules/fast_supermarket/fast_supermarket.js'],function(fast_supermarket){
          fast_supermarket.render();
          fast_supermarket.data();
        })
      },
      me_messageFn: function() {
        require(['./modules/me_message/me_message.js'],function(me_message){
          me_message.render();
        })
      },
      reserveFn: function() {
        require(['./modules/reserve/reserve.js'],function(reserve){
          reserve.render();
        })
      },
      shopping_cartFn: function() {
        require(['./modules/shopping_cart/shopping_cart.js'],function(shopping_cart){
          shopping_cart.render();
//        shopping_cart.all_chioce();
          shopping_cart.shop_1();
        })
      },
      defaultAction:function(){
        location.hash = 'index'
      }

  });

  var router = new Router();
})