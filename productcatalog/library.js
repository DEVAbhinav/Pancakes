(function(window){
    function myLibrary () {
        return {
            searchProductById : searchProductById,
            searchProductsByType : searchProductsByType,
            searchAllProducts : searchAllProducts,
            searchProductsByPrice : searchProductsByPrice,
            

        }
    }

    if(typeof(window.api) === 'undefined')
        window.api = myLibrary();

})(window);

function createRandomProduct() {
    var typeArray = ['Electronics', 'Books', 'Clothing', 'Food'];
    var price = (Math.random()*500).toFixed(2);
    var type =  typeArray[Math.floor(Math.random()*4)];
    return {
        price: price,
        type : type
        
    };
}

function createRandomCatalog(num) {
    var catalog = [];
    
    for(var i=0;i<num;i++) {

        var Product = createRandomProduct();
        // console.log(Product);
        catalog.push({
            id : i,
            price : Product.price,
            type : Product.type
        });
    }
    return catalog;
}

//execute Code here

var catalog = createRandomCatalog(100);
//console.log(catalog);

function searchAllProducts () {
    var promise = new Promise(function(res,rej) {
        setTimeout(() => {
            res(catalog);
        }, 1000);
    });
    return promise;
}

function searchProductById(id) {
    var promise = new Promise (function(res,rej) {
        setTimeout(() => {
            catalog.forEach((catal) => {
                if(catal && catal.id == id) {
                    res(catal);
                }
            });
            rej("Invalid ID " + id);
        },1000);
    });
    return promise;
}


function searchProductsByType(type){

    var promise = new Promise(function(resolve,reject){
        var i = 0;
        var typeArray = [];
        var possibleTypes = ['Electronics','Books','Clothing','Food'];
        if(!possibleTypes.includes(type)){
            reject("Invalid Type: " + type)
        }
        else{
            setTimeout(function(){
                while (i < catalog.length){
                    if (catalog[i].type == type){
                        typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                    }
                    i++;
                }
                resolve(typeArray);
            },1000);
        }
    });
    return promise;
}

function searchProductsByPrice(price, diff) {
    var prodArray = [];
    var promise =  new Promise((resolve, reject) => {
        setTimeout(() => {
            prodArray = catalog.filter((catal) => {
                if(Math.abs(catal.price - price ) < diff ) {
                    return true;
                }
            })
            resolve(prodArray);
        },1000);
    })
    return promise;
}