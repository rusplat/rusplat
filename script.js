document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registration-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            // Получаем значения полей
            const loginInput = document.getElementById('login');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const roleInputs = document.querySelectorAll('input[name="role"]');

            const login = loginInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            let selectedRoleValue = '';
            roleInputs.forEach(radio => {
                if (radio.checked) {
                    selectedRoleValue = radio.value;
                }
            });

            // Простая валидация
            if (login.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                // Если нужно сообщение, можно использовать alert:
                // alert("Пожалуйста, заполните все поля!");
                console.log("Ошибка: Пожалуйста, заполните все поля!");
                return;
            }

            if (password !== confirmPassword) {
                // alert("Пароли не совпадают!");
                console.log("Ошибка: Пароли не совпадают!");
                return;
            }

            if (selectedRoleValue === '') {
                // alert("Пожалуйста, выберите вашу роль!");
                console.log("Ошибка: Пожалуйста, выберите вашу роль!");
                return;
            }

            // Если все проверки пройдены, имитируем успешную регистрацию
            console.log("Данные для регистрации:", {
                login: login,
                password: password,
                role: selectedRoleValue
            });

            // Перенаправляем на страницу подтверждения после небольшой задержки
            // Это должно сработать, если нет других ошибок
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 500); // Уменьшил задержку до 0.5 секунды для более быстрого отклика
        });
    } else {
        console.error("Форма регистрации с id 'registration-form' не найдена!");
    }
});
