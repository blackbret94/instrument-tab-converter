// guitar strings
var inStrings = [noteToNumber("E",4),noteToNumber("B",3),noteToNumber("G",3),noteToNumber("D",3),noteToNumber("A",2),noteToNumber("E",2)];

// mandolin strings
var outStrings = [noteToNumber("E",5),noteToNumber("A",4),noteToNumber("D",4),noteToNumber("G",3)];

var octiveShift = 0;

// main program loop
function genTab() {
    // read octive shift
    octiveShift = parseInt($("#octive-shift").val());

    // set up instruments
    // from
    var fromInstr = $("#from-instrument").val();
    inStrings = chooseInstrument(fromInstr);

    // to
    var toInstr = $("#to-instrument").val();
    outStrings = chooseInstrument(toInstr);

    // transpose
    converted = transpose( $('#in-tab').val());
    $('#out-tab').val(converted);
    return false;
}

// saves the tab
function saveTab() {
    // get file name
    var filename = $('#save-name').val();

    // get top matter
    //var filename = $('#save-name');

    // get tab
    var tab = $('#out-tab').val();


    var blob = new Blob([tab], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename);
}

// converts string names to tunings
function chooseInstrument(instr){
    switch(instr){
        case "guitar-standard":
            return [noteToNumber("E",4),noteToNumber("B",3),noteToNumber("G",3),noteToNumber("D",3),noteToNumber("A",2),noteToNumber("E",2)];

        case "guitar-drop-d":
            return [noteToNumber("E",4),noteToNumber("B",3),noteToNumber("G",3),noteToNumber("D",3),noteToNumber("A",2),noteToNumber("D",2)];

        case "guitar-half-down":
            return [noteToNumber("Eb",4),noteToNumber("Bb",3),noteToNumber("F#",3),noteToNumber("C#",3),noteToNumber("Ab",2),noteToNumber("Eb",2)];

        case "guitar-one-down":
            return [noteToNumber("D",4),noteToNumber("A",3),noteToNumber("F",3),noteToNumber("C",3),noteToNumber("G",2),noteToNumber("D",2)];

        case "mando-standard":
            return [noteToNumber("E",5),noteToNumber("A",4),noteToNumber("D",4),noteToNumber("G",3)];

        case "mando-standard":
            return [noteToNumber("E",5),noteToNumber("A",4),noteToNumber("D",4),noteToNumber("G",3)];

        case "uku-standard":
            return [noteToNumber("G",4),noteToNumber("C",4),noteToNumber("E",4),noteToNumber("A",4)];
    }
    
}

// transpose
function transpose(tab){
    // split on lines
    var lineTab = tab.split("\n"); // split by line
    var splitTab = []; // split by -
    var outTab = new Array(outStrings); // what is printed

    // init
    for(var i=0;i<outStrings.length;i++){
        outTab[i] = [];
        for(var j=0;j<lineTab[i].length;j++){
            outTab[i][j]="-";
        }
    }

    // fill
    for(var i=0;i<lineTab.length && i<inStrings.length;i++){
        // split frets
        splitTab[i] = lineTab[i];//.split("-");

        // adjust
        for(var j=0;j<splitTab[i].length;j++){
            // attempt to parse as int
            var parsed = parseInt(splitTab[i][j]);

            if(!isNaN(parsed) && parsed != null) {
                // convert to noteNumber
                var noteNumber = parsed + inStrings[i] + octiveShift*12;
                var bestString = pickString(noteNumber);
                console.log(noteNumber + " " + bestString);
                outTab[bestString][j] = toFret(noteNumber,outStrings[bestString]);
            }
        }
    }

    // reform
    var reformedTab = ""; // string sent to output

    for(var i=0;i<outStrings.length;i++){
        for(var j=0;j<outTab[i].length;j++){
            reformedTab = reformedTab.concat(outTab[i][j]);
        }
        reformedTab = reformedTab.concat("\n")
    }

    return reformedTab;
}

// takes a note and octive and returns an int
function noteToNumber(note, octive){
    var noteNum = 0;
    switch(note){
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

    return noteNum + (octive * 12);
}

// finds the most appropriate string for a note, restricts to limited frets
function pickString(noteNum){
    var bestString = 0; // what string is most appropriate?
    var bestDistance = 100000; // how far am I from the open string?

    for(var k=0; k<outStrings.length; k++){
        var thisDistance = noteNum-outStrings[k];
        if(thisDistance < bestDistance && thisDistance >= 0){
            bestString = k;
            bestDistance = thisDistance;
        }
    }

    return bestString;
}

// converts from a raw note number to a fret number
function toFret(noteNum, stringNoteNumber){
    return noteNum-stringNoteNumber;
}