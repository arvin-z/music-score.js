"use strict";
console.log('Loaded music-score.js');

(function(global, document) {
    function MusicScore(sheetId) {

        let _self = this;
    
        _self.lines = [];
        _self.tempo = 0;
        _self.originalTempo = 0;
        _self.tempoModified = false;
        _self.time = [4, 4];
        _self.linesModified = false;
        _self.original = [];
    
        _self.sheet = document.getElementById(sheetId);
        _self.sheet.style.cssText = 'margin-left: 30px; margin-bottom:100px; padding-left: 20px;';
        
    }
    
    MusicScore.prototype = {
    
        addBar: function() {
            const line = document.createElement('div');
            const divider = document.createElement('div');
            divider.classList.add('divider', 'last');
            line.className = 'line';
            if (this.lines.length === 0) {
                const time = document.createElement('p');
                time.className = 'timesignature';
                time.textContent = "" + this.time[0] + this.time[1];
                line.append(time);
            }
            line.append(divider);
            if (this.lines.length > 0) {
                // remove ending line from previous bar
                const prevLast = this.lines[this.lines.length - 1];
                prevLast.lastChild.classList.remove('last');
            }
            this.sheet.append(line);
            this.lines.push(line);
        },
        
        setTempo: function(bpm) {
            this.tempo = bpm;
            this.originalTempo = bpm;
        },
    
        setBars: function(n) {
            let i;
            for (i=0;i<n;i++) {
                this.addBar();
            }
        },
    
        setTimeSignature: function (top, bottom) {
            this.time = [top, bottom];
            if (this.lines.length > 0) {
                this.lines[0].getElementsByClassName('timesignature')[0].textContent = "" + this.time[0] + this.time[1];
            }
        },
    
        addNote: function(l, n, type) {
            const flipped = ['B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6']
            const midline = ['A5', 'C6', 'C4'];
            const offline = ['B5', 'B3']
            const line = this.lines[l];
            const note = document.createElement('div');
            let type_formatted;
            let n_formatted;
            if (n === 'rest') {
                type_formatted = type + 'rest';
                n_formatted = 'E4';
            } else {
                type_formatted = type + 'note';
                n_formatted = n;
            }
            note.classList.add(n_formatted, type_formatted, 'note');
            if (n === 'rest') {
                note.classList.add('rest');
            }
            if (flipped.includes(n)) {
                note.classList.add('flipped');
            }
            if (midline.includes(n_formatted)) {
                const ext = document.createElement('div');
                ext.classList.add('extendmid');
                note.appendChild(ext);
            }
            if (offline.includes(n_formatted)) {
                const ext = document.createElement('div');
                ext.classList.add('extendbot');
                note.appendChild(ext);
            }
            if (n_formatted === 'C6') {
                const ext = document.createElement('div');
                ext.classList.add('extend1');
                note.appendChild(ext);
            }
            line.insertBefore(note, line.getElementsByClassName('divider')[0]);
        },
    
        play: function() {
    
            if (this.tempo === 0) {
                console.log('Error: there is no tempo defined');
                return;
            }
            
            const singleBeat = (60/this.tempo)*1000;
            const noteDurations = {
                'eighth': singleBeat / 2,
                'quarter': singleBeat,
                'half': singleBeat * 2,
                'whole': singleBeat * 4
            };
            let currDuration;
    
    
            let i;
            let j;
            let waitTime = 0;
            for (i=0; i < this.lines.length; i++) {
                for (j=0; j < this.lines[i].children.length; j++) {
                    const currNote = this.lines[i].children[j];
                    if (currNote.classList.contains('note')) {
                        if (currNote.classList.contains('quarternote') || currNote.classList.contains('quarterrest')) {
                            currDuration = noteDurations['quarter']
                        } else if (currNote.classList.contains('halfnote') || currNote.classList.contains('halfrest')) {
                            currDuration = noteDurations['half']
                        } else if (currNote.classList.contains('eighthnote') || currNote.classList.contains('eighthrest')) {
                            currDuration = noteDurations['eighth']
                        } else if (currNote.classList.contains('wholenote') || currNote.classList.contains('wholerest')) {
                            currDuration = noteDurations['whole']
                        } else {
                            currDuration = 0;
                        }
                        setTimeout(function(){
                            currNote.style.filter = 'invert(58%) sepia(65%) saturate(5964%) hue-rotate(222deg) brightness(97%) contrast(109%)';
                        }, waitTime);
                        waitTime += currDuration;
                        setTimeout(function(){
                            currNote.style.filter = '';
                        }, waitTime);
                    }
                }
            }
        },
    
        annotate: function(l, text) {
            const line = this.lines[l];
            const annotation = document.createElement('p');
            annotation.classList.add('annotation')
            annotation.textContent = text;
            line.prepend(annotation)
        },
    
        transpose: function(dir) {
            let amt;
            if (dir === 'up') {
                amt = 1;
            }
            else if (dir === 'down') {
                amt = -1;
            } else {
                console.log('Invalid transpose direction')
                return;
            }
            if (!this.linesModified) {
                this.original = this.lines.map((a) => a.cloneNode(true));
            }
            this.linesModified = true;
            const noteList = ['B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6']
            // for every line
            for (let i=0; i<this.lines.length; i++) {
                const line = this.lines[i];
                let notes = [];
                let removeList = [];
                // get info for each note
                for (let j=0; j<line.children.length; j++) {
                    const item = line.children[j];
                    if (item.classList.contains('note')) {
                        const noteType = item.classList[1].slice(0, -4);
                        if (item.classList.contains('rest')) {
                            notes.push(['rest', noteType])
                        } else {
                            notes.push([noteList[noteList.indexOf(item.classList[0]) + amt], noteType])
                        }
                        
                        removeList.push(item);
                    }
                }
                removeList.map((item) => {item.remove();})
                for (let j=0; j<notes.length; j++) {
                    this.addNote(i, notes[j][0], notes[j][1]);
                }
            }
        },
    
        resetNotes: function() {
            this.lines = [...this.original];
            this.sheet.innerHTML = '';
            for (let i=0; i<this.lines.length;i++) {
                this.sheet.appendChild(this.lines[i]);
            }
            this.linesModified = false;
        },
    
        tempoUp: function() {
            this.tempo++;
        },
    
        tempoDown: function() {
            this.tempo--;
        },
    
        tempoReset: function() {
            this.tempo = this.originalTempo;
        },
    
        getTempo: function() {
            return this.tempo;
        }
    
    
    
    }
    global.MusicScore = global.MusicScore || MusicScore;
})(window, window.document);


