$(document).ready(function() {
    var queryString = document.location.search;
    var splitQuery = queryString.split("&");

    var getSearch = splitQuery[0].split("=")[1]; //the search value
    var getFormat = splitQuery[1].split("=")[1]; //the format selected

    var requestURL = "https://www.loc.gov/" + getFormat + "/?q=" + getSearch + "&fo=json";
    console.log(requestURL);

    var resultsHeading = $("#results-heading");

    fetch(requestURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayData(data);
            })
        } else {
            resultsHeading.text("Could not find anything for " + getSearch);
        };
      }).catch(function(error) {
        resultsHeading.text("Unable to connect to LOC API");
      });

      function displayData(data) {
        var resultsEl = $("#results");
        resultsHeading.text("Showing results for " + decodeURI(getSearch));

        var dataResults = data.content.results;

        for (var i = 0; i < data.content.results.length; i++) {
            var card = $("<div>");
            card.addClass("card p-3 mb-3");
            var title = $("<h3>");
            var date = $("<h4>");
            var subjects = $("<h4>");
            var description = $("<h4>");
            var readmoreButton = $("<a>");
            readmoreButton.addClass("btn btn-secondary w-25");
            resultsEl.append(card.append(title.text(dataResults[i].title)).append(date.text("Date: " + dataResults[i].date)).append(subjects.text("Subjects: " + dataResults[i].partof)).append(description.text("Description: " + dataResults[i].description)).append(readmoreButton.text("Read More").attr("href", dataResults[i].url)));
        };
      };

      var submitBtn = $("#submit-button");

      submitBtn.click(function() {
        var getSearch = $("#search-bar").val(); //the search value
        var getFormat = $("#format-select").find(":selected").val(); //the format selected
    
        var requestURL = "https://www.loc.gov/" + getFormat + "/?q=" + getSearch + "&fo=json";
        console.log(requestURL);
    
        var resultsHeading = $("#results-heading");
        var resultsEl = $("#results");

        resultsEl.text("");
    
        fetch(requestURL).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayData(data);
                })
            } else {
                resultsHeading.text("Could not find anything for " + getSearch);
            };
          }).catch(function(error) {
            resultsHeading.text("Unable to connect to LOC API");
          });
    
          function displayData(data) {
            var resultsEl = $("#results");
            resultsHeading.text("Showing results for " + getSearch);
    
            var dataResults = data.content.results;
    
            for (var i = 0; i < data.content.results.length; i++) {
                var card = $("<div>");
                card.addClass("card p-3 mb-3");
                var title = $("<h3>");
                var date = $("<h4>");
                var subjects = $("<h4>");
                var description = $("<h4>");
                var readmoreButton = $("<a>");
                readmoreButton.addClass("btn btn-secondary w-25");
                readmoreButton.attr("target", "_blank");
                resultsEl.append(card.append(title.text(dataResults[i].title)).append(date.text("Date: " + dataResults[i].date)).append(subjects.text("Subjects: " + dataResults[i].partof)).append(description.text("Description: " + dataResults[i].description)).append(readmoreButton.text("Read More").attr("href", dataResults[i].url)));
            };
          };
    });


});