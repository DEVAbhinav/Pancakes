const url  = document.getElementById("urlInput");
const button = document.getElementById("btn");
const image = document.getElementById("image");
const result  = document.getElementById("result");

button.onclick = function () {
    image.src  = url.value;
    let urlValue  = url.value;
    var body =  { 
        url : urlValue
    }
    
    let init  = {
        method : "POST",
        headers  : new Headers ({"Ocp-Apim-Subscription-Key": "f6723a7c98204891b2d6b3ceaa26f798",
    'content-Type': "application/json"}),
        body : JSON.stringify(body)
    }
     //console.log(init.data);
    var request = new Request("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise", init);
    //console.log(request);
    
    fetch(request).then(function(data) {
        return data.json();
    }).then(function(data) {
        let value =  data.length >0 ?
         data[0].faceAttributes : Promise.reject({reason  : "Invalid result"})
        return value;
    }).then((val) => {
        result.innerHTML = "<h2>" +"Gender : " + val.gender + "</h2>" + "<h2>" + "Age : " + val.age + "</h2>";
    }).catch((err) => {
        alert(JSON.stringify(err));
    })
}