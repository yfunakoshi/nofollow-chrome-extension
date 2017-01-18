$(function(){
    // load setting for local storage
    chrome.storage.local.get("enable", function(items) {
        if(items.enable === "enable") {
            metacheck();
        }
    });


    var metacheck = function(){
        // check meta robots
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

        // create dom
        var content = $('<div></div>', {
            "id": "chrome-nofollow-notify",
            "class": "chrome-nofollow-pop",
            "html": "<p id='chrome-nofollow-title-area'><span class='chrome-nofollow-title'>Nofollow</span>" +
            "<span id='chrome-nofollow-toggle' class=\"icon-minus chrome-nofollow-icon\"></span></p>" +
            "<p id='chrome-nofollow-content'>META-Robots NoIndex: <span class='chrome-nofollow-text-"+noindex+"'>"+noindex+"</span>"+
            "<br>META-Robots NoFollow: <span class='chrome-nofollow-text-"+nofollow+"'>"+nofollow+"</span></p>"
        });
        $("body").append(content);

        // check rel nofollow link
        var className = "chrome-nofollow-link";
        $('a[rel*="nofollow"]').addClass(className);
    }

    // Popup Toggle
    $(document).on("click", "#chrome-nofollow-toggle", function() {
        $(".chrome-nofollow-title").toggle();
        $("#chrome-nofollow-content").toggle();
        // icon change
        if($(this).hasClass("icon-minus")){
            $(this).removeClass("icon-minus");
            $(this).addClass("icon-plus");
        } else {
            $(this).removeClass("icon-plus");
            $(this).addClass("icon-minus");
        }
    });
});