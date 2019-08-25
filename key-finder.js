// main loop
function genKey(){
    // set up instruments
    // from
    var fromInstr = $("#from-instrument").val();
    inStrings = chooseInstrument(fromInstr);

    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    // transpose
    //converted = findKey();
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
    return noteHoles;
}

// draw the chart
function drawChart() {
    var keys = [['Keys', 'Likelyness of Major Key']];
    var noteHoles = findKey($('#in-tab').val());
    var keyHoles = rankKeys(noteHoles);
    //keys.push([['Keys', 'Likelyness of Major Key']]);

    // gather relevant keys
    for(var i=0;i<keyHoles.length;i++){
        if(keyHoles[i] > 0){
            // add
            keys.push([numberToNote(i),keyHoles[i]]);
        }
    }

    var data = google.visualization.arrayToDataTable(keys);

    var options = {
        title: 'Likelyhood of Major Keys',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
}

// rank keys
function rankKeys(noteArray){
    var keyHoles = new Array(12); // a slot for each note

    // init
    for (var i = 0; i < keyHoles.length; i++) {
        keyHoles[i] = 0;
        keyHoles[i] += noteArray[modNote(i)]*3; // bonus for root note
        keyHoles[i] -= noteArray[modNote(i+1)]*5;
        keyHoles[i] += noteArray[modNote(i+2)];
        keyHoles[i] -= noteArray[modNote(i+3)]*5;
        keyHoles[i] += noteArray[modNote(i+4)];
        keyHoles[i] += noteArray[modNote(i+5)];
        keyHoles[i] -= noteArray[modNote(i+6)]*5;
        keyHoles[i] += noteArray[modNote(i+7)];
        keyHoles[i] -= noteArray[modNote(i+8)]*5;
        keyHoles[i] += noteArray[modNote(i+9)];
        keyHoles[i] -= noteArray[modNote(i+10)]*5;
        keyHoles[i] += noteArray[modNote(i+11)];
        
        console.log(i + ": " + keyHoles[i]);
    }

    return keyHoles;
}

// raw note
function modNote(note){
    return note%12;
}