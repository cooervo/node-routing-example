var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("querystring");

const HEADER = {'Content-type': 'text/html'};

//handles HTTP route GET / and POST / i.e. Home or "/"
function home(request, response) {

    //if url == "/" && GET
    if (request.url === "/") {

        if (request.method.toLowerCase() === "get") {

            response.writeHead(200, HEADER);

            renderer.writeView("header", {}, response);
            renderer.writeView("search", {}, response);
            renderer.writeView("footer", {}, response);
            response.end();

            //if url == "/" && POST
        } else {

            //get the POST data from body
            request.on("data", function (postBody) {

                //Extract username
                var query = queryString.parse(postBody.toString());
                response.writeHead(303, {Location: "/" + query.username});
                response.end();
                //redirect to /:username
            });


        }

    }
}

//handles HTTP route GET /:username i.e. /cooervo
function user(request, response) {

    var username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, HEADER);

        renderer.writeView("header", {}, response);

        //get JSON from treehouse
        var studentProfile = new Profile(username);

        //on "end"
        studentProfile.on("end", function (profileJSON) {
            //show profile

            //store needed values
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javaScriptPoints: profileJSON.points.JavaScript
            }

            //Simple response
            renderer.writeView("profile", values, response);
            renderer.writeView("footer", {}, response);
            response.end();
        });

        //on "error"
        studentProfile.on("error", function (error) {
            //show error
            renderer.writeView("error", error.message, response);
            renderer.writeView("search", {}, response);
            renderer.writeView("footer", {}, response);
            response.end();

        })


    }

}

module.exports.home = home;
module.exports.user = user;