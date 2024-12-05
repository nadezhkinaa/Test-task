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
        updateSelectOptions($(this));
    });

    //handler for clicking on a row
    $("#table").on("click", "tr:not(:first)", function(event) {
        if (event.ctrlKey) {
            $(this).toggleClass("active");
        } else {
            $("#table tr").removeClass("active");
            $(this).addClass("active");
        }
    });

    // Save button click handler
    $(".save-button").click(function() {
        savePriorityChanges();
    });

    // Increase priority button click handler
    $("button:contains('Повысить')").click(function() {
        changePriority(1);
    });

    // Decrease priority button click handler
    $("button:contains('Понизить')").click(function() {
        changePriority(-1);
    });

    //Combined save logic for both save and increase/decrease buttons.
    function savePriorityChanges() {
        const selectedRows = $("#table tr.active");
        if (selectedRows.length === 0) {
            alert("Выберите строку!");
            return;
        }

        selectedRows.each(function() {
            const newPriority = parseInt($(".priority-select").val(), 10);
            const maxPriority = parseInt($(this).find("td:last-child").text(), 10);

            if (isNaN(newPriority) || newPriority > maxPriority || newPriority < 0) {
                alert(
                    "Некорректный приоритет. Приоритет должен быть числом от 0 до максимального приоритета."
                );
                return;
            }

            $(this).find(".priority-cell").text(newPriority);
        });
        sortTable(2, 1);
    }

    // Function to increase or decrease priority
    function changePriority(changeAmount) {
        const selectedRows = $("#table tr.active");
        if (selectedRows.length === 0) {
            alert("Выберите строку!");
            return;
        }

        selectedRows.each(function() {
            let currentPriority = parseInt($(this).find(".priority-cell").text(), 10);
            const maxPriority = parseInt($(this).find("td:last-child").text(), 10);

            if (changeAmount === -1 && currentPriority === 0) {
                alert("Ошибка! Приоритет не может быть меньше 0");
                return;
            }

            if (changeAmount === 1 && currentPriority === maxPriority) {
                alert(
                    "Ошибка! Приоритет не может быть больше максимального приоритета"
                );
                return;
            }

            currentPriority += changeAmount;
            currentPriority = Math.max(0, Math.min(currentPriority, maxPriority));

            $(this).find(".priority-cell").text(currentPriority);
        });
        sortTable(2, 1);
    }

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