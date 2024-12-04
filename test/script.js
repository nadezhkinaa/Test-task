$(document).ready(function() {
    // fetching data from json file
    $.getJSON("table.json", function(data) {
        let temp = "";
        $.each(data, function(key, value) {
            temp += "<tr>";
            temp += "<td>" + value.name + "</td>";
            temp += "<td>" + value.position + "</td>";
            temp += "<td class='priority-cell'>" + value.priority + "</td>";
            temp += "<td>" + value.max_priority + "</td>";
            temp += "</tr>";
        });
        $("#table").append(temp);
        sortTable(2, 1);
    });

    //handler for clicking on a row
    $("#table").on("click", "tr", function(event) {
        if (event.ctrlKey) {
            $(this).toggleClass("active");
        } else {
            $("#table tr").removeClass("active");
            $(this).addClass("active");
        }
    });

    // Save button click handler
    $(".save-button").click(function() {
        const selectedRow = $("#table tr.active");
        if (selectedRow.length === 0) {
            alert("Выберите строку!");
            return;
        }

        const newPriority = parseInt($(".priority-select").val(), 10);
        const maxPriority = parseInt(selectedRow.find("td:last-child").text(), 10);

        if (isNaN(newPriority) || newPriority > maxPriority || newPriority < 0) {
            alert(
                "Некорректный приоритет. Приоритет должен быть числом от 0 до максимального приоритета."
            );
            return;
        }

        selectedRow.find(".priority-cell").text(newPriority);
        sortTable(2, 1);
    });

    // sorting function
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
        $("#table").append(rows);
    }
});