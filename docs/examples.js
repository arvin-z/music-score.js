"use strict";
console.log('examples.js loaded');

const demoSong = new MusicScore('demo');
demoSong.setBars(2);
demoSong.setTimeSignature(5, 4);
demoSong.addNote(0, 'D4', 'quarter');
demoSong.addNote(0, 'E4', 'quarter');
demoSong.addNote(0, 'F4', 'quarter');
demoSong.addNote(0, 'G4', 'quarter');
demoSong.addNote(0, 'A4', 'quarter');
demoSong.addNote(1, 'B4', 'quarter');
demoSong.addNote(1, 'C5', 'quarter');
demoSong.addNote(1, 'D5', 'quarter');
demoSong.addNote(1, 'E5', 'quarter');
demoSong.addNote(1, 'F5', 'quarter');
demoSong.annotate(0, 'mp');
demoSong.annotate(1, 'f');

const playerSong = new MusicScore('demo2');
playerSong.setTempo(90);
playerSong.setBars(3);
playerSong.setTimeSignature(4, 4);
playerSong.addNote(0, 'C4', 'quarter');
playerSong.addNote(0, 'C4', 'quarter');
playerSong.addNote(0, 'G4', 'quarter');
playerSong.addNote(0, 'G4', 'quarter');
playerSong.addNote(1, 'A4', 'quarter');
playerSong.addNote(1, 'A4', 'quarter');
playerSong.addNote(1, 'G4', 'half');
playerSong.addNote(2, 'rest', 'quarter');
playerSong.addNote(2, 'E4', 'eighth');
playerSong.addNote(2, 'F4', 'eighth');
playerSong.addNote(2, 'rest', 'half');



const transposerSong = new MusicScore('demo3');
transposerSong.setBars(1);
transposerSong.setTimeSignature(2, 4);

transposerSong.addNote(0, 'G4', 'quarter');
transposerSong.addNote(0, 'F4', 'eighth');
transposerSong.addNote(0, 'G4', 'eighth');


function playListener() {
    playerSong.play();
}

function transposeUp() {
    transposerSong.transpose('up');
}

function transposeDown() {
    transposerSong.transpose('down');
}

function resetListener() {
    transposerSong.resetNotes();
}

function tempoUpListener() {
    playerSong.tempoUp();
    document.getElementById('demo2Tempo').innerText = playerSong.getTempo();
}
function tempoDownListener() {
    playerSong.tempoDown();
    document.getElementById('demo2Tempo').innerText = playerSong.getTempo();
}
function tempoResetListener() {
    playerSong.tempoReset();
    document.getElementById('demo2Tempo').innerText = playerSong.getTempo();
}

window.onload = function() {
    document.getElementById('demo2Tempo').innerText = playerSong.getTempo();
}


