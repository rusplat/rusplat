document.addEventListener('DOMContentLoaded', () => {
    console.log("Скрипт для confirmation.html загрузился!");

    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmountInput');
    const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
    const depositButton = document.getElementById('depositButton');
    const paymentSection = document.getElementById('paymentSection');
    const paymentTimer = document.getElementById('paymentTimer');
    const closePaymentSectionBtn = document.getElementById('closePaymentSectionBtn');
    const paymentAmountDisplay = document.getElementById('paymentAmount');
    const usdtAddressDisplay = document.getElementById('usdtAddress');
    const usdtQrCode = document.getElementById('usdtQrCode'); // Обращаемся к элементу img

    let currentSelectedAmount = 0;
    const MIN_DEPOSIT = 100;
    let timerInterval;
    let timeLeft = 15 * 60; // 15 минут

    // --- Ваши крипто-реквизиты ---
    const cryptoPaymentDetails = {
        usdtTRC20: {
            address: "TTxL8srvCqom7RebeyZAjuWyActK9R9SD4",
            // QR-код теперь указывается напрямую в HTML, здесь только адрес
        }
    };
    // --- Конец крипто-реквизитов ---

    function updateDepositButtonState() {
        if (currentSelectedAmount >= MIN_DEPOSIT) {
            depositButton.disabled = false;
            depositButton.classList.add('active');
        } else {
            depositButton.disabled = true;
            depositButton.classList.remove('active');
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return ``${formattedMinutes}:${formattedSeconds}``;
    }

    function startTimer() {
        paymentTimer.textContent = formatTime(timeLeft);
        paymentTimer.classList.remove('expired');
        depositButton.style.display = 'none';
        customAmountInput.disabled = true;
        amountButtons.forEach(btn => btn.disabled = true);
        selectedAmountDisplay.textContent = currentSelectedAmount;

        timerInterval = setInterval(() => {
            timeLeft--;
            paymentTimer.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {

                            clearInterval(timerInterval);
                paymentTimer.textContent = "Время вышло!";
                paymentTimer.classList.add('expired');
                if (closePaymentSectionBtn) {
                    closePaymentSectionBtn.style.display = 'inline-block';
                }
            }
        }, 1000);
    }

    function showPaymentSection() {
        paymentSection.style.display = 'block';
        if (closePaymentSectionBtn) {
            closePaymentSectionBtn.style.display = 'inline-block';
        }

        // Заполняем реквизиты
        paymentAmountDisplay.textContent = currentSelectedAmount;
        usdtAddressDisplay.textContent = cryptoPaymentDetails.usdtTRC20.address;
        // QR-код уже установлен в HTML, если нужно динамически менять, то здесь
        // usdtQrCode.src = 'путь_к_вашему_qr_коду.png'; // Или сгенерировать динамически

        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timeLeft = 15 * 60; // Сброс времени
        startTimer();
    }

    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            currentSelectedAmount = parseInt(this.dataset.amount);
            selectedAmountDisplay.textContent = currentSelectedAmount;

            customAmountInput.value = '';
            updateDepositButtonState();
        });
    });

    customAmountInput.addEventListener('input', function() {
        const enteredAmount = parseInt(this.value) || 0;
        currentSelectedAmount = enteredAmount;
        selectedAmountDisplay.textContent = currentSelectedAmount;

        amountButtons.forEach(btn => btn.classList.remove('active'));
        updateDepositButtonState();
    });

    updateDepositButtonState();

    depositButton.addEventListener('click', function() {
        if (!this.disabled) {
            showPaymentSection();
        }
    });

    if (closePaymentSectionBtn) {
        closePaymentSectionBtn.addEventListener('click', function() {
            paymentSection.style.display = 'none';
            if (this.style.display !== 'none') {
                this.style.display = 'none';
            }
            depositButton.style.display = 'block';
            customAmountInput.disabled = false;
            amountButtons.forEach(btn => btn.disabled = false);

            clearInterval(timerInterval);
            paymentTimer.textContent = '';
            paymentTimer.classList.remove('expired');
            currentSelectedAmount = 0;
            selectedAmountDisplay.textContent = currentSelectedAmount;
            updateDepositButtonState();
        });
    }
});
