$(function(){
    // メタタグチェック
    var robots = $("meta[name=robots]").attr("content");

    if(robots === undefined) {
        robots = "";
    }
    var noindex = robots.match(/noindex/i);
    if(noindex !== null) {
        noindex = "true";
    } else {
        noindex = "false";
    }
    var nofollow = robots.match(/nofollow/i);
    if(nofollow !== null) {
        nofollow = "true";
    } else {
        nofollow = "false";
    }

    var content = $('<div></div>', {
        "id": "chrome_nofollow_notify",
        "html": "META-Robots NoIndex: <span class='chrome-nofollow-text-"+noindex+"'>"+noindex+"</span>"+
            "<br>META-Robots NoFollow: <span class='chrome-nofollow-text-"+nofollow+"'>"+nofollow+"</span>"
    });
    $("body").append(content);

    // aリンクチェック
    var className = "chrome-nofollow-link";
    $('a[rel*="nofollow"]').addClass(className);
});