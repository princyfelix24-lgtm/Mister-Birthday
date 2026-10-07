const message = "Happy Birthday, Mister! 🤎";

const typingText = document.getElementById("typing-text");
const startButton = document.getElementById("start-button");

const balloonChallenge = document.getElementById("balloon-challenge");
const balloonArea = document.getElementById("balloon-area");

const scoreText = document.getElementById("score");
const balloonComplete = document.getElementById("balloon-complete");
const nextButton = document.getElementById("next-button");

const angelTransition =
    document.getElementById("angel-transition");

const quizChallenge =
    document.getElementById("quiz-challenge");

const quizOptions =
    document.querySelectorAll(".quiz-option");

const currentQuestion =
    document.getElementById("current-question");

const mysteryChallenge =
    document.getElementById("mystery-challenge");

const mysteryBoxArea =
    document.getElementById("mystery-box-area");

const mysteryBox =
    document.getElementById("mystery-box");

const boxHint =
    document.getElementById("box-hint");

const mysteryMessage =
    document.getElementById("mystery-message");

const mysteryNextButton =
    document.getElementById("mystery-next-button");


/* ===============================
   CHALLENGE 4
================================ */

const cakeChallenge =
    document.getElementById("cake-challenge");

const micButton =
    document.getElementById("mic-button");

const micInstruction =
    document.getElementById("mic-instruction");

const micStatus =
    document.getElementById("mic-status");

const blowMeter =
    document.getElementById("blow-meter");

const blowMeterFill =
    document.getElementById("blow-meter-fill");

const candleFlame =
    document.getElementById("candle-flame");

const cakeComplete =
    document.getElementById("cake-complete");

const cakeNextButton =
    document.getElementById("cake-next-button");


/* ===============================
   VARIABLES
================================ */

let index = 0;
let score = 0;

const totalBalloons = 5;

let currentQuizQuestion = 1;

const answers = {};


/* ===============================
   SOUND SYSTEM
================================ */

let audioContext = null;


function startAudio() {

    if (!audioContext) {

        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }

    if (audioContext.state === "suspended") {

        audioContext.resume();

    }

}


/* ===============================
   QUIZ CLICK SOUND
================================ */

function playClickSound() {

    startAudio();

    const now =
        audioContext.currentTime;


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";


    oscillator.frequency.setValueAtTime(
        520,
        now
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        260,
        now + 0.08
    );


    gain.gain.setValueAtTime(
        0.18,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.08
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start(now);

    oscillator.stop(
        now + 0.08
    );

}


/* ===============================
   BALLOON POP SOUND
================================ */

function playPopSound() {

    startAudio();

    const now =
        audioContext.currentTime;


    const bufferSize =
        audioContext.sampleRate * 0.12;


    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );


    const data =
        buffer.getChannelData(0);


    for (
        let i = 0;
        i < bufferSize;
        i++
    ) {

        data[i] =
            (Math.random() * 2 - 1) *
            (1 - i / bufferSize);

    }


    const noise =
        audioContext.createBufferSource();

    noise.buffer = buffer;


    const noiseGain =
        audioContext.createGain();


    noiseGain.gain.setValueAtTime(
        0.45,
        now
    );


    noiseGain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.12
    );


    noise.connect(noiseGain);

    noiseGain.connect(
        audioContext.destination
    );


    noise.start(now);

    noise.stop(
        now + 0.12
    );


    const oscillator =
        audioContext.createOscillator();

    const oscillatorGain =
        audioContext.createGain();


    oscillator.type = "sine";


    oscillator.frequency.setValueAtTime(
        180,
        now
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        70,
        now + 0.12
    );


    oscillatorGain.gain.setValueAtTime(
        0.25,
        now
    );


    oscillatorGain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.12
    );


    oscillator.connect(
        oscillatorGain
    );

    oscillatorGain.connect(
        audioContext.destination
    );


    oscillator.start(now);

    oscillator.stop(
        now + 0.12
    );

}


/* ===============================
   CHEERFUL VOICE
================================ */

function playCheerSound() {

    window.speechSynthesis.cancel();


    const cheer =
        new SpeechSynthesisUtterance(
            "Woohoo! You did it!"
        );


    cheer.rate = 1.15;

    cheer.pitch = 1.35;

    cheer.volume = 1;


    window.speechSynthesis.speak(
        cheer
    );

}


/* ===============================
   ANGEL SPARKLE SOUND
================================ */

function playAngelSound() {

    startAudio();

    const now =
        audioContext.currentTime;


    const notes = [

        {
            frequency: 659.25,
            delay: 0,
            duration: 0.45
        },

        {
            frequency: 783.99,
            delay: 0.16,
            duration: 0.55
        },

        {
            frequency: 987.77,
            delay: 0.34,
            duration: 0.75
        },

        {
            frequency: 1318.51,
            delay: 0.58,
            duration: 0.95
        }

    ];


    notes.forEach(
        (note) => {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type =
                "sine";


            oscillator.frequency.value =
                note.frequency;


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            const start =
                now + note.delay;


            const end =
                start + note.duration;


            gain.gain.setValueAtTime(
                0.0001,
                start
            );


            gain.gain.exponentialRampToValueAtTime(
                0.13,
                start + 0.05
            );


            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                end
            );


            oscillator.start(start);

            oscillator.stop(end);

        }
    );

}


/* ===============================
   MYSTERY BOX SHAKE SOUND
================================ */

function playBoxShakeSound() {

    startAudio();

    const now =
        audioContext.currentTime;


    const bufferSize =
        audioContext.sampleRate * 0.55;


    const buffer =
        audioContext.createBuffer(
            1,
            bufferSize,
            audioContext.sampleRate
        );


    const data =
        buffer.getChannelData(0);


    for (
        let i = 0;
        i < bufferSize;
        i++
    ) {

        const envelope =
            1 - (i / bufferSize);


        data[i] =
            (Math.random() * 2 - 1) *
            envelope *
            0.25;

    }


    const noise =
        audioContext.createBufferSource();

    noise.buffer = buffer;


    const filter =
        audioContext.createBiquadFilter();


    filter.type =
        "bandpass";


    filter.frequency.value =
        900;


    const gain =
        audioContext.createGain();


    gain.gain.setValueAtTime(
        0.001,
        now
    );


    gain.gain.linearRampToValueAtTime(
        0.18,
        now + 0.08
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.55
    );


    noise.connect(filter);

    filter.connect(gain);

    gain.connect(
        audioContext.destination
    );


    noise.start(now);

    noise.stop(
        now + 0.55
    );

}


/* ===============================
   MAGICAL BOX OPENING SOUND
================================ */

function playMagicOpenSound() {

    startAudio();

    const now =
        audioContext.currentTime;


    const notes = [

        {
            frequency: 392,
            delay: 0,
            duration: 0.35
        },

        {
            frequency: 523.25,
            delay: 0.10,
            duration: 0.40
        },

        {
            frequency: 659.25,
            delay: 0.20,
            duration: 0.45
        },

        {
            frequency: 783.99,
            delay: 0.32,
            duration: 0.55
        },

        {
            frequency: 1046.50,
            delay: 0.45,
            duration: 0.80
        }

    ];


    notes.forEach(
        (note) => {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type =
                "triangle";


            oscillator.frequency.value =
                note.frequency;


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            const start =
                now + note.delay;


            const end =
                start + note.duration;


            gain.gain.setValueAtTime(
                0.0001,
                start
            );


            gain.gain.exponentialRampToValueAtTime(
                0.16,
                start + 0.04
            );


            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                end
            );


            oscillator.start(start);

            oscillator.stop(end);

        }
    );


    const sparkleOscillator =
        audioContext.createOscillator();

    const sparkleGain =
        audioContext.createGain();


    sparkleOscillator.type =
        "sine";


    sparkleOscillator.frequency.setValueAtTime(
        1200,
        now + 0.35
    );


    sparkleOscillator.frequency.exponentialRampToValueAtTime(
        1900,
        now + 1.2
    );


    sparkleGain.gain.setValueAtTime(
        0.0001,
        now + 0.35
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.08,
        now + 0.55
    );


    sparkleGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 1.25
    );


    sparkleOscillator.connect(
        sparkleGain
    );


    sparkleGain.connect(
        audioContext.destination
    );


    sparkleOscillator.start(
        now + 0.35
    );


    sparkleOscillator.stop(
        now + 1.25
    );

}


/* ===============================
   EMOTIONAL SUPPORT MUSIC
================================ */

let supportMusicTimer = null;

let supportMusicPlaying = false;


function playSupportMusic() {

    startAudio();


    if (supportMusicPlaying) {

        return;

    }


    supportMusicPlaying = true;


    const progression = [

        [261.63, 329.63, 392.00],

        [220.00, 261.63, 329.63],

        [174.61, 220.00, 261.63],

        [196.00, 246.94, 293.66]

    ];


    let chordIndex = 0;


    function playChord() {

        if (!supportMusicPlaying) {

            return;

        }


        const now =
            audioContext.currentTime;


        const chord =
            progression[chordIndex];


        chord.forEach(
            (frequency, index) => {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.value =
                    frequency;


                oscillator.connect(gain);

                gain.connect(
                    audioContext.destination
                );


                const start =
                    now + (index * 0.03);


                const end =
                    start + 2.8;


                gain.gain.setValueAtTime(
                    0.0001,
                    start
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.045,
                    start + 0.5
                );


                gain.gain.setValueAtTime(
                    0.045,
                    end - 0.5
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    end
                );


                oscillator.start(start);

                oscillator.stop(end);

            }
        );


        chordIndex =
            (chordIndex + 1) %
            progression.length;


        supportMusicTimer =
            setTimeout(
                playChord,
                2600
            );

    }


    playChord();

}


function stopSupportMusic() {

    supportMusicPlaying = false;


    if (supportMusicTimer) {

        clearTimeout(
            supportMusicTimer
        );

        supportMusicTimer = null;

    }

}


/* ===============================
   HAPPY BIRTHDAY MELODY
================================ */

function playBirthdaySong() {

    startAudio();


    const notes = [

        ["G4", 0.30],
        ["G4", 0.30],
        ["A4", 0.60],
        ["G4", 0.60],
        ["C5", 0.60],
        ["B4", 1.00],

        ["G4", 0.30],
        ["G4", 0.30],
        ["A4", 0.60],
        ["G4", 0.60],
        ["D5", 0.60],
        ["C5", 1.00],

        ["G4", 0.30],
        ["G4", 0.30],
        ["G5", 0.60],
        ["E5", 0.60],
        ["C5", 0.60],
        ["B4", 0.60],
        ["A4", 1.00],

        ["F5", 0.30],
        ["F5", 0.30],
        ["E5", 0.60],
        ["C5", 0.60],
        ["D5", 0.60],
        ["C5", 1.20]

    ];


    const frequencies = {

        "A4": 440.00,
        "B4": 493.88,
        "C5": 523.25,
        "D5": 587.33,
        "E5": 659.25,
        "F5": 698.46,
        "G4": 392.00,
        "G5": 783.99

    };


    let startTime =
        audioContext.currentTime + 0.05;


    notes.forEach(
        ([note, duration]) => {

            const oscillator =
                audioContext.createOscillator();

            const gain =
                audioContext.createGain();


            oscillator.type =
                "sine";


            oscillator.frequency.value =
                frequencies[note];


            oscillator.connect(gain);

            gain.connect(
                audioContext.destination
            );


            const noteStart =
                startTime;


            const noteEnd =
                noteStart + duration;


            gain.gain.setValueAtTime(
                0.0001,
                noteStart
            );


            gain.gain.exponentialRampToValueAtTime(
                0.22,
                noteStart + 0.03
            );


            gain.gain.setValueAtTime(
                0.22,
                noteEnd - 0.06
            );


            gain.gain.exponentialRampToValueAtTime(
                0.0001,
                noteEnd
            );


            oscillator.start(
                noteStart
            );


            oscillator.stop(
                noteEnd
            );


            startTime =
                noteEnd + 0.025;

        }
    );

}


/* ===============================
   BIRTHDAY MESSAGE TYPING
================================ */

function typeMessage() {

    if (index < message.length) {

        typingText.textContent +=
            message[index];

        index++;

        setTimeout(
            typeMessage,
            120
        );

    } else {

        setTimeout(() => {

            startButton.classList.add(
                "show"
            );

        }, 800);

    }

}


typeMessage();


/* ===============================
   START BIRTHDAY MISSION
================================ */

startButton.addEventListener(
    "click",
    () => {

        startAudio();


        startButton.classList.add(
            "hidden"
        );


        document
            .querySelector(".small-text")
            .classList.add("hidden");


        typingText
            .parentElement
            .classList.add("hidden");


        document
            .querySelector(".subtitle")
            .classList.add("hidden");


        document
            .querySelector(".cake")
            .classList.add("hidden");


        balloonChallenge
            .classList.remove("hidden");


        createBalloons();

    }
);


/* ===============================
   CREATE BALLOONS
================================ */

function createBalloons() {

    balloonArea.innerHTML = "";

    score = 0;


    scoreText.textContent =
        score;


    balloonComplete
        .classList
        .add("hidden");


    const colors = [
        "pink",
        "purple",
        "blue",
        "gold",
        "red"
    ];


    const positions = [

        {
            left: "8%",
            top: "20%"
        },

        {
            left: "28%",
            top: "55%"
        },

        {
            left: "48%",
            top: "15%"
        },

        {
            left: "68%",
            top: "50%"
        },

        {
            left: "84%",
            top: "18%"
        }

    ];


    for (
        let i = 0;
        i < totalBalloons;
        i++
    ) {

        const balloon =
            document.createElement("div");


        balloon.classList.add(
            "balloon",
            colors[i]
        );


        balloon.style.left =
            positions[i].left;


        balloon.style.top =
            positions[i].top;


        balloon.addEventListener(
            "click",
            () => {

                popBalloon(
                    balloon
                );

            }
        );


        balloonArea.appendChild(
            balloon
        );

    }

}


/* ===============================
   POP BALLOON
================================ */

function popBalloon(balloon) {

    playPopSound();


    balloon.style.transform =
        "scale(1.5)";


    balloon.style.opacity =
        "0";


    setTimeout(() => {

        balloon.remove();

    }, 150);


    score++;

    scoreText.textContent =
        score;


    if (
        score === totalBalloons
    ) {

        playCheerSound();


        setTimeout(() => {

            balloonComplete
                .classList
                .remove("hidden");

        }, 120);

    }

}


/* ===============================
   MOVE TO CHALLENGE 2
================================ */

nextButton.addEventListener(
    "click",
    () => {

        balloonChallenge
            .classList
            .add("hidden");


        angelTransition
            .classList
            .remove("hidden");


        playAngelSound();


        setTimeout(() => {

            angelTransition
                .classList
                .add("hidden");


            quizChallenge
                .classList
                .remove("hidden");


            currentQuizQuestion = 1;


            currentQuestion.textContent =
                1;

        }, 1400);

    }
);


/* ===============================
   QUIZ ANSWERS
================================ */

quizOptions.forEach(
    (option) => {

        option.addEventListener(
            "click",
            () => {

                playClickSound();


                const question =
                    option.dataset.question;


                const answer =
                    option.dataset.answer;


                answers[question] =
                    answer;


                const sameQuestionOptions =
                    document.querySelectorAll(
                        `.quiz-option[data-question="${question}"]`
                    );


                sameQuestionOptions.forEach(
                    (item) => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                option.classList.add(
                    "selected"
                );


                if (
                    currentQuizQuestion < 5
                ) {

                    setTimeout(() => {

                        moveToNextQuestion();

                    }, 500);

                } else {

                    setTimeout(() => {

                        moveToChallengeThree();

                    }, 500);

                }

            }
        );

    }
);


/* ===============================
   NEXT QUIZ QUESTION
================================ */

function moveToNextQuestion() {

    const visibleQuestion =
        quizChallenge.querySelector(
            ".quiz-question:not(.hidden)"
        );


    if (visibleQuestion) {

        visibleQuestion.classList.add(
            "hidden"
        );

    }


    currentQuizQuestion++;


    const nextQuestion =
        document.getElementById(
            `question-${currentQuizQuestion}`
        );


    if (nextQuestion) {

        nextQuestion.classList.remove(
            "hidden"
        );

    }


    currentQuestion.textContent =
        currentQuizQuestion;

}


/* ===============================
   MOVE TO CHALLENGE 3
================================ */

function moveToChallengeThree() {

    quizChallenge
        .classList
        .add("hidden");


    angelTransition
        .classList
        .remove("hidden");


    playAngelSound();


    setTimeout(() => {

        angelTransition
            .classList
            .add("hidden");


        mysteryChallenge
            .classList
            .remove("hidden");

    }, 1400);

}


/* ===============================
   MYSTERY BOX
================================ */

mysteryBox.addEventListener(
    "click",
    () => {

        if (
            mysteryBox.classList.contains(
                "opened"
            )
        ) {

            return;

        }


        startAudio();


        playBoxShakeSound();


        mysteryBox.classList.add(
            "opening"
        );


        setTimeout(() => {

            mysteryBox.classList.remove(
                "opening"
            );


            playMagicOpenSound();


            mysteryBox.classList.add(
                "opened"
            );


            boxHint.classList.add(
                "hidden"
            );


            setTimeout(() => {

                mysteryBoxArea
                    .classList
                    .add("hidden");


                mysteryMessage
                    .classList
                    .remove("hidden");


                playSupportMusic();

            }, 650);

        }, 500);

    }
);


/* ===============================
   MOVE TO CHALLENGE 4
================================ */

mysteryNextButton.addEventListener(
    "click",
    () => {

        stopSupportMusic();


        mysteryChallenge
            .classList
            .add("hidden");


        angelTransition
            .classList
            .remove("hidden");


        playAngelSound();


        setTimeout(() => {

            angelTransition
                .classList
                .add("hidden");


            cakeChallenge
                .classList
                .remove("hidden");

        }, 1400);

    }
);


/* ===============================
   CHALLENGE 4
   MICROPHONE SYSTEM
================================ */

let microphoneStream = null;

let analyser = null;

let microphoneSource = null;

let microphoneListening = false;

let blowDetectedFrames = 0;

let noiseBaseline = 0.03;

const requiredBlowFrames = 3;


/* ===============================
   ENABLE MICROPHONE
================================ */

micButton.addEventListener(
    "click",
    async () => {

        try {

            startAudio();


            microphoneStream =
                await navigator.mediaDevices.getUserMedia(
                    {
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: false
                        }
                    }
                );


            const micAudioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();


            if (
                micAudioContext.state ===
                "suspended"
            ) {

                await micAudioContext.resume();

            }


            microphoneSource =
                micAudioContext.createMediaStreamSource(
                    microphoneStream
                );


            analyser =
                micAudioContext.createAnalyser();


            analyser.fftSize =
                1024;


            analyser.smoothingTimeConstant =
                0.75;


            microphoneSource.connect(
                analyser
            );


            micButton
                .classList
                .add("hidden");


            micInstruction
                .classList
                .add("hidden");


            micStatus
                .classList
                .remove("hidden");


            blowMeter
                .classList
                .remove("hidden");


            microphoneListening = true;


            measureMicrophone();

        } catch (error) {

            console.error(
                "Microphone error:",
                error
            );


            micStatus
                .classList
                .remove("hidden");


            micStatus.textContent =
                "Microphone permission is needed to blow out the candle. 🎤";


            micStatus.style.color =
                "#ff9bd2";

        }

    }
);


/* ===============================
   MEASURE BLOW
================================ */

function measureMicrophone() {

    if (
        !microphoneListening ||
        !analyser
    ) {

        return;

    }


    const data =
        new Uint8Array(
            analyser.fftSize
        );


    analyser.getByteTimeDomainData(
        data
    );


    let sum = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const normalized =
            (data[i] - 128) / 128;


        sum +=
            normalized *
            normalized;

    }


    const rms =
        Math.sqrt(
            sum / data.length
        );


    if (
        blowDetectedFrames === 0
    ) {

        noiseBaseline =
            (noiseBaseline * 0.98) +
            (rms * 0.02);

    }


    const blowThreshold =
        Math.max(
            0.075,
            noiseBaseline * 2.4
        );


    const blowStrength =
        Math.min(
            100,
            Math.max(
                0,
                (
                    (rms - noiseBaseline) /
                    (blowThreshold - noiseBaseline)
                ) * 100
            )
        );


    blowMeterFill.style.width =
        blowStrength + "%";


    if (
        rms > blowThreshold
    ) {

        blowDetectedFrames++;


        flickerFlame(
            blowStrength
        );

    } else {

        blowDetectedFrames = 0;


        candleFlame.style.transform =
            "scale(1)";

    }


    if (
        blowDetectedFrames >=
        requiredBlowFrames
    ) {

        blowOutCandle();

        return;

    }


    requestAnimationFrame(
        measureMicrophone
    );

}


/* ===============================
   FLAME FLICKER
================================ */

function flickerFlame(strength) {

    const scale =
        Math.max(
            0.35,
            1 - (strength / 150)
        );


    candleFlame.style.transform =
        `scale(${scale}) rotate(${Math.random() * 12 - 6}deg)`;

}


/* ===============================
   BLOW OUT CANDLE
================================ */

function blowOutCandle() {

    microphoneListening = false;


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(
                (track) => {

                    track.stop();

                }
            );

    }


    candleFlame.classList.add(
        "hidden"
    );


    blowMeterFill.style.width =
        "100%";


    micStatus.textContent =
        "💨 You blew it out!";


    micStatus.style.color =
        "#ffb6dd";


    /*
     * Happy Birthday starts
     * immediately after the candle
     * goes out.
     */

    playBirthdaySong();


    setTimeout(() => {

        cakeComplete
            .classList
            .remove("hidden");

    }, 500);

}


/* =====================================================
   FINAL PERSONAL MESSAGE
===================================================== */

function showPersonalMessage() {

    stopSupportMusic();


    /*
     * Prevent duplicate final screens.
     */

    const oldFinal =
        document.getElementById(
            "personal-message-screen"
        );


    if (oldFinal) {

        oldFinal.remove();

    }


    const finalScreen =
        document.createElement("section");


    finalScreen.id =
        "personal-message-screen";


    finalScreen.style.cssText = `
        width: 100%;
        max-width: 760px;
        margin: 30px auto 20px;
        padding: 10px 18px 30px;
        box-sizing: border-box;
        text-align: center;
        animation: finalMessageAppear 1.2s ease forwards;
    `;


    finalScreen.innerHTML = `

        <div
            style="
                font-size: 42px;
                margin-bottom: 8px;
            "
        >
            💌
        </div>


        <h2
            style="
                margin: 0 0 8px;
                color: #ffb6dd;
                font-size: 30px;
                line-height: 1.25;
            "
        >
            One Last Thing...
        </h2>


        <p
            style="
                margin: 0 0 25px;
                color: #e9dfe5;
                font-size: 15px;
            "
        >
            This part is just from me to you. 🤎
        </p>


        <div
            style="
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,182,221,0.25);
                border-radius: 22px;
                padding: 28px 24px;
                text-align: left;
                box-shadow: 0 15px 45px rgba(0,0,0,0.25);
                backdrop-filter: blur(10px);
                max-height: 58vh;
                overflow-y: auto;
                line-height: 1.8;
                color: #f4edf1;
                font-size: 16px;
            "
        >

            <p
                style="
                    margin-top: 0;
                    font-size: 19px;
                    color: #ffffff;
                "
            >
                Dear Joe,
            </p>


            <p>
                I couldn't believe you would become such a big
                part of my life.
            </p>


            <p>
                A year before, I used to see you from far and
                thought that was enough for me. I felt frightened
                even seeing you in church, and I prayed to have
                you in my life. But without me making any effort,
                you just came into my life, just like that, and
                now you're a part of my life.
            </p>


            <p>
                You've been there through my difficulties and my
                happy moments. We have had so many beautiful
                memories together our travels, food, and all
                those little moments. Because of you, I started
                feeling happy in Chennai.
            </p>


            <p>
                We've had fights, silence, fun, and love in our
                relationship. Through all of it, I am truly
                grateful to have you in my life.
            </p>


            <p>
                In your difficult moments and in your happy
                moments, I'll always be with you, to the best of
                my ability. I'll always be there for you and stand
                by you through everything.
            </p>


            <p
                style="
                    margin-bottom: 8px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #ffb6dd;
                "
            >
                Once again, happiest birthday, my dear Joe! ❤️
            </p>


            <p
                style="
                    margin-top: 8px;
                    margin-bottom: 0;
                    font-size: 17px;
                    text-align: center;
                    color: #ffffff;
                "
            >
                Now go enjoy your birthday! 🎂😂❤️
            </p>

        </div>


        <div
            style="
                margin-top: 28px;
                padding: 22px 18px;
                border-radius: 20px;
                background: rgba(255,255,255,0.05);
            "
        >

            <div
                style="
                    font-size: 25px;
                    margin-bottom: 8px;
                "
            >
                👀
            </div>


            <h3
                style="
                    margin: 0 0 8px;
                    color: #ffffff;
                    font-size: 21px;
                "
            >
                Okay... one last little thing.
            </h3>


            <p
                style="
                    margin: 0 auto 18px;
                    max-width: 500px;
                    color: #d8ccd3;
                    line-height: 1.6;
                    font-size: 14px;
                "
            >
                You survived all my questions.
                Now I want to see what you actually answered. 😂❤️
            </p>


            <button
                id="send-answers-button"
                type="button"
                style="
                    border: none;
                    border-radius: 999px;
                    padding: 14px 25px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    color: #351d29;
                    background: #ffb6dd;
                    box-shadow: 0 8px 25px rgba(255,182,221,0.25);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                "
            >
                Send Me Your Answers 💌
            </button>


            <p
                id="send-answers-status"
                style="
                    margin: 12px 0 0;
                    color: #bdaeb6;
                    font-size: 12px;
                "
            >
            </p>

        </div>

    `;


    /*
     * Add a small animation only once.
     */

    if (
        !document.getElementById(
            "final-message-animation"
        )
    ) {

        const animationStyle =
            document.createElement("style");


        animationStyle.id =
            "final-message-animation";


        animationStyle.textContent = `

            @keyframes finalMessageAppear {

                from {
                    opacity: 0;
                    transform: translateY(25px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }

            }

            #send-answers-button:hover {
                transform: translateY(-2px);
                box-shadow:
                    0 12px 30px
                    rgba(255,182,221,0.35);
            }

            #send-answers-button:active {
                transform: translateY(1px);
            }

        `;


        document.head.appendChild(
            animationStyle
        );

    }


    /*
     * Put the final message after
     * the cake challenge.
     */

    cakeChallenge
        .parentElement
        .appendChild(
            finalScreen
        );


    /*
     * Send quiz answers button.
     */

    const sendAnswersButton =
        document.getElementById(
            "send-answers-button"
        );


    sendAnswersButton.addEventListener(
        "click",
        () => {

            sendQuizAnswersToWhatsApp();

        }
    );


    /*
     * Scroll gently to the
     * personal message.
     */

    setTimeout(() => {

        finalScreen.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);


}


/* =====================================================
   CREATE WHATSAPP MESSAGE
===================================================== */

function sendQuizAnswersToWhatsApp() {

    const answer1 =
        answers["1"] ||
        "No answer recorded";


    const answer2 =
        answers["2"] ||
        "No answer recorded";


    const answer3 =
        answers["3"] ||
        "No answer recorded";


    const answer4 =
        answers["4"] ||
        "No answer recorded";


    const answer5 =
        answers["5"] ||
        "No answer recorded";


    const whatsappMessage =

`Hey Princy! I finished your birthday quiz 😂❤️

Here are my answers:

1. ₹10,000 — ${answer1}

2. My biggest weakness — ${answer2}

3. When someone I care about is struggling — ${answer3}

4. When someone misunderstands me — ${answer4}

5. One decision I would change — ${answer5}

I survived all five questions! 😂❤️`;


    const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(
            whatsappMessage
        );


    window.open(
        whatsappURL,
        "_blank"
    );


    const status =
        document.getElementById(
            "send-answers-status"
        );


    if (status) {

        status.textContent =
            "WhatsApp is opening with your answers ready to send. 💌";

    }

}


/* =====================================================
   CAKE CONTINUE → FINAL PERSONAL MESSAGE
===================================================== */

cakeNextButton.addEventListener(
    "click",
    () => {

        /*
         * Hide the cake.
         */

        cakeChallenge
            .classList
            .add("hidden");


        /*
         * Show the familiar angel
         * transition one final time.
         */

        angelTransition
            .classList
            .remove("hidden");


        playAngelSound();


        /*
         * After the angel transition,
         * show the personal message.
         */

        setTimeout(() => {

            angelTransition
                .classList
                .add("hidden");


            showPersonalMessage();

        }, 1400);

    }
);