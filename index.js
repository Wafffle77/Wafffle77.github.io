const earsPerLengthInput = document.getElementById("earsPerLengthInput");
const rowWidthInput   = document.getElementById("rowWidthInput");
const kernelsPerBushelInput = document.getElementById("kernelsPerBushelInput");
const tableBody       = document.getElementById("tableBody");
const rowTemplate     = document.getElementById("rowTemplate");
const estimateOutput  = document.getElementById("estimateOutput");

function addRow() {
    const newRow = rowTemplate.content.cloneNode(true);
    newRow.querySelector("button.removeButton").addEventListener("click", removeRow);
    tableBody.appendChild(newRow);
}

function removeRow(event) {
    event.target.parentNode.parentNode.remove();
}

function estimateYield() {
    const kernelPerBandInputs = Array.from(tableBody.querySelectorAll("input.kernelsPerBandInput")).map(e => e.valueAsNumber);
    const bandsPerEarInputs  = Array.from(tableBody.querySelectorAll("input.bandsPerEarInput")).map(e => e.valueAsNumber);

    const kernelAverage = kernelPerBandInputs.reduce((a,v) => a + v) / kernelPerBandInputs.length;
    const bandsAverage  = bandsPerEarInputs.reduce((a,v) => a + v)   / bandsPerEarInputs.length;

    const earsPerLength    = earsPerLengthInput.valueAsNumber;
    const rowWidth         = rowWidthInput.valueAsNumber;
    const kernelsPerBushel = kernelsPerBushelInput.valueAsNumber;

    const estimate = kernelAverage * bandsAverage * (earsPerLength * 2420) * (12 / rowWidth) / kernelsPerBushel;
    if(estimate === NaN) 
        estimateOutput.innerHTML = `Error: One or more inputs is not a number`;
    else
        estimateOutput.innerHTML = `Estimate: <b style="colors:red">${Math.round(estimate)}</b> bushels`;
}

addRow();
estimateYield();