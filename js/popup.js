$(function(){
    chrome.storage.local.get(['enable'], function(items) {
        if(items.enable === "enable") {
            $("#enable").val("disable");
        } else {
            $("#enable").val("enable");
        }
    });

    $("#enable").click(function(){
        chrome.storage.local.set({"enable": $("#enable").val()});
        if($("#enable").val() === "disable") {
            $(this).val("enable");
        } else {
            $(this).val("disable");
        }
    });
});
