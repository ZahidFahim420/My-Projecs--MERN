console.log("Welcome to Spotify");
//Initialize the Variables

let songIndex = 0;

let songs = [

    { songName: "Niye jabe ki amay -Dagi", filePath: "Audio/Niye jabe ki amay -Dagi.mp3", coverPath: "cover/headphone.jpg" },

    { songName: "Sahiba - vijay", filePath: "Audio/Sahiba - vijay.mp3", coverPath: "cover/listeningMusic.jpg" },

    { songName: "Ghorgari-By Highway", filePath: "Audio/Ghorgari-By Highway.mp3", coverPath: "cover/images (1).jpg" },

    { songName: "Bayaan - Nahin Milta.mp3", filePath: "Audio/Bayaan - Nahin Milta.mp3", coverPath: "cover/images.jpg" },

    { songName: "Ghum(official) odd sig.", filePath: "Audio/Ghum(official) odd sig..mp3", coverPath: "cover/yehhh.jpg" },

    //
     { songName: "Chardike kolahol", filePath: "Audio/Chardike kolahol.mp3", coverPath: "cover/bg.jpg" },

    { songName: "Sanson Ki Mala pe", filePath: "Audio/Sanson Ki Mala pe.mp3", coverPath: "cover/music.jpg" },

    { songName: "Raanjhan", filePath: "Audio/Raanjhan.mp3", coverPath: "cover/purple1.jpg" },


]

// let audioElement = new Audio('Audio/Niye jabe ki amay -Dagi.mp3');

let audioElement = new Audio(songs[0].filePath);
// let play = document.getElementById("play");
let masterPlay = document.getElementById("masterPlay");

let myProgressBar = document.getElementById('myProgressBar');

// console.log(audioElement);
// audioElement.play();

let songItem = Array.from(document.getElementsByClassName('songItem')); 

songItem.forEach((element , i) => {
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});

//from my head and co-pilot
//for updating duration of songs on the UI
let timeStampSpans = document.querySelectorAll('.timeStamp');

songs.forEach((song, i) => {
    let audio = new Audio(song.filePath);
    audio.addEventListener('loadedmetadata', () => {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);
        let formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeStampSpans[i]) {
            timeStampSpans[i].textContent = formatted;
        }
    });
});



//playing from  the list of songs 

let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));


songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);           
        songIndex = parseInt(e.target.id.replace("songList", "")) - 1;
        // console.log(songIndex);
        audioElement.src = songs[songIndex].filePath;   
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        songInfoGif.style.opacity = 1; // Show GIF
    });});


//play and pause song from the bottom controller
// let play = document.getElementById("play");
let songInfoGif = document.querySelector('.songInfo img');

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        songInfoGif.style.opacity = 1; // Show GIF
        
        
    } 
    else {
        audioElement.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
        songInfoGif.style.opacity = 0; // Show GIF
    }
    
});



// Update progress bar as audio plays
audioElement.addEventListener('timeupdate', () => {
    // Calculate progress percentage
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});


// Seek (when user drags or clicks on the progress bar)
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle song item click

