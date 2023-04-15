
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

play.style.display = "inline-block";
pause.style.display = "none";
resume.style.display = "none";

const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const volume = document.getElementById('volume');

const voiceInput = document.getElementById('voice-input');
const langInput = document.getElementById('lang-input');

const moreOptions = document.getElementById('more-options-button');
const subMenu = document.getElementById('sub-menu-container');

const closeButton = document.getElementById('close-button');
const backButton = document.getElementById('back-button');

const speakingVolume = document.getElementById('speaking-volume');
const speakingSpeed = document.getElementById('speaking-speed');
const speakingPitch = document.getElementById('speaking-pitch');
const speakingLang = document.getElementById('speaking-lang');
const speakingVoice = document.getElementById('speaking-voice');

const speakingVolumeMenu = document.getElementById('speaking-volume-menu');
const speakingSpeedMenu = document.getElementById('speaking-speed-menu');
const speakingPitchMenu = document.getElementById('speaking-pitch-menu');
const speakingLangMenu = document.getElementById('speaking-lang-menu');
const speakingVoiceMenu = document.getElementById('speaking-voice-menu');

const langList = document.getElementById('lang-list');
const voiceList = document.getElementById('voice-list');

const post = document.getElementById('post-content');

const text = post.textContent; 

const utterance = new SpeechSynthesisUtterance(text);

let langCodes = [];

let voiceArray = [];

const getVoices = () => {
    return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices()
        if (voices.length) {
            resolve(voices)
            return
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices()
            resolve(voices)
        }
    })
}

const printVoicesLists = async () => {
    ;(await getVoices()).forEach((voice) => {

        voiceArray.push(voice.name);

        const itemVoice = document.createElement('li');
        itemVoice.setAttribute("class", voice.lang);
        itemVoice.innerHTML = voice.name;
        // itemVoice.innerHTML = voice.name + ' ' + voice.lang;
        voiceList.appendChild(itemVoice);

        if(!langCodes.includes(voice.lang)){
            langCodes.push(voice.lang)

            const itemLang = document.createElement('li');
            itemLang.setAttribute("id", voice.lang);
            itemLang.innerHTML = voice.lang;
            langList.appendChild(itemLang);
        }

    })
};

printVoicesLists().then(
    () => {

        const itemLangList = langList.getElementsByTagName("li");
        const itemVoiceList = voiceList.getElementsByTagName("li");

        for (let i = 0; i < itemLangList.length; i++) {

            itemLangList[0].classList.add('selected');
            itemVoiceList[0].classList.add('selected');
            
            langInput.value = itemLangList[0].textContent;
            voiceInput.value = itemVoiceList[0].textContent;

            for (let c = 0; c < itemVoiceList.length; c++) {

                    if (itemVoiceList[c].classList.contains(itemLangList[0].textContent)) {
                        itemVoiceList[c].style.display = 'block';                      
                    } else {
                        itemVoiceList[c].style.display = 'none';
                    }
            }

            itemLangList[i].addEventListener("click", function(e){
                for (let a = 0; a < itemLangList.length; a++) {
                    itemLangList[a].classList.remove('selected');
                }

                itemLangList[i].classList.add('selected');

                langInput.value = itemLangList[i].textContent;

                setDefaults();

                let setSelected = false;

                for (let b = 0; b < itemVoiceList.length; b++) {
                    if (itemVoiceList[b].classList.contains(itemLangList[i].textContent)) {
                        if(!setSelected) {
                            voiceInput.value = itemVoiceList[b].textContent;
                            itemVoiceList[b].classList.add('selected');
                            setSelected = true;
                        }
                        itemVoiceList[b].style.display = 'block';

                    } else {
                        itemVoiceList[b].style.display = 'none';
                    }

                    itemVoiceList[b].addEventListener("click", function(e){
                        for (let f = 0; f < itemVoiceList.length; f++) {
                            itemVoiceList[f].classList.remove('selected');
                        }
                        itemVoiceList[b].classList.add('selected');
                        voiceInput.value = itemVoiceList[b].textContent;

                        setDefaults();
                    })
                }
            })
        }
    }
);

const setDefaults = () => {

    // utterance.rate: set the speed, accepts between [0.1 - 10], defaults to 1
    utterance.rate = rate.value;

    // utterance.pitch: set the pitch, accepts between [0 - 2], defaults to 1
    utterance.pitch = pitch.value;

    // utterance.volume: sets the volume, accepts between [0 - 1], defaults to 1
    utterance.volume = volume.value;

    // utterance.lang: set the language (values use a BCP 47 language tag, like en-US or it-IT)
    utterance.lang = langInput.value;

    // utterance.text: instead of setting it in the constructor, you can pass it as a property. Text can be maximum 32767 characters
    // utterance.text = "Hello World!"

    // utterance.voice: sets the voice
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.filter(function(voices) { return voices.name == voiceInput.value; })[0];
};

setDefaults();

// For error handling...
// https://udn.realityripple.com/docs/Web/API/SpeechSynthesisUtterance/error_event
// The documentation, has errors
// utterance.addEventListener('error', function(event) {
//     console.log('An error has occurred with the speech synthesis: ' + event.error);
// });

// update defaults, when values are changed.

rate.addEventListener("change", function(){
    console.log("RATE changed " + rate.value);
    setDefaults();
});

pitch.addEventListener("change", function(){
    console.log("PITCH changed " + pitch.value);
    setDefaults();
});

volume.addEventListener("change", function(){
    console.log("VOLUME changed " + volume.value);
    setDefaults();
});

// click events

play.addEventListener("click", function(){  
    window.speechSynthesis.speak(utterance);
    console.log("play");
});

pause.addEventListener("click", function(){  
    window.speechSynthesis.pause();
    console.log("paused");
});

resume.addEventListener("click", function(){  
    window.speechSynthesis.resume();
    console.log("resume");
});

moreOptions.addEventListener("click", function(){
    subMenu.style.display = "block";
})

closeButton.addEventListener("click", function(){
    subMenu.style.display = "none";
    if(speakingVolumeMenu.style.display = "block"){
        speakingVolumeMenu.style.display = "none"
    }
    if(speakingSpeedMenu.style.display = "block"){
        speakingSpeedMenu.style.display = "none"
    }
    if(speakingPitchMenu.style.display = "block"){
        speakingPitchMenu.style.display = "none"
    }
    if(speakingLangMenu.style.display = "block"){
        speakingLangMenu.style.display = "none"
    }
    if(speakingVoiceMenu.style.display = "block"){
        speakingVoiceMenu.style.display = "none"
    }
})

backButton.addEventListener("click", function(){
    if(speakingVolumeMenu.style.display = "block"){
        speakingVolumeMenu.style.display = "none"
    }
    if(speakingSpeedMenu.style.display = "block"){
        speakingSpeedMenu.style.display = "none"
    }
    if(speakingPitchMenu.style.display = "block"){
        speakingPitchMenu.style.display = "none"
    }
    if(speakingLangMenu.style.display = "block"){
        speakingLangMenu.style.display = "none"
    }
    if(speakingVoiceMenu.style.display = "block"){
        speakingVoiceMenu.style.display = "none"
    }
})

speakingVolume.addEventListener("click", function(){
    speakingVolumeMenu.style.display = "block";
})

speakingSpeed.addEventListener("click", function(){
    speakingSpeedMenu.style.display = "block";
})

speakingPitch.addEventListener("click", function(){
    speakingPitchMenu.style.display = "block";
})

speakingLang.addEventListener("click", function(){
    speakingLangMenu.style.display = "block";
})

speakingVoice.addEventListener("click", function(){
    speakingVoiceMenu.style.display = "block";
})

// @TO-DO
// click background, to close subMenu
// subMenu.addEventListener("click", function(){
//     subMenu.style.display = "none";
// })

// play events

utterance.onstart = function(event) {
    console.log('started');
    play.style.display = "none";
    pause.style.display = "inline-block";
    resume.style.display = "none";
} 

utterance.onend = function(event) {
    console.log('ended');
    play.style.display = "inline-block";
    pause.style.display = "none";
    resume.style.display = "none";
}

utterance.onpause = function(event) {
    console.log('paused');
    play.style.display = "none";
    pause.style.display = "none";
    resume.style.display = "inline-block";
} 

utterance.onresume = function(event) {
    console.log('resumed');
    play.style.display = "inline-block";
    pause.style.display = "none";
    resume.style.display = "none";
} 

// @TO-DO
// - Highlight word as it speaks.
// - Get the time, it will take to read... and show progress bar.
// Not currently possible to do until played.
// utterance.onend = function(event) {
//     console.log(event.elapsedTime)
// }