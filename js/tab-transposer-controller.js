"use strict";

let TabTransposer = require('./tab-transposer');
let TabSaver = require('./tab-saver');

class TabTransposerController {
    constructor(){
        this.inStrings = [this.noteToNumber("E", 4), this.noteToNumber("B", 3), this.noteToNumber("G", 3), this.noteToNumber("D", 3), this.noteToNumber("A", 2), this.noteToNumber("E", 2)];
        this.outStrings = [this.noteToNumber("E", 5), this.noteToNumber("A", 4), this.noteToNumber("D", 4), this.noteToNumber("G", 3)];

        this.octiveShift = 0;
        this.keyShift = 0;
        this.converted = "";
        this.transposer = new TabTransposer();
        this.saver = new TabSaver();

        this.initButtons();
    }

    initButtons(){
        document.getElementById("convert-button").onclick = this.generate.bind(this);
        document.getElementById("download-file-button").onclick = this.saver.save.bind(this.saver);
    }

    generate(){
        this.octaveShift = this.getOctaveShift();
        this.keyShift = this.getKeyShift();
        this.inStrings = this.getInStrings();
        this.outStrings = this.getOutStrings();
        let tab= document.getElementById("in-tab").value;

        this.converted = this.transposer.transpose(tab, this.inStrings, this.outStrings, this.octaveShift, this.keyShift)
        $('#out-tab').val(this.converted);
    }

    getOctaveShift(){
        return parseInt(document.getElementById("octive-shift").value);
    }

    getKeyShift(){
        return parseInt(document.getElementById("key-shift").value);
    }

    getInStrings(){
        let fromInstr = document.getElementById("from-instrument").value;
        return this.chooseInstrument(fromInstr);
    }

    getOutStrings(){
        let toInstr = document.getElementById("to-instrument").value;
        return this.chooseInstrument(toInstr);
    }

    chooseInstrument(instr) {
        switch (instr) {
            case "guitar-standard":
                return [this.noteToNumber("E", 4), this.noteToNumber("B", 3), this.noteToNumber("G", 3), this.noteToNumber("D", 3), this.noteToNumber("A", 2), this.noteToNumber("E", 2)];
    
            case "guitar-drop-d":
                return [this.noteToNumber("E", 4), this.noteToNumber("B", 3), this.noteToNumber("G", 3), this.noteToNumber("D", 3), this.noteToNumber("A", 2), this.noteToNumber("D", 2)];
    
            case "guitar-half-down":
                return [this.noteToNumber("Eb", 4), this.noteToNumber("Bb", 3), this.noteToNumber("F#", 3), this.noteToNumber("C#", 3), this.noteToNumber("Ab", 2), this.noteToNumber("Eb", 2)];
    
            case "guitar-one-down":
                return [this.noteToNumber("D", 4), this.noteToNumber("A", 3), this.noteToNumber("F", 3), this.noteToNumber("C", 3), this.noteToNumber("G", 2), this.noteToNumber("D", 2)];
    
            case "mando-standard":
                return [this.noteToNumber("E", 5), this.noteToNumber("A", 4), this.noteToNumber("D", 4), this.noteToNumber("G", 3)];
    
            case "mando-standard":
                return [this.noteToNumber("E", 5), this.noteToNumber("A", 4), this.noteToNumber("D", 4), this.noteToNumber("G", 3)];
    
            case "uku-standard":
                return [this.noteToNumber("G", 4), this.noteToNumber("C", 4), this.noteToNumber("E", 4), this.noteToNumber("A", 4)];
            
            case "banjo-standard":
                return [this.noteToNumber("G", 4), this.noteToNumber("D",3), this.noteToNumber("G", 3), this.noteToNumber("B",3), this.noteToNumber("D",4)];
        }
    }

    noteToNumber(note, octave) {
        let noteNum = 0;
        switch (note) {
            case "C": noteNum = 0; break;
            case "C#": noteNum = 1; break;
            case "D": noteNum = 2; break;
            case "Eb": noteNum = 3; break;
            case "E": noteNum = 4; break;
            case "F": noteNum = 5; break;
            case "F#": noteNum = 6; break;
            case "G": noteNum = 7; break;
            case "Ab": noteNum = 8; break;
            case "A": noteNum = 9; break;
            case "Bb": noteNum = 10; break;
            case "B": noteNum = 11; break;
        }

        return noteNum + (octave * 12);
    }

    numberToNote(note){
        let noteName = 0;
        switch (note % 12) {
            case 0: noteName = "C"; break;
            case 1: noteName = "C#"; break;
            case 2: noteName = "D"; break;
            case 3: noteName = "Eb"; break;
            case 4: noteName = "E"; break;
            case 5: noteName = "F"; break;
            case 6: noteName = "F#"; break;
            case 7: noteName = "G"; break;
            case 8: noteName = "Ab"; break;
            case 9: noteName = "A"; break;
            case 10: noteName = "Bb"; break;
            case 11: noteName = "B"; break;
        }

        return noteName;
    }
}

module.exports = TabTransposerController;