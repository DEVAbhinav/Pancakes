function createTableHeader(tableID) {
    var table = document.getElementById(tableID);
    var thead = document.createElement('TR');
    var th1 = document.createElement('TH');
    var th2 = document.createElement('TH');
    var th3 = document.createElement('TH');
    var th4 = document.createElement('TH');
    th1.appendChild(document.createTextNode("Product ID:"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));

    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    thead.appendChild(th4);

    table.appendChild(thead);
}


function updateTable (tableID, prodArray) {
    var table = document.getElementById(tableID);
    //console.log(prodArray);
    while(table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    //create Table Header
    createTableHeader(tableID);

    for(var i=0; i<prodArray.length; i++) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('button');
        td4.addEventListener('click', function() {
            processSearch(this.parentNode.firstChild.innerHTML);
        });
        td1.appendChild(document.createTextNode(prodArray[i].id));
        td2.appendChild(document.createTextNode(prodArray[i].type));
        td3.appendChild(document.createTextNode(prodArray[i].price));
        td4.appendChild(document.createTextNode("Examine"));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        //console.log(tr);

        table.appendChild(tr);
    }
}

api.searchAllProducts().then(function(value){
    updateTable('allProductsTable',value);
});


function updateExaminedText(product) {
    var outputString = "Product ID: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type :" + product.type;
    document.getElementById('productText').innerHTML = outputString;
}

function getIntersection(arrA,arrB, searchID) {
    
    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];

    samePrice.forEach((obj1) => {
        sameType.forEach((obj2) => {
            if(obj1.id == obj2.id && obj1.id != searchID) {
                similarArray.push(obj1);
            }
        });
    });

    return similarArray;
}

// api.searchProductsByPrice(300,50).then((val)=> {
//     console.log(val);
// })

function processSearch(searchId){
    api.searchProductById(searchId).then(function(val){
       // console.log(val);
        return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
    }).then(function(val){
       //console.log(val);
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarProductsTable',similarArray);
    }).catch(function(val){
        console.log(val);
    });
}

function processSearchByPrice(searchId){
    api.searchProductsByPrice(searchId,50).then(function(val){
       // console.log(val);
        updateTable('similarProductsTable',val);
    }).catch(function(val){
        console.log(val);
    });
}

function processSearchByType(searchId){
    api.searchProductsByType(searchId).then(function(val){
       // console.log(val);
        updateTable('similarProductsTable',val);
    }).catch(function(val){
        console.log(val);
    });
}

document.getElementById("bttnSearchProduct").addEventListener('click',function(){
    processSearch(document.getElementById('searchProductID').value);
});

document.getElementById("bttnSearchProductsByPrice").addEventListener('click',function(){
    processSearchByPrice(document.getElementById('searchProductsbyPrice').value);
});

document.getElementById("bttnSearchProductsByType").addEventListener('click',function(){
    processSearchByType(document.getElementById('searchProductsByType').value);
});