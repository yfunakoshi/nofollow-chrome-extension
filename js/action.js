$(function() {
    var cookie_option = { path: '/', domain: window.location.hostname };
    var disallow = 'none';
    var disp_flg = 0;

    $.ajax({ url: '/robots.txt', type: 'get', dataType: 'json' })
    .fail(function () {
        if ( errorHandler(arguments).match(/Disallow/i) ) {
            disallow = '<a href="/robots.txt" target="_blank">robots.txt</a>';
            disp_flg = 1;
        }
    })
    .always(function () {

        var canonical = $("link[rel=canonical]").attr("href");
        var href = window.location.href;
        var canoEx = "" ;
        if( canonical === undefined ) {
            canoEx = "false";
            canoHtml = "false";
        } else if( ( canonical.toLowerCase() == href.toLowerCase() ) || ( canonical == decodeURI(href) ) )  {
            canoEx = "same";
            canoHtml = "same";
        } else {
            canoEx = "exsist";
            canoHtml ="<a href='"+ canonical + "' target='_blank'>" + canonical + "</a>";
            disp_flg = 1;
        }

        var noindex = noarchive = nosnippet = noimageindex = none = nofollow = "false";
        $("meta[name=robots]").each(function(){
            var robots_content = $(this).attr('content');
            if ( robots_content.match(/noindex/i) ) {
                noindex = "true";
                disp_flg = 1;
            }
            if ( robots_content.match(/noarchive/i) ) {
                noarchive = "true";
                disp_flg = 1;
            }
            if ( robots_content.match(/nosnippet/i) ) {
                nosnippet = "true";
                disp_flg = 1;
            }
            if ( robots_content.match(/noimageindex/i) ) {
                noimageindex = "true";
                disp_flg = 1;
            }
            if ( robots_content.match(/none/i) ) {
                none = "true";
                disp_flg = 1;
            }
            if ( robots_content.match(/nofollow/i) ) {
                nofollow = "true";
                disp_flg = 1;
            }
        });

        var content = $("<div></div>", {
            "id": "chrome_nofollow_notify",
            "html": 
            "Disallow: <span class='chrome-nofollow-text-false'>"+disallow+"</span><br>"+
            "Canonical: <span class='chrome-canonical-"+canoEx+"'>"+canoHtml+"</span><br>"  +
            "NoIndex: <span class='chrome-nofollow-text-"+noindex+"'>"+noindex+"</span><br>"+
            "NoFollow: <span class='chrome-nofollow-text-"+nofollow+"'>"+nofollow+"</span><br>"+
            "None: <span class='chrome-nofollow-text-"+none+"'>"+none+"</span><br>"+
            "NoArchive: <span class='chrome-nofollow-text-"+noarchive+"'>"+noarchive+"</span><br>"+
            "NoSnippet: <span class='chrome-nofollow-text-"+nosnippet+"'>"+nosnippet+"</span><br>"+
            "NoImageIndex: <span class='chrome-nofollow-text-"+noimageindex+"'>"+noimageindex+"</span><br>"
        });
        if ( disp_flg ) {
            $("body").append(content);
            if ( Cookies.get('setagviewer_disp_flg') == '0' ) {
                $('#chrome_nofollow_notify').addClass('chrome-nofollow-box-open');
            }
        }

        $("#chrome_nofollow_notify").click(function(){
            $("#chrome_nofollow_notify").toggleClass("chrome-nofollow-box-open");
            if ( $('#chrome_nofollow_notify').hasClass('chrome-nofollow-box-open') ) {
                Cookies.set('setagviewer_disp_flg', '0', cookie_option);
            } else {
                Cookies.set('setagviewer_disp_flg', '1', cookie_option);
            }
        });

        $('a[rel*="nofollow"]').addClass('chrome-nofollow-link');
    });

    function errorHandler(args) {
        var error;
        if (args[2]) {
            try {
                error = $.parseJSON(args[0].responseText).error.toString();
            } catch (e) {
                error = 'parsererror(' + args[2] + '): ' + args[0].responseText;
            }
        } else {
            error = args[1] + '(HTTP request failed)';
        }
        return error;
    }
});
