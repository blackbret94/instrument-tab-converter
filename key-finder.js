// main loop
function genKey(){
    // set up instruments
    // from
    var fromInstr = $("#from-instrument").val();
    inStrings = chooseInstrument(fromInstr);

    // transpose
    converted = findKey($('#in-tab').val());
    //$('#out-tab').val(converted);
    return false;
}

// find key
function findKey(tab) {
    // split on lines
    var lineTab = tab.split("\n"); // split by line
    var splitTab = []; // split by -
    var noteHoles = new Array(12); // a slot for each note

    // init
    for (var i = 0; i < noteHoles.length; i++) {
        noteHoles[i] = 0;
    }

    // fill
    for (var i = 0; i < lineTab.length && i < inStrings.length; i++) {
        // split frets
        splitTab[i] = lineTab[i];

        // adjust
        for (var j = 0; j < splitTab[i].length; j++) {
            // attempt to parse as int
            var parsed = parseInt(splitTab[i][j]);

            if (!isNaN(parsed) && parsed != null) {
                // convert to noteNumber
                var noteNumber = (parsed + inStrings[i]) % 12
                noteHoles[noteNumber]++;
                //var bestString = pickString(noteNumber);
                //console.log(noteNumber + " " + bestString);
                //outTab[bestString][j] = toFret(noteNumber, outStrings[bestString]);
            }
        }
    }

    console.log("Notes:");
    for(var i=0;i<noteHoles.length;i++){
        console.log(noteHoles[i]);
    }

    console.log("Keys:");

    rankKeys(noteHoles);
    
    // reform
    /*var reformedTab = ""; // string sent to output

    for (var i = 0; i < outStrings.length; i++) {
        for (var j = 0; j < outTab[i].length; j++) {
            reformedTab = reformedTab.concat(outTab[i][j]);
        }
        reformedTab = reformedTab.concat("\n")
    }

    return reformedTab;*/
}

// rank keys
function rankKeys(noteArray){
    var keyHoles = new Array(12); // a slot for each note

    // init
    for (var i = 0; i < keyHoles.length; i++) {
        keyHoles[i] = 0;
        keyHoles[i] += noteArray[modNote(i)]*2; // bonus for root note
        keyHoles[i] -= noteArray[modNote(i+1)];
        keyHoles[i] += noteArray[modNote(i+2)];
        keyHoles[i] -= noteArray[modNote(i+3)];
        keyHoles[i] += noteArray[modNote(i+4)];
        keyHoles[i] += noteArray[modNote(i+5)];
        keyHoles[i] -= noteArray[modNote(i+6)];
        keyHoles[i] += noteArray[modNote(i+7)];
        keyHoles[i] -= noteArray[modNote(i+8)];
        keyHoles[i] += noteArray[modNote(i+9)];
        keyHoles[i] -= noteArray[modNote(i+10)];
        keyHoles[i] += noteArray[modNote(i+11)];
        
        console.log(i + ": " + keyHoles[i]);
    }
}

// raw note
function modNote(note){
    return note%12;
}