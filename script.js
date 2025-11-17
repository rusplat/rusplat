console.log("Скрипт загрузился!"); // Первое, что должно появиться в консоли

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM полностью загружен!");

    const registerForm = document.getElementById('registration-form'); // САМОЕ ВАЖНОЕ: Проверьте, что ID формы правильный!

    if (registerForm) {
        console.log("Форма регистрации найдена с ID:", registerForm.id);

        registerForm.addEventListener('submit', function(event) {
            console.log("Событие submit формы перехвачено!");
            event.preventDefault(); // Предотвращаем стандартную отправку формы
            console.log("event.preventDefault() выполнен.");

            // Получаем значения полей
            const loginInput = document.getElementById('login');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const roleInputs = document.querySelectorAll('input[name="role"]');

            if (!loginInput || !passwordInput || !confirmPasswordInput) {
                console.error("Ошибка: Не найдены поля ввода login, password или confirmPassword!");
                return;
            }

            const login = loginInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            let selectedRoleValue = '';
            let roleFound = false;
            roleInputs.forEach(radio => {
                if (radio.checked) {
                    selectedRoleValue = radio.value;
                    roleFound = true;
                }
            });

            // Простая валидация
            if (login.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                console.log("Валидация: Пожалуйста, заполните все поля!");
                // alert("Пожалуйста, заполните все поля!"); // Можно раскомментировать для видимого сообщения
                return;
            }

            if (password !== confirmPassword) {
                console.log("Валидация: Пароли не совпадают!");
                // alert("Пароли не совпадают!");
                return;
            }

            if (!roleFound) { // Проверяем, выбрана ли роль
                console.log("Валидация: Пожалуйста, выберите вашу роль!");
                // alert("Пожалуйста, выберите вашу роль!");
                return;
            }

            // Если все проверки пройдены, имитируем успешную регистрацию
            console.log("Валидация пройдена успешно. Данные:", {
                login: login,
                password: password,
                role: selectedRoleValue
            });

            // Перенаправляем на страницу подтверждения
            console.log("Начинаем перенаправление на confirmation.html...");
            setTimeout(() => {
                window.location.href = 'confirmation.html';
                console.log("Перенаправление инициировано.");
            }, 500); // 0.5 секунды задержки
        });
    } else {
        console.error("Критическая ошибка: Форма регистрации с ID 'registration-form' не найдена на странице!");
    }
});
