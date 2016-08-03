const init = () => {
  const voices = speechSynthesis.getVoices();//.map(x => x);
console.log(speechSynthesis.getVoices());
  const final_span = document.querySelector('span#final');
  const interim_span = document.querySelector('span#interim');
  const start_button = document.querySelector('button#start');

  if (!('webkitSpeechRecognition' in window)) {
    console.log(666);
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() { }
    recognition.onerror = function(event) { }
    recognition.onend = function() { }

    recognition.onresult = function(event) {
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      final_span.innerHTML = linebreak(final_transcript);
      interim_span.innerHTML = linebreak(interim_transcript);
    };
  }
  start_button.addEventListener('click', startButton);
}

function startButton(event) {
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
}

document.addEventListener('DOMContentLoaded', init);