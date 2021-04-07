function compressByCUB1(string) {
    let min = 255, max = 0, bitsPerSymbol, binaryOut = "", out = "";

    // Getting min and max values
    // Min value will subtract from every symbol on string, to get count of needed bits smaller ( main idea of algorithm )
    for(let i = 0; i < string.length; i++) {
        if(min > string[i].charCodeAt()) {
            min = string[i].charCodeAt();
        }

        if(max < string[i].charCodeAt()) {
            max = string[i].charCodeAt();
        }
    }

    // Get bits count for one compressed symbol
    bitsPerSymbol = (max - min).toString(2).length;

    // Info to decompress
    out = String.fromCharCode(bitsPerSymbol) + String.fromCharCode(min);

    // Making binary view of compressed string
    for(let i = 0; i < string.length; i++) {
        binaryOut += (string[i].charCodeAt() - min).toString(2).padStart(bitsPerSymbol, 0);
    }

    // Converting to binary data
    for(let i = 0; i < binaryOut.length; i += 8) {
        out += String.fromCharCode(parseInt(binaryOut.substr(i, 8), 2));
    }

    // Adding info about how much zeros we need to add to the end of binary view of string
    // Fixes bug, when binary view of compressed string is differs from original.

    let binaryString = "";

    for(let i = 2; i < out.length - 1; i++) {
        binaryString += out[i].charCodeAt().toString(2).padStart(8, 0);
    }

    binaryString += out[out.length - 1].charCodeAt().toString(2);

    // Adding this info
    out = String.fromCharCode(binaryOut.length - binaryString.length) + out;

    return out;
}

function decompressByCUB1(string) {
    // Getting info
    let additionalBits = string[0].charCodeAt();
    let bitsPerSymbol = string[1].charCodeAt();
    let min = string[2].charCodeAt();
    string = string.slice(3);

    let binaryString = "";

    // Getting binary view
    for(let i = 0; i < string.length - 1; i++) {
        binaryString += string[i].charCodeAt().toString(2).padStart(8, 0);
    }
    for(let i = 0; i < additionalBits; i++) {
        binaryString += "0";
    }

    // Adding additional zeros, descibed on 30 row
    binaryString += string[string.length - 1].charCodeAt().toString(2);

    let out = "";

    // Converting binary to typical view.
    for(let i = 0; i < binaryString.length; i += bitsPerSymbol) {
        out += String.fromCharCode(min + parseInt(binaryString.substr(i, bitsPerSymbol), 2));
    }

    return out;
}