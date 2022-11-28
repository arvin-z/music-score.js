"use strict";
console.log('index.js loaded');

const homeSheet = new MusicScore('exsheet');
homeSheet.setBars(2);
homeSheet.setTimeSignature(4, 4);
homeSheet.addNote(0, 'D4', 'quarter');
homeSheet.addNote(0, 'B4', 'quarter');
homeSheet.addNote(0, 'C4', 'quarter');
homeSheet.addNote(0, 'C5', 'quarter');
homeSheet.addNote(1, 'D4', 'quarter');
homeSheet.addNote(1, 'B4', 'quarter');
homeSheet.addNote(1, 'C4', 'quarter');
homeSheet.addNote(1, 'C5', 'quarter');
