var button = document.getElementById("hit");
var textArea  = document.getElementById("phrase");
var keyPhrasesList = document.getElementById("output");

button.onclick  = function( ) {
    keyPhrasesList.innerHTML = "";
    const phrase = textArea.value;
   // var myHeader = new Headers();
    //console.log(phrase);
    //myHeader.append("Ocp-Apim-Subscription-Key","45c3a2c90a9e4f0cbdec09037f94b0c2")
   // console.log(myHeader);
    let body = { 'documents': [
        { 'id': '1', 'language': 'en', 'text':   phrase } ]};
    var init = {
        method : "POST",
        "headers" : new Headers({"Ocp-Apim-Subscription-Key" : "45c3a2c90a9e4f0cbdec09037f94b0c2",
        'Content-Type': 'application/json'}),
        body : JSON.stringify(body)

    }
    var val = textArea.textContent;
    let request = new Request(" https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases",init);
    console.log(request);
    fetch(request).then(function(res) {
            return res.json();})
        .then(function(res) {
            //console.log( res.body)
        let keyPhrases = res.documents[0].keyPhrases;
        let result = "";
        keyPhrases.forEach(element => {result += element+" ";
            
        });
        keyPhrasesList.innerHTML = result;
        phrase.value = "";

    }).catch((err) => {
        console.log(err);
    });

}