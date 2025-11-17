document.addEventListener('DOMContentLoaded', () => {
    console.log("Скрипт для регистрации загрузился!"); // Для проверки, что файл подключен

    // --- НАЙДИТЕ ВАШИ ЭЛЕМЕНТЫ ФОРМЫ РЕГИСТРАЦИИ ---
    // Убедитесь, что ID в JavaScript совпадают с ID в вашем HTML
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password'); // Предполагаемый ID для поля подтверждения пароля
    const roleInput = document.querySelector('input[name="role"]:checked'); // Если роль выбирается radio кнопками
    const registerButton = document.getElementById('register-button'); // Предполагаемый ID для кнопки регистрации
    // -----------------------------------------------

    if (!registerButton) {
        console.error("Кнопка регистрации с ID 'register-button' не найдена!");
        return; // Прекращаем выполнение, если кнопки нет
    }

    registerButton.addEventListener('click', async function(event) {
        // event.preventDefault(); // Если кнопка не типа submit, раскомментируйте это

        const login = loginInput ? loginInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const role = roleInput ? roleInput.value : ''; // Получаем выбранную роль

        // --- Валидация ---
        if (login === '') {
            alert('Пожалуйста, введите логин.');
            return;
        }
        if (password === '') {
            alert('Пожалуйста, введите пароль.');
            return;
        }
        if (confirmPassword === '') {
            alert('Пожалуйста, подтвердите пароль.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Пароли не совпадают.');
            return;
        }
        if (role === '') { // Если роль обязательна
            alert('Пожалуйста, выберите вашу роль.');
            return;
        }
        // --- Конец валидации ---

        // --- Отправка данных на сервер ---
        // !!! ИЗМЕНИТЕ '/api/register' НА ПРАВИЛЬНЫЙ URL ВАШЕГО API ДЛЯ РЕГИСТРАЦИИ !!!
        const registrationApiUrl = '/api/register';
        // ----------------------------------

        try {
            const response = await fetch(registrationApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Если у вас есть CSRF-токен или другие заголовки, добавьте их сюда
                    // 'X-CSRF-Token': 'ваш_токен'
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                    role: role // Отправляем роль на сервер
                })
            });

            const result = await response.json(); // Предполагаем, что сервер возвращает JSON

            if (!response.ok) {
                // Если ответ сервера указывает на ошибку (например, 400, 401, 409, 500)
                const errorMessage = result.message || `Ошибка сервера: ${response.status}`;
                alert(`Ошибка регистрации: ${errorMessage}`);
                return;
            }

            // --- Успешная регистрация ---
            alert('Регистрация прошла успешно! Вы будете перенаправлены.');
            // Например, перенаправляем на страницу входа или главную страницу
            window.location.href = '/login'; // ИЗМЕНИТЕ НА ВАШ URL ПЕРЕНАПРАВЛЕНИЯ
            // ---------------------------

        } catch (error) {
            // Обработка ошибок сети (например, сервер недоступен) или других ошибок fetch
            console.error('Произошла ошибка при отправке запроса:', error);
            alert('Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.');
        }
    });

    // Если у вас есть другие скрипты (например, для выбора роли), они могут быть здесь или в другом файле
    // Но основная логика регистрации должна быть здесь.
});        
