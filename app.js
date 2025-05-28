   const displayBox = document.querySelector('.display'),
        displayInput = document.querySelector(".display-input"),
        displayResult = document.querySelector(".display-result"),
        buttons = document.querySelectorAll("button"),
    
        operators = ["%", "÷", "x", "-", "+"];
    let input = "",
        result = "",
        lastCalculation = false;
    
    // Main function logic
    const calculate = btnValue => {
        const lastChar = input.slice(-1),
            secondToLastChar = input.slice(-2, -1),
            withoutToLastChar = input.slice(0, -1);
        const isLastCharOperator = operators.includes(lastChar);
    
        if (btnValue === "=") {
            if (
                input === "" ||
                lastChar === "." ||
                (isLastCharOperator && lastChar !== "%") ||
                lastCalculation
            ) {
                return;
            }
            const formattedInput = replaceOperators(input);
            try {
                const calculatedValue = eval(formattedInput);
                result = calculatedValue.toFixed(2).toString();
            } catch {
                result = "Error";
            }
            input += btnValue;
            lastCalculation = true;
            displayBox.classList.add("active");
        } else if (btnValue === "AC") {
            resetCalculator("");
        } else if (btnValue === "") {
            if (lastCalculation) {
                resetCalculator(result.slice(0, -1));
            } else {
                input = withoutToLastChar;
            }
        } else if (operators.includes(btnValue)) {
            if (lastCalculation) {
                resetCalculator(result + btnValue);
            } else if (
                (input === "" || lastChar === "(") && btnValue !== "-" ||
                input === "-" ||
                lastChar === "." ||
                (secondToLastChar === "(" && lastChar === "-") ||
                (lastChar === "%" && btnValue === "%")
            ) {
                return;
            } else if (lastChar === "%" && btnValue !== "%") {
                input = withoutToLastChar + btnValue;
            } else if (isLastCharOperator) {
                input = withoutToLastChar + btnValue;
            } else {
                input += btnValue;
            }
        } else if (btnValue === ".") {
            if (lastCalculation) {
                resetCalculator("0.");
            } else if (lastChar === ")" || lastChar === "%") {
                input += "*" + "0.";
            } else if (input === "" || isLastCharOperator || lastChar === "(") {
                input += "0.";
            } else {
                let lastOperatorIndex = -1;
                for (const operator of operators) {
                    const index = input.lastIndexOf(operator);
                    if (index > lastOperatorIndex) lastOperatorIndex = index;
                }
                if (!input.slice(lastOperatorIndex + 1).includes(".")) {
                    input += ".";
                }
            }
        } else if (btnValue === "( )") {
            if (lastCalculation) {
                resetCalculator("(");
            } else {
                input += "(";
            }
        } else if (btnValue === ")") {
            if (lastCalculation) {
                resetCalculator(result + ")");
            } else {
                const openBrackets = (input.match(/\(/g) || []).length;
                const closeBrackets = (input.match(/\)/g) || []).length;
                if (openBrackets > closeBrackets) {
                    input += ")";
                }
            }
        }
        else if (btnValue === "()") {
            if (lastCalculation) {
                if (isInvalidResult) resetCalculator("(");
                else resetCalculator(result + "*(");
            }
            else if (input === "" || isLastCharOperator && lastChar !== "%")
                input += "(";
            else input += "*(";
    
        }
    
        else {
            if (lastCalculation) resetCalculator(btnValue);
            else input += btnValue;
        }
    
        if (btnValue === "( )") {
            if (lastCalculation) {
                if (isInvalidResult) resetCalculator("(");
                else resetCalculator(result + "x(");
            }
            else if (input === "" || isLastCharOperator && lastChar !== "%") {
                input += "(";
            }
        }
        // Update display
        displayInput.value = input.replaceAll("*", "x");
        displayResult.value = result;
        displayInput.scrollLeft = displayInput.scrollWidth;
    };
    
    // Function to replace display operators with valid JavaScript operators
    const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("x", "*");
    
    const resetCalculator = newInput => {
        input = newInput;
        result = "";
        lastCalculation = false;
        displayBox.classList.remove("active");
    };
    
    // Add event listeners to buttons
    buttons.forEach(button =>
        button.addEventListener("click", e => calculate(e.target.textContent))
    );
    
    
    //handle brackets
     if (btnValue === "( )"){
        if (lastCalculation){
            if (isInvalidResult) resetCalculator ("(");
                    else resetCalculator(result + "*(");
        }
        else if (input === "" || isLastCharOperator && lastChar !== "%")
        input += "(";
    else input += "*(";
    
    }