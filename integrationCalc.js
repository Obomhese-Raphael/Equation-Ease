function calculate() {
    const functionInput = document.getElementById("functionInput").value;
    const variableInput = document.getElementById("variableInput").value;
    const resultElement = document.getElementById("result");

    let result = "";
    try {
        result = integrateFunction(functionInput, variableInput);
    } catch (error) {
        result = 'Error: ' + error.message;
    }
    resultElement.textContent = "The result is: " + result;
}

function integrateFunction(func, variable) {
    try {
        const integrated = Algebrite.integral(Algebrite.run(func), variable);
        return Algebrite.run(`simplify(${integrated})`).toString();
    } catch (error) {
        throw new Error('Invalid function format');
    }
}
