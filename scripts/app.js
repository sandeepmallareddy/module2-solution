(function(){
    'use strict';
    
    //Pre-populating the shopping list data
    var shopping_list = [
	{'name':'Cookies','quantity':10},
	{'name':'Chips','quantity':2},
	{'name':'Snickers','quantity':3},
	{'name':'Coke','quantity':5},
	{'name':'Pringles','quantity':8},
	{'name':'Chewing gum','quantity':3},
    ];
    
    
    //Initiating the Angular app
    var app = angular.module('ShoppingListCheckOff',[]);

    //Initiating the controller(s)
    app.controller('ToBuyShoppingController',ToBuyShoppingController);
    app.controller('AlreadyBoughtController',AlreadyBoughtController);

    //Creating a singleton service - which will take care of Business Logic
    app.service('ShoppingCart',ShoppingCartService);
    
    ToBuyShoppingController.$inject = ['ShoppingCart'];
    AlreadyBoughtController.$inject = ['ShoppingCart'];
    //Function for ToBuyShopping Controller
    function ToBuyShoppingController(ShoppingCart){
	var toBuy = this;

	//Initiate the toBuyList
	toBuy.list = ShoppingCart.getToBuyList();

		
	//On Click Bought Button
	toBuy.haveBought = function(index){
	    var boughtItem = toBuy.list[index];
	    ShoppingCart.addToBoughtList(boughtItem);
	    ShoppingCart.removeFromBuyList(index);	    
	}
	
	
	
    }


    //Function for AlreadyBoughtController
    function AlreadyBoughtController(ShoppingCart){
	var alreadyBought = this;

	//Initiate the alreadyBought list
	alreadyBought.list = ShoppingCart.getAlreadyBoughtList();

    }


    //Shopping cart Service to Take Care of the Business Logic
    function ShoppingCartService(){
	var ShoppingCart = this;

	//Initiate the Shopping list
	ShoppingCart.toBuyList = shopping_list;

	//Initiate the alreadyBought list
	ShoppingCart.alreadyBoughtList = [];


	//Get the To Buy List
	ShoppingCart.getToBuyList = function(){
	    return ShoppingCart.toBuyList;
	}

	//Get the Already Bought List
	ShoppingCart.getAlreadyBoughtList = function(){
	    return ShoppingCart.alreadyBoughtList;
	}

	//Remove from BuyList
	//Function return the object removed
	ShoppingCart.removeFromBuyList = function(index){
	    return ShoppingCart.toBuyList.splice(index,1);
	}

	ShoppingCart.addToBoughtList = function(item){
	    ShoppingCart.alreadyBoughtList.push(item);
	}

	
    }




})();
