const filmNumber  = document.getElementById("filmNumber");
const button = document.getElementById("btn");
const characterTag = document.getElementById("character");
const filmTag  = document.getElementById("film");


button.addEventListener('click',() => {
    run(gen).catch((err) => {console.log(err.message)});
});


function run(genFunc) {
    const obj = genFunc();

    function iterate(iteration){ //recursive function to iterate through promises
        if(iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
        .then(x => iterate(obj.next(x))) //calls recursive function on the next value to be iterated
        .catch(x => iterate(obj.throw(x))); //throws an error if a rejection is encountered
    }


    try {
        return iterate(obj.next());
    
    }
    catch(ex) {
        Promise.reject(ex);
    }
}


function* gen() {
    //to check if the input is valid
    //let init = {method : "get",headers : new Headers({"Content-Type" : "application/json"}), mode : 'cors'};
    //console.log(init);
    if (filmNumber.value >7 || filmNumber.value < 1)
        throw new Error("Invalid file number");



    //to fetch the result of api calls
    var filmResponse = yield fetch("https://swapi.co/api/films/" +
     document.getElementById("filmNumber").value) + '/';
    var film = yield filmResponse.json();     
    


    //fetch the characters
    var characters = film.characters;
    var characterString = "Characters: <br>";
    for(let i = 0; i < characters.length ; i++){
        var tempCharacterResponse = yield fetch(characters[i], init);
        var tempCharacter = yield tempCharacterResponse.json();
        characterString += tempCharacter.name + "<br>";
    }

    // display film name and character in film

    filmTag.innerHTML = film.title;
    characterTag.innerHTML = characterString;

}

