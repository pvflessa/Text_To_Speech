// Init SpeechSynth API
const synth = window.speechSynthesis;

//DOM Elements

const textForm = document.querySelector('#textForm')
const textInput = document.querySelector('#textInput')
const voiceSelect = document.querySelector('#voiceSelect')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rateValue')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitchValue')


//Event Listeners

//text form submit
textForm.addEventListener('submit',function(e){
  e.preventDefault()
  speak()

  textInput.blur()
})


//rate value change

rate.addEventListener('change',function(e){

rateValue.textContent = rate.value

})

//pitch value change

pitch.addEventListener('change',function(e){

pitchValue.textContent = pitch.value

})


//Speak when I change voice without clicking on submit

voiceSelect.addEventListener('change',function(e){
  speak()
})

//Init Voices Array

let voices = []

const getVoices = function() {
  voices = synth.getVoices();

  //Loop through voices and create option element for each one
    voices.forEach(function(voice){


      const option =  document.createElement('option')
      //Fill option with voice
      option.textContent = voice.name + '('+ voice.lang +')'

      //Set nedded option Atrreibutes

      option.setAttribute('data-lang', voice.lang)
      option.setAttribute('data-name', voice.name)


      voiceSelect.appendChild(option)




    })
};


getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}


// Speak

const speak = function(){

//Check if speaking
if(synth.speaking){
  console.error('Already Speaking')
  return
}

//If the textarea isn't empty

if(textInput.value !== ''){

  // Get speak text
  const speakText = new SpeechSynthesisUtterance(textInput.value);

  //Speak end

  // speakText.onend(e){
  //   console.log('done speaking')
  // }

  //Speak error

  // speakText.onerror(e){
  //   console.error('Something went worg')
  // }

  //Selected voice
  const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

  //Loop through voices

  voices.forEach(function(voice){
    if(voice.name === selectedVoice){
      speakText.voice = voice
    }
  })


    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);

}











}
