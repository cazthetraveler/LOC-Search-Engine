$(document).ready(function() {
    var submitBtn = $("#submit-button");

    submitBtn.click(function() {
        var searchBar = $("#search-bar").val();
        var formatSel = $("#format-select").find(":selected").val();

        window.location.replace("./search-results.html?q=" + searchBar + "&format=" + formatSel);

    });
});