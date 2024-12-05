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
        updateSelectOptions();
    });

    //handler for clicking on a row  -  Fixes header selection bug
    $("#table").on("click", "tr:not(:first)", function(event) {
        if (event.ctrlKey) {
            $(this).toggleClass("active");
        } else {
            $("#table tr").removeClass("active");
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

            $(this)
                .find(".priority-cell")
                .text(currentPriority + changeAmount);
        });
        sortTable(2, 1);
    }

    //Sorting function
    function sortTable(colIndex, asc) {
        const table = $("#table");
        const rows = table
            .find("tr:gt(0)")
            .toArray()
            .sort(function(a, b) {
                const aVal = parseInt($(a).find("td").eq(colIndex).text(), 10);
                const bVal = parseInt($(b).find("td").eq(colIndex).text(), 10);
                return (aVal > bVal ? 1 : -1) * (asc ? 1 : -1);
            });
        table.append(rows);
    }
});