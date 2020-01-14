class TabTransposer {
    transpose(tab, inStrings, outStrings, octaveShift, keyShift){
        let lineTab = tab.split("\n");
        let splitTab = [];
        let outTab = this.initOutTab(outStrings, lineTab);

        this.fillTab(lineTab, splitTab, inStrings, outStrings, outTab, octaveShift, keyShift)
        return this.reformTab(outTab, outStrings);
    }

    initOutTab(outStrings, lineTab){
        let outTab = new Array(outStrings); 

        for (let i = 0; i < outStrings.length; i++) {
            outTab[i] = this.initOutTabLine(i, lineTab);
        }

        return outTab;
    }

    initOutTabLine(string, lineTab){
        let newLine = []
        let lineLength = lineTab[0].length;

        if(string < lineTab.length)
            lineLength = lineTab[string].length

        for (let j = 0; j < lineLength; j++) {
            newLine[j] = "-";
        }

        return newLine;
    }

    fillTab(lineTab, splitTab, inStrings, outStrings, outTab, octaveShift, keyShift){
        for (let i = 0; i < lineTab.length && i < inStrings.length; i++) {
            splitTab[i] = lineTab[i];

            for (let j = 0; j < splitTab[i].length; j++) {
                let parsed = parseInt(splitTab[i][j]);

                if (!isNaN(parsed) && parsed != null) {
                    let noteNumber = parsed + inStrings[i] + octaveShift * 12 + keyShift;
                    let bestString = this.pickString(noteNumber, outStrings);
                    console.log(noteNumber + " " + bestString);
                    outTab[bestString][j] = this.toFret(noteNumber, outStrings[bestString]);
                }
            }
        }
    }

    reformTab(outTab, outStrings){
        let reformedTab = ""; // string sent to output

        for (let i = 0; i < outStrings.length; i++) {
            for (let j = 0; j < outTab[i].length; j++) {
                reformedTab = reformedTab.concat(outTab[i][j]);
            }
            reformedTab = reformedTab.concat("\n")
        }

        return reformedTab;
    }

    // finds the most appropriate string for a note, restricts to limited frets
    pickString(noteNum, outStrings) {
        let bestString = 0; // what string is most appropriate?
        let bestDistance = 100000; // how far am I from the open string?

        for (let k = 0; k < outStrings.length; k++) {
            let thisDistance = noteNum - outStrings[k];
            if (thisDistance < bestDistance && thisDistance >= 0) {
                bestString = k;
                bestDistance = thisDistance;
            }
        }

        return bestString;
    }

    // converts from a raw note number to a fret number
    toFret(noteNum, stringNoteNumber) {
        return noteNum - stringNoteNumber;
    }
}

module.exports = TabTransposer;