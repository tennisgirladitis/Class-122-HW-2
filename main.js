x = 0;
y = 0;

screen_width = 0;
screen_height = 0;

apple = "";
draw_apple = "";
speak_data = "";
to_number = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage('apple.png');
}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started drawing apple!!!"
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "Speech has not recognized a number."
  }

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  createCanvas(screen_width, screen_height - 200);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";

    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
      document.getElementById("status").innerHTML = to_number + "Apple drawn";
      speak_data = to_number + "apples drawn";
      speak();
    }
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}
