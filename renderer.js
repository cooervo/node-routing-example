"use strict";

const fs = require("fs");

function mergeValues(values, content) {
    //cycle over the keys
    for (var key in values) {
        //replace all {{key}} with the value from the values object
        content = content.replace("{{" + key + "}}", values[key]);
    }

    //return merged content
    return content;
}

//Manages the reading of files and merges values
function writeView(templateName, values, response) {

    //Read from template files
    var fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});

    //Insert values into the content
    fileContents = mergeValues(values, fileContents);

    //Write out the contents into the response
    response.write(fileContents);
};

module.exports.writeView = writeView;