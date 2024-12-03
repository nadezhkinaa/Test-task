$(document).ready(function() {
    // fetching data from json file
    $.getJSON("table.json", function(data) {
        console.log(data);

        let temp = "";

        // iterating through objects
        $.each(data, function(key, value) {
            temp += "<tr>";

            temp += "<td>" + value.name + "</td>";

            temp += "<td>" + value.position + "</td>";

            temp += "<td>" + value.priority + "</td>";

            temp += "<td>" + value.max_priority + "</td>";

            temp += "</tr>";
        });

        $("#table").append(temp);
    });
    //handler for clicking on a cell
    $("#table").on("click", "tr", function(event) {
        if (event.ctrlKey) {
            // Ctrl + click:
            $(this).toggleClass("active");
        } else {
            // Single click:
            $("#table tr").removeClass("active");
            $(this).addClass("active");
        }
    });
});