$(document).ready(function () {
    $('.input-group input').on('input', function () {
        const $input = $(this);
        const value = $input.val();

        if (value < 0) {
            $input.addClass('invalid');
            showError('Please enter positive numbers only');
        } else {
            $input.removeClass('invalid');
            $('#errorMessage').hide();
        }
    });

    $('.calculate-button').click(function () {
        calculateMortgage();
    });

    $('.clear-button').click(function () {
        clearCalculator();
    });
});

function calculateMortgage() {
    const loanAmount = parseFloat($('#loanAmount').val());
    const loanTermYears = parseFloat($('#loanTerm').val());
    const monthlyIncome = parseFloat($('#monthlyIncome').val());

    $('#errorMessage').hide();
    $('#results').hide();

    if (!loanAmount || !loanTermYears || !monthlyIncome) {
        showError("Please fill in all fields");
        return;
    }

    if (loanAmount <= 0 || loanTermYears <= 0 || monthlyIncome <= 0) {
        showError("Please enter valid positive numbers");
        return;
    }

    if (loanTermYears > 30) {
        showError("Loan term cannot exceed 30 years");
        return;
    }

    const annualInterestRate = 0.045;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = loanTermYears * 12;

    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;

    if (paymentToIncomeRatio > 30) {
        showError("Loan denied: Monthly payment exceeds 30% of your income.");
        return;
    }


    $('#results').fadeIn(300);
    $('#monthlyPayment').text(`£${monthlyPayment.toFixed(2)}`);
    $('#totalPayment').text(`£${totalPayment.toFixed(2)}`);
    $('#totalInterest').text(`£${totalInterest.toFixed(2)}`);
    $('#remainingIncome').text(`£${(monthlyIncome - monthlyPayment).toFixed(2)}`);
    $('#incomePercentage').text(`${paymentToIncomeRatio.toFixed(1)}%`);
}

function clearCalculator() {
    $('.input-group input').val('').removeClass('invalid');
    $('#results').fadeOut(300);
    $('#errorMessage').fadeOut(300);
}

function showError(message) {
    $('#errorMessage')
        .text(message)
        .hide()
        .fadeIn(300);
}