prediction1 = "";
prediction2 = "";

Webcam.set({
    height: 350,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(' #camera ');

function takeImage() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    });
}

console.log("ml5version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak1 = "first prediction is " + prediction1;
    speak2 = "second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function identifyImage() {
    img = document.getElementById("capture_image")
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("emoji1").innerHTML = results[0].label;
        document.getElementById("emoji2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128522;"
        }

        if(results[0].label == "sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128532;"
        }
        if(results[0].label == "angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128548;"
        }


        if(results[1].label == "happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;"
        }

        if(results[1].label == "sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;"
        }
        if(results[1].label == "angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;"
        }
    }
}
