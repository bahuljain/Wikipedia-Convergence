var http = require('http');
var request = require('request');
var cheerio = require("cheerio");
var RateLimiter = require('limiter').RateLimiter;

// Allow 1 request per seconnd (the wikipedia rate limit)
var limiter = new RateLimiter(1, 'second');

var url = "https://en.wikipedia.org/wiki/Cay";

var host = "https://en.wikipedia.org"
var epoch = 1;
var links_visited = [];

// Callback executes after a page is fetched from Wikipedia
var callback = function(data, epoch) {
    
    $ = cheerio.load(data); // parse HTML document in jQuery usable format
    
    // heading of the wikipedia page
    var heading = $('#firstHeading').text();
    console.log("#" + epoch + " -> " + heading + "");
    
    if(heading !== "Philosophy") {
        var terminate = false;
        
        // Obtains the list of all p tags that are immediate successor of the selected html element
        var p_list = $('#mw-content-text').children("p");
        
        for (var i = 0; (i < p_list.length) && !terminate; i++) {
            
            // Obtains the list of all a tags that are immediate successor of the selected html element
            var a_list = p_list.eq(i).children("a");
            
            for (var j = 0; (j < a_list.length) && !terminate; j++) {
                // console.log(terminate);
                var a_tag = a_list.eq(j);
                var link = host + a_tag.attr("href");
                
                if (links_visited.indexOf(link) == -1) {
                    
                    links_visited.push(link);
                    terminate = true;
                    
                    console.log("Going To: " + a_tag.text() + ": " + link + '\n');
                    
                    limiter.removeTokens(1, function(err, remainingRequests) {
                        if(remainingRequests < 0) {
                            console.log('429: Rate Limited');
                        } else {
                            wikiFetch(link, epoch + 1);
                        }
                    });
                }
            }
        }
    } else {
        console.log("Reached Philosophy :)");
    }
}

function wikiFetch(targetURL, epoch) {
    request(targetURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body, epoch);
        } else {
            console.log(error);
        }
    });
}

limiter.removeTokens(1, function(err, remainingRequests) {
    links_visited.push(url);
    wikiFetch(url, epoch);    
})
