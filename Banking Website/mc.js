$(document).ready(function() {
    // Real-time input validation
    $('.input-group input').on('input', function() {
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

    // Calculate button click handler
    $('.calculate-button').click(function() {
        calculateMortgage();
    });

    // Clear button click handler
    $('.clear-button').click(function() {
        clearCalculator();
    });
});

function calculateMortgage() {
    // Get input values using jQuery
    const loanAmount = parseFloat($('#loanAmount').val());
    const loanTermYears = parseFloat($('#loanTerm').val());
    const monthlyIncome = parseFloat($('#monthlyIncome').val());
    
    // Clear previous results
    $('#errorMessage').hide();
    $('#results').hide();

    // Validate inputs
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

    // Calculate mortgage
    const annualInterestRate = 0.045; // 4.5%
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = loanTermYears * 12;

    // Calculate monthly payment using the formula
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                         (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculate total payment and interest
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Check affordability (30% threshold)
    const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;
    
    if (paymentToIncomeRatio > 30) {
        showError("Loan denied: Monthly payment exceeds 30% of your income.");
        return;
    }

    // Display results with animation
    $('#results').fadeIn(300);
    $('#monthlyPayment').text(`£${monthlyPayment.toFixed(2)}`);
    $('#totalPayment').text(`£${totalPayment.toFixed(2)}`);
    $('#totalInterest').text(`£${totalInterest.toFixed(2)}`);
    $('#remainingIncome').text(`£${(monthlyIncome - monthlyPayment).toFixed(2)}`);
    $('#incomePercentage').text(`${paymentToIncomeRatio.toFixed(1)}%`);
}

function clearCalculator() {
    // Clear inputs with animation
    $('.input-group input').val('').removeClass('invalid');
    
    // Hide results and error with fade
    $('#results').fadeOut(300);
    $('#errorMessage').fadeOut(300);
}

function showError(message) {
    // Show error with animation
    $('#errorMessage')
        .text(message)
        .hide()
        .fadeIn(300);
}