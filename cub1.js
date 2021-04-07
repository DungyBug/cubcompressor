function compressByCUB1(string) {
    let min = 255, max = 0, bitsPerSymbol, binaryOut = "", out = "";

    for(let i = 0; i < string.length; i++) {
        if(min > string[i].charCodeAt()) {
            min = string[i].charCodeAt();
        }

        if(max < string[i].charCodeAt()) {
            max = string[i].charCodeAt();
        }
    }

    bitsPerSymbol = (max - min).toString(2).length;

    out = String.fromCharCode(bitsPerSymbol) + String.fromCharCode(min);

    for(let i = 0; i < string.length; i++) {
        binaryOut += (string[i].charCodeAt() - min).toString(2).padStart(bitsPerSymbol, 0);
    }

    for(let i = 0; i < binaryOut.length; i += 8) {
        out += String.fromCharCode(parseInt(binaryOut.substr(i, 8), 2));
    }

    let binaryString = "";

    for(let i = 2; i < out.length - 1; i++) {
        binaryString += out[i].charCodeAt().toString(2).padStart(8, 0);
    }

    binaryString += out[out.length - 1].charCodeAt().toString(2);

    out = String.fromCharCode(binaryOut.length - binaryString.length) + out;

    return out;
}

function decompressByCUB1(string) {
    let additionalBits = string[0].charCodeAt();
    let bitsPerSymbol = string[1].charCodeAt();
    let min = string[2].charCodeAt();
    string = string.slice(3);

    let binaryString = "";

    for(let i = 0; i < string.length - 1; i++) {
        binaryString += string[i].charCodeAt().toString(2).padStart(8, 0);
    }
    for(let i = 0; i < additionalBits; i++) {
        binaryString += "0";
    }

    binaryString += string[string.length - 1].charCodeAt().toString(2);

    let out = "";

    for(let i = 0; i < binaryString.length; i += bitsPerSymbol) {
        out += String.fromCharCode(min + parseInt(binaryString.substr(i, bitsPerSymbol), 2));
    }

    return out;
}

/*
110000110001110010110011110100110101110110110111111000111001110001110000110001110001110001110010110001110011110001110100110001110101110001110110110001110111110001111000110001111001110010110000
110000110001110010110011110100110101110110110111111000111001110001110000110001110001110001110010110001110011110001110100110001110101110001110110110001110111110001111000110001111001110010110000
*/