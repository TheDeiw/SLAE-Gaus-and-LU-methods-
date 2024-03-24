/* const prompt = require("prompt-sync")({ sigint: true });

let matrix = [];
for (let i=0; i<3; i++){
    matrix.push([]);
    for (let j=0; j<3; j++){
        matrix[i][j] = +prompt(`Введіть [${i}][${j}]: `);
    }
}

for (let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        console.log(matrix[i][j]);
    }
}

let rowString;
for (let i=0; i<3; i++){
    rowString = "";
    for(let j=0; j<3; j++){
        rowString += `${(matrix[i][j]).toFixed(3).padStart(10," ").padEnd(5," ")} `;
    }
    console.log(rowString);
}
*/

/*let inputs;
let inputsVal;
const resultDiv = document.querySelector(".resultsContainer");
const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", function(e){
    /* e.preventDefault();
    console.log(e); 
    inputs = document.querySelectorAll("input[type=text]");
    inputsVal = Array.from(inputs).map(input => input.value);
    console.log(inputs);
    console.log(inputsVal);

    let k = 0;
    let matrix = [];
    for (let i=0; i<3; i++){
        matrix.push([]);
        for (let j=0; j<3; j++){
            matrix[i][j] = inputsVal[k];
            k++;
        }
    }

    let outputDiv = document.createElement('div');
    for (let row of inputsVal) {
        let equation = row.slice(0, -1).map((coef, i) => `${coef}x<sub>${i+1}</sub>`).join(" + ");
        equation += " = " + row[row.length - 1];
        let equationDiv = document.createElement('div');
        equationDiv.innerHTML = equation;
        outputDiv.appendChild(equationDiv);
    }
    resultDiv.appendChild(outputDiv);
});*/

let Results = [];
var failtxt = document.querySelector('.fail');
/* -------------------- BUTTONS -------------------- */
document.querySelector('.submit-button').addEventListener('click', MainFunction);

document.querySelector('.fillzero-button').addEventListener('click', function() {
    var inputs = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = 0;
    }
});

document.querySelector('.default-button').addEventListener('click', function() {
    var data = [
        [0.46, 1.72, 2.53, 2.44],
        [1.53, -2.32, -1.83, 2.83],
        [0.75, 0.86, 3.72, 1.06]
    ];
    var inputs = document.querySelectorAll('input[type="number"]');
    var k = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (k < inputs.length) {
                inputs[k].value = data[i][j];
                k++;
            }
        }
    }
});


/* -------------------- MAIN FUNCTION -------------------- */

function MainFunction(){
    СlearContent();
    failtxt.style.display = 'none';
    // Taking information
    var matrix = [];
    var equations = document.querySelectorAll('.equation');
    for (var i = 0; i < equations.length; i++) {
        var inputs = equations[i].querySelectorAll('input[type="number"]');
        var row = [];
        for (var j = 0; j < inputs.length; j++) {
            row.push(parseFloat(inputs[j].value));
        }
        matrix.push(row);
    }
    console.log(matrix);

    if(Determinant(matrix)==0){
        failtxt.style.display = 'block';
    }
    else{
        //addElement();
        console.log("---------- Your matrix -----------");
        PrintingMatrix(matrix, 3, 4);

        console.log("----------- Gaus method -----------");
        console.log();
    
        GausMethod(matrix);
        DisplayText("Results:", "gaus");
        DispalyResults(Results, "gaus");
        console.log(`x1 = ${Results[0].toFixed(3)}`);
        console.log(`x2 = ${Results[1].toFixed(3)}`);
        console.log(`x3 = ${Results[2].toFixed(3)}`);

        console.log();
        console.log("------------ LU Method -------------");
        LuMethod(matrix);

        console.log();
        DisplayText("Results:", "lu");
        DispalyResults(Results, "lu");
        console.log(`x1 = ${Results[0].toFixed(3)}`);
        console.log(`x2 = ${Results[1].toFixed(3)}`);
        console.log(`x3 = ${Results[2].toFixed(3)}`);
        PrintingMatrix(matrix, 3, 4);
    } 
}

/* -------------------- ADDITIONAL FOR OUTPUT AND CHECKING -------------------- */
function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode("Hello world!");
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}

function Determinant(arr) {
	let a = arr[0][0] * arr[1][1] * arr[2][2] +
		arr[0][1] * arr[1][2] * arr[2][0] +
		arr[1][0] * arr[2][1] * arr[0][2] -
		arr[0][2] * arr[1][1] * arr[2][0] -
		arr[1][2] * arr[2][1] * arr[0][0] -
		arr[0][1] * arr[1][0] * arr[2][2];
	return(a);
}

function DisplayMatrix(matrix, className) {
    // Знайти div з вказаним класом
    var div = document.querySelector('.' + className);

    // Створити таблицю
    var table = document.createElement('div');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.display = 'block';
    table.style.margin = 'auto';
    table.style.marginBottom = '10px';
    
    if(className == "gaus"){
        // Додати рядки та комірки до таблиці
        for (var i = 0; i < matrix.length; i++) {
            var row = document.createElement('div');
            row.style.display = 'flex';
            //row.style.margin = 'auto';
            for (var j = 0; j < matrix[i].length; j++) {
                var cell = document.createElement('div');
                row.style.justifyContent = 'center';
                cell.innerHTML = `(${(matrix[i][j].toFixed(3))})*x<sub>${j+1}</sub> + `;
                if (j == 2){
                    cell.innerHTML = `(${(matrix[i][j].toFixed(3))})*x<sub>${j+1}</sub> = `;
                }
                if (j == 3){
                    cell.innerHTML = `${(matrix[i][j].toFixed(3))}`;
                }
                cell.style.padding = '5px';
                cell.style.textAlign = 'center';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }

    if(className == "lu"){
        // Додати рядки та комірки до таблиці
        for (var i = 0; i < matrix.length; i++) {
            var row = document.createElement('div');
            row.style.display = 'flex';
            //row.style.margin = 'auto';
            for (var j = 0; j < matrix[i].length; j++) {
                var cell = document.createElement('div');
                row.style.justifyContent = 'center';
                cell.innerHTML = `${(matrix[i][j].toFixed(3))}`;
                cell.style.padding = '5px';
                cell.style.textAlign = 'center';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    }
    // Додати таблицю до div
    div.appendChild(table);
}

function DisplayText(text, className){
    var div = document.querySelector('.' + className);
    textField = document.createElement('p');
    textField.innerHTML = text;
    div.appendChild(textField);
}

function DispalyResults(resArray, className){
    var div = document.querySelector('.' + className);
    for (var i=0; i<3; i++){
        var row = document.createElement('div');
        row.innerHTML = `x<sub>${i+1}</sub> = ${(resArray[i].toFixed(3))} `;
        div.appendChild(row);
    }
}

function СlearContent() {
    // Знайти divs за допомогою класів
    var divHaus = document.querySelector('.gaus');
    var divLu = document.querySelector('.lu');

    // Очистити весь контент, крім заголовків
    clearContentExceptHeader(divHaus);
    clearContentExceptHeader(divLu);
}

function clearContentExceptHeader(div) {
    // Знайти всі дочірні елементи, крім заголовків
    var children = div.querySelectorAll(':not(h1):not(h2):not(h3):not(h4):not(h5):not(h6)');

    // Видалити кожен дочірній елемент
    for (var i = 0; i < children.length; i++) {
        if (children[i].parentNode === div) {
            div.removeChild(children[i]);
        }
    }
}

/* -------------------- TERMINAL FUNCTIONS -------------------- */
function CreatingMatrix(check){
    if (check == 1){
        for (let i=0; i<3; i++){
            matrix.push([]);
            for (let j=0; j<4; j++){
                matrix[i][j] = +prompt(`Введіть [${i}][${j}]: `);
            }
        }
    } 
    else{
        matrix = 
	    [[ 0.46, 1.72, 2.53, 2.44], 
	    [1.53, -2.32, -1.83, 2.83], 
	    [0.75, 0.86, 3.72, 1.06] ];
    }
    return matrix;
}

function PrintingMatrix(array, Ni, Nj){
    let rowString;
    for (let i=0; i<Ni; i++){
        rowString = "";
        for(let j=0; j<Nj; j++){
            if(j == 3){
                rowString += "   =";
            }
            rowString += `${(array[i][j]).toFixed(3).padStart(10," ").padEnd(5," ")} `;
        }
        console.log(rowString);
    }
}

/* -------------------- FOR GAUS -------------------- */
function FindMaximum(array, j){
    let max = array[j][j], pos = j;
    for(let i=j; i<3; i++){
        if(Math.abs(max) < Math.abs(array[i][j])){
            max = array[i][j];
            pos = i;
        }
    }
    return {max, pos};
}

function ChangeRow(array, i1, i2){
    let temp;
    for(let j=0; j<4; j++){
        temp = array[i1][j];
        array[i1][j] = array[i2][j];
        array[i2][j] = temp;
    }
}

function GausMethod(matrix){
    matrixTemp = [[],[],[]];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrixTemp[i][j] = matrix[i][j];
        }
    }

    let m, koef, position;
    for(let k=0; k<2; k++){
        //Find maximum
        ({max: koef, pos: position} = FindMaximum(matrixTemp, k));
        ChangeRow(matrixTemp, position, k);
        for(let i=k+1; i<3; i++){
            //Find m
            m = -matrixTemp[i][k]/koef;
            //Multiply other rows by m
            for(let j = 0; j<4; j++){
                matrixTemp[i][j] += matrixTemp[k][j]*m;
            }         
        }
        //Fill by zeros
        for(let j=k+1; j<3; j++){
            matrixTemp[j][k] = 0;
        } 

        DisplayMatrix(matrixTemp, "gaus");
        PrintingMatrix(matrixTemp, 3, 4);
        console.log();
    }

    
    for(let i = 2; i >= 0; i--){
        let sum = 0;
        for(let j = i+1; j < 3; j++){
            sum += matrixTemp[i][j]*Results[j];
        }
        Results[i] = (matrixTemp[i][3] - sum)/matrixTemp[i][i];
    }
    
}


/* -------------------- LU METHOD -------------------- */
function LuMethod(matrix) {
    matrixTemp = [[],[],[]];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrixTemp[i][j] = matrix[i][j];
        }
    }
    //Creating L and U
    let L = [], U = [];
    for(let i = 0; i<3; i++){
        L.push([]);
        U.push([]);
        for(let j = 0; j<3; j++){
            L[i][j] = 0;
            U[i][j] = 0;
        }
    }

    for(let i = 0; i<3; i++){
        //Upper
        for(let k = i; k<3; k++){
            let sum = 0;
            for (let j = 0; j < i; j++) {
                sum += L[i][j] * U[j][k];
            }
            U[i][k] = matrixTemp[i][k] - sum;
        }

        //Lower
        for(let k = i; k < 3; k++)
        {
            if (i == k){
                L[i][i] = 1;
            }
            else
            {
                let sum = 0;
                for(let j = 0; j < i; j++){
                    sum += (L[k][j] * U[j][i]);
                }
                L[k][i] = ((matrixTemp[k][i] - sum) / U[i][i]);
                console.log(matrixTemp[k][i]);
            }
        }
    }

    DisplayText("L:", "lu");
    console.log("L:");
    DisplayMatrix(L, "lu");
    PrintingMatrix(L, 3, 3);
    
    DisplayText("U:", "lu");
    console.log("U:");
    DisplayMatrix(U, "lu");
    PrintingMatrix(U, 3, 3);

    let sum = 0, Y = [];
    for(let i = 0; i<3; i++){
        sum = 0;
        for(let j = 0; j<i; j++){
            sum += L[i][j]*Y[j];
        }
        Y[i] = (matrixTemp[i][3] - sum)/ L[i][i];
    }

    Results.fill(0);
    for(let i = 2; i >= 0; i--){
        sum = 0;
        for(let j = i+1; j < 3; j++){
            sum += U[i][j]*Results[j];
        }
        Results[i] = (Y[i] - sum) / U[i][i];
    }

}