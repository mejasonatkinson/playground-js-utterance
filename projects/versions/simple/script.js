const play = document.getElementById('play');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');

// set default styles

play.style.display = "inline-block";
pause.style.display = "none";
resume.style.display = "none";

// get content

const post = document.getElementById('post-content');
const text = post.textContent; 

// set SpeechSynthesisUtterance and add content

const utterance = new SpeechSynthesisUtterance(text);

// click events

play.addEventListener("click", function(){  
    // console.log("play");
    window.speechSynthesis.speak(utterance);
});

pause.addEventListener("click", function(){  
    // console.log("paused");
    window.speechSynthesis.pause();
});

resume.addEventListener("click", function(){  
    // console.log("resume");
    window.speechSynthesis.resume();
});

// play events

utterance.onstart = function(event) {

    // console.log('started');
    // change default styles

    play.style.display = "none";
    pause.style.display = "inline-block";
    resume.style.display = "none";

} 

utterance.onend = function(event) {

    // console.log('ended');
    // change default styles back

    play.style.display = "inline-block";
    pause.style.display = "none";
    resume.style.display = "none";

}

utterance.onpause = function(event) {

    // console.log('paused');
    // change default styles back

    play.style.display = "none";
    pause.style.display = "none";
    resume.style.display = "inline-block";

} 

utterance.onresume = function(event) {

    // console.log('resumed');
    // change default styles

    play.style.display = "inline-block";
    pause.style.display = "none";
    resume.style.display = "none";

} 