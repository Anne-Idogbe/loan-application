document.getElementById('loanForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const currentAmount = parseFloat(document.getElementById('currentAmount').value);
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const creditHistory = document.getElementById('creditHistory').value;
    const lastDepositDate = new Date(document.getElementById('lastDepositDate').value);
    const lastLoanDate = new Date(document.getElementById('lastLoanDate').value);
    const loanRepaymentPeriod = parseInt(document.getElementById('loanRepaymentPeriod').value);
    const accountType = document.getElementById('accountType').value;

    let score = 0;

    // Calculate the maximum loan amount
    const maxLoanAmount = income * 0.45;

    // Check if current amount in account is more than loan amount required
    if (currentAmount >= loanAmount) {
        score += 10;
    } else {
        score -= 10;
    }

    // 6 months credit history
    if (creditHistory === 'yes') {
        score += 10;
    }

    // Last deposit date within a month
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    if (lastDepositDate > oneMonthAgo) {
        score += 5;
    }

    // Last loan collection date more than 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    if (lastLoanDate < sixMonthsAgo) {
        score += 10;
    }

    // Loan repayment period below 6 months
    if (loanRepaymentPeriod < 6) {
        score += 5;
    }

    // Account type
    if (accountType === 'current') {
        score += 10;
    } else if (accountType === 'savings') {
        score += 5;
    }

    let resultText;
    if (score > 30) {
        resultText = `Congratulations!,Eligible Loan Amount: N${maxLoanAmount.toFixed(2)}. You qualify for the loan with a score of ${score}.`;
    } else {
        resultText = `Sorry,You do not qualify for the loan. Your score is ${score}. You need a score above 30.`;
    }

    document.getElementById('result').innerText = resultText;
});
