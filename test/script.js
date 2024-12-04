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

            temp += "<td class='priority-cell'>" + value.priority + "</td>";

            temp += "<td>" + value.max_priority + "</td>";

            temp += "</tr>";
        });

        $("#table").append(temp);

        sortTable(2, 1); // 2 - индекс столбца "Приоритет" (нумерация с 0)
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

        const rowIndex = $(this).index() - 1;

        const priorityCell = $(this).find(".priority-cell");
        const priority = parseInt(priorityCell.text(), 10);

        console.log("Row Index:", rowIndex);
        console.log("Priority:", priority);
    });

    // sorting
    function sortTable(colIndexPriority, colIndexPosition) {
        const rows = $("#table tr:gt(0)");
        rows.sort(function(a, b) {
            const aPriority = parseInt(
                $(a)
                .find("td:nth-child(" + (colIndexPriority + 1) + ")")
                .text(),
                10
            );
            const bPriority = parseInt(
                $(b)
                .find("td:nth-child(" + (colIndexPriority + 1) + ")")
                .text(),
                10
            );

            if (aPriority !== bPriority) {
                return bPriority - aPriority;
            } else {
                const aPosition = $(a)
                    .find("td:nth-child(" + (colIndexPosition + 1) + ")")
                    .text();
                const bPosition = $(b)
                    .find("td:nth-child(" + (colIndexPosition + 1) + ")")
                    .text();
                return aPosition.localeCompare(bPosition);
            }
        });
        $.each(rows, function(index, row) {
            $("#table").append(row);
        });
    }
});