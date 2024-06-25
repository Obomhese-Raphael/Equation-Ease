function calculate() {
            const functionInput = document.getElementById("functionInput").value;
            const operation = document.getElementById("operationSelect").value;
            const resultElement = document.getElementById("result");

            let result = "";
            try {
                if (operation === 'differentiate') {
                    result = differentiate(functionInput);
                }
            } catch (error) {
                result = 'Error: ' + error.message;
            }

            resultElement.textContent = "The result is: " + result;
        }

        function differentiate(func) {
            // Parse the polynomial function, combine like terms, and differentiate each term
            const terms = combineLikeTerms(parsePolynomial(func));
            const differentiatedTerms = terms.map(term => {
                const { coefficient, variable, exponent } = term;
                if (exponent === 0) return ''; // Derivative of a constant is 0
                const newCoefficient = coefficient * exponent;
                const newExponent = exponent - 1;
                return formatTerm(newCoefficient, variable, newExponent);
            }).filter(term => term !== '');

            return differentiatedTerms.join(' + ') || '0';
        }

        function parsePolynomial(func) {
            // Parse the polynomial function into an array of terms
            const terms = func.match(/-?\d*x\^\d+|-?\d*x|-?\d+/g);
            if (!terms) throw new Error('Invalid function format');

            return terms.map(term => {
                const match = term.match(/(-?\d*)x(\^(-?\d+))?/);
                if (match) {
                    const coefficient = parseFloat(match[1] || '1');
                    const exponent = parseInt(match[3] || '1', 10);
                    return { coefficient, variable: 'x', exponent };
                } else {
                    return { coefficient: parseFloat(term), variable: '', exponent: 0 };
                }
            });
        }

        function combineLikeTerms(terms) {
            const termMap = {};

            terms.forEach(term => {
                const key = term.exponent;
                if (termMap[key]) {
                    termMap[key].coefficient += term.coefficient;
                } else {
                    termMap[key] = { ...term };
                }
            });

            return Object.values(termMap);
        }

        function formatTerm(coefficient, variable, exponent) {
            if (exponent === 0) return `${coefficient}`;
            if (exponent === 1) return `${coefficient}${variable}`;
            return `${coefficient}${variable}^${exponent}`;
        }