// Correr estas constantes al cargar el documento
document.addEventListener('DOMContentLoaded',
    () => {
        const currentDateElement = document.getElementById('currentDate');
        const currentDate = new Date();
        const options = {month: 'long', year: 'numeric'};
        for (const sElement of currentDateElement.textContent = currentDate.toLocaleDateString(undefined, options)) {

        }

        const ingresosTab = document.getElementById('ingresos');
        const egresosTab = document.getElementById('egresos');
        const border1 = document.getElementById('border1');
        const border2 = document.getElementById('border2');

        ingresosTab.addEventListener('change', function () {
            if (this.checked) {
                border1.style.border = '2px solid #26489a';
                border1.style.backgroundColor = '#26489a';
                border2.style.border = 'none';
                border2.style.backgroundColor = 'transparent';
            }
        });

        egresosTab.addEventListener('change', function () {
            if (this.checked) {
                border2.style.border = '2px solid #26489a';
                border2.style.backgroundColor = '#26489a';
                border1.style.border = 'none';
                border1.style.backgroundColor = 'transparent';
            }
        });

    }); // Fin de DOMContentLoaded


let incomeTotal = 0;
let expenseTotal = 0;
let tableBody;

// Actualizacion de los porcentajes en cada una de las filas
function updateExpensePercentages() {
    const expenseTable = document.getElementById("expenseTable");
    const expenseRows = expenseTable.getElementsByTagName("tr");

    for (let i = 0; i < expenseRows.length; i++) {
        const amountCell = expenseRows[i].cells[1];
        const amount = parseFloat(amountCell.textContent);
        const percentageCell = expenseRows[i].cells[2];

        const percentage = (amount / incomeTotal) * 100;
        percentageCell.textContent = percentage.toFixed(0) + "%";
    }
}

function updateTotals() {
    document.getElementById("totalIncome").textContent = incomeTotal.toFixed(2);
    document.getElementById("totalExpense").textContent = expenseTotal.toFixed(2);

    const grandTotal = incomeTotal - expenseTotal;
    document.getElementById("grandTotalAmount").textContent = grandTotal.toFixed(2);

    // El gran total de las transaciones
    document.getElementById("grandTotalAmount").style.color = grandTotal >= 0 ? "green" : "red";

    // El gran total de los porcentajes
    const expensePercentage = incomeTotal === 0 ? 0 : (expenseTotal / incomeTotal) * 100;
    document.getElementById("expensePercentageValue").textContent = expensePercentage.toFixed(0) + "%";
}

function addTransaction() {
    const transactionType = document.getElementById("transactionType").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    // Validacion de datos en los campos del formulario

    if (transactionType === "none") {
        alert("Por favor, seleccione el tipo de transacción.");
        return;
    }

    if (description === "") {
        alert("Por favor, ingrese una descripción.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("El valor ingresado no es válido. Por favor, intente de nuevo.");
        return;
    }

    // Tabla de ingresos y Egresos

    if (transactionType === "income") {
        tableBody = document.getElementById("incomeTable");
    } else {
        tableBody = document.getElementById("expenseTable");
    }

    const newRow = tableBody.insertRow(-1);
    const descriptionCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const percentageCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);


    descriptionCell.textContent = description;
    amountCell.textContent = amount.toFixed(2);

// agregar el boton para elminar registros

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.style.color = "white";
    deleteButton.onclick = function () {
        deleteTransaction(newRow, transactionType);
    };

    actionCell.appendChild(deleteButton);

    if (transactionType === "income") {
        incomeTotal += amount;
        updateExpensePercentages();
    } else if (transactionType === "expense") {
        expenseTotal += amount;
        if (incomeTotal === 0) {
            percentageCell.textContent = '0';
        } else {
            const percentage = (amount / incomeTotal) * 100;
            percentageCell.textContent = `${percentage.toFixed(0)}%`;
        }

    }

    updateTotals();


    // Limpiar el formulario
    document.getElementById("budgetForm").reset();
    document.getElementById("transactionType").selectedIndex = 0;


// Remover  fila

    function deleteTransaction(row, transactionType) {
        const amount = parseFloat(row.cells[1].textContent);

        if (transactionType === "income") {
            incomeTotal -= amount;
        } else if (transactionType === "expense") {
            expenseTotal -= amount;
        }

        row.remove();
        updateTotals();
    }
}
