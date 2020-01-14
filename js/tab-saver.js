class TabSaver {
    save(){
        let format = this.formatFile(
            this.getSongTitle(), 
            this.getArtistName(), 
            this.getInstrument(), 
            this.getTab());
            
        let blob = new Blob([format], { type: "text/plain;charset=utf-8" });
        saveAs(blob, this.getFileName());
    }

    getFileName(){
        return document.getElementById("save-name").value;
    }

    getArtistName(){
        return document.getElementById("artist-name").value;
    }

    getSongTitle(){
        return document.getElementById("song-title").value;
    }

    getInstrument(){
        return $('#to-instrument option:selected').text();
    }

    getTab(){
        return document.getElementById("out-tab").value;
    }

    formatFile(songTitle, artist, instr, tab){
        return `${songTitle}\n${artist}\n${instr}\n\n${tab}`;
    }
}

module.exports = TabSaver;