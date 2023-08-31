function generateInputs() {
    const inputCount = document.getElementById('inputCount').value;
    const inputsDiv = document.getElementById('inputs');
    inputsDiv.innerHTML = '';

    for (let i = 1; i <= inputCount; i++) {
        const select = document.createElement('select');
        select.name = 'input' + i;
        select.id = 'input' + i;

        const options = ['a', 'b', 'c', 'd', 'e'];
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.text = option;
            select.appendChild(optionElement);
        });

        const label = document.createElement('label');
        label.textContent = 'Choice ' + i + ':';
        inputsDiv.appendChild(label);
        inputsDiv.appendChild(select);
    }
}

function generateReport() {
    const inputCount = document.getElementById('inputCount').value;
    const reportDiv = document.getElementById('report');
    reportDiv.innerHTML = '';

    const counts = {};

    for (let i = 1; i <= inputCount; i++) {
        const inputValue = document.getElementById('input' + i).value;
        if (counts[inputValue]) {
            counts[inputValue]++;
        } else {
            counts[inputValue] = 1;
        }
    }

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    // Create a table for the report
    const table = document.createElement('table');
    table.classList.add('report-table');

    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow(0);

    const headers = ['Choice', 'Count'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    const tableBody = table.createTBody();

    labels.forEach((label, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = label;
        cell2.textContent = data[index];
    });

    reportDiv.appendChild(table);

    // Create a pie chart
    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = '<canvas id="chart"></canvas>';

    const ctx = document.getElementById('chart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#ff9999', '#ffcc99', '#ff99cc', '#cc99ff', '#99ccff'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
