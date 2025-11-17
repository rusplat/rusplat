// registration.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Скрипт для регистрации загрузился!");

    // --- НАСТРОЙКИ СЕЛЕКТОРОВ HTML-ЭЛЕМЕНТОВ ---
    // !!! ПОЖАЛУЙСТА, ЗАПОЛНИТЕ ID ИЛИ СЕЛЕКТОРЫ СОГЛАСНО ВАШЕМУ HTML-КОДУ ФОРМЫ РЕГИСТРАЦИИ !!!
    const loginInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ЛОГИНА_ИЗ_ВАШЕГО_HTML');
    const passwordInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ПАРОЛЯ_ИЗ_ВАШЕГО_HTML');
    const confirmPasswordInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ПОДТВЕРЖДЕНИЯ_ПАРОЛЯ_ИЗ_ВАШЕГО_HTML');
    // Пример для радио-кнопок роли:
    // Если у вас `<input type="radio" name="role" value="Обычный трейдер">` и `<input type="radio" name="role" value="Team Lead">`
    const roleInput = document.querySelector('input[name="role"]:checked'); // Находит выбранную радио-кнопку с именем "role"
    // Если роль выбирается из выпадающего списка (select):
    // const roleInput = document.getElementById('ЗДЕСЬ_ID_ВЫПАДАЮЩЕГО_СПИСКА_РОЛИ_ИЗ_ВАШЕГО_HTML');
    const registerButton = document.getElementById('ЗДЕСЬ_ID_КНОПКИ_РЕГИСТРАЦИИ_ИЗ_ВАШЕГО_HTML');
    // ------------------------------------------

    // Проверка, что кнопка регистрации найдена
    if (!registerButton) {
        console.error("ОШИБКА: Кнопка регистрации не найдена! Проверьте, что ID кнопки в HTML совпадает с ID в скрипте.");
        alert("Произошла ошибка: кнопка регистрации не найдена. Обратитесь к администратору.");
        return; // Прекращаем выполнение, если кнопки нет
    }

    registerButton.addEventListener('click', async function(event) {
        // Если кнопка регистрации имеет type="submit" и находится внутри <form>,
        // раскомментируйте следующую строку, чтобы предотвратить стандартную отправку формы браузером.
        // event.preventDefault(); 

        const login = loginInput ? loginInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const role = roleInput ? roleInput.value : ''; // Получаем выбранную роль

        // --- Валидация данных формы ---
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
        // Если выбор роли обязателен:
        if (role === '') {
            alert('Пожалуйста, выберите вашу роль.');
            return;
        }
        // --- Конец валидации ---

        // --- Отправка данных на сервер ---
        // !!! ОЧЕНЬ ВАЖНО: ЗАМЕНИТЕ ЭТОТ URL НА РЕАЛЬНЫЙ АДРЕС ВАШЕГО API ДЛЯ РЕГИСТРАЦИИ !!!
        const registrationApiUrl = 'ЗДЕСЬ_ВАШ_URL_API_ДЛЯ_РЕГИСТРАЦИИ'; 
        // ----------------------------------

        try {
            const response = await fetch(registrationApiUrl, {
                method: 'POST', // Метод HTTP для отправки данных
                headers: {
                    'Content-Type': 'application/json', // Говорим серверу, что отправляем JSON
                    // Если ваш сервер требует CSRF-токен или другие заголовки, добавьте их сюда
                    // 'X-CSRF-Token': 'ваш_токен'
                },
                body: JSON.stringify({ // Преобразуем данные в формат JSON
                    login: login,
                    password: password,
                    role: role // Отправляем выбранную роль на сервер
                })
            });

            // Предполагаем, что сервер всегда возвращает JSON
            const result = await response.json(); 

            if (!response.ok) {
                // Если статус ответа не 2xx (например, 400 Bad Request, 401 Unauthorized, 500 Internal Server Error)
                const errorMessage = result.message || `Ошибка сервера: ${response.status} ${response.statusText}`;
                alert(`Ошибка регистрации: ${errorMessage}`);
                console.error("Ошибка при регистрации:", result); // Выводим полную ошибку в консоль
                return;
            }

            // --- Успешная регистрация ---
            alert('Регистрация прошла успешно! Вы будете перенаправлены на страницу пополнения.');
            console.log("Регистрация успешна:", result);
            // Перенаправляем пользователя на страницу account.html после успешной регистрации
            window.location.href = 'account.html'; 
            // ---------------------------

        } catch (error) {
            // Обработка ошибок сети (например, сервер недоступен) или других ошибок fetch
            console.error('Произошла ошибка при отправке запроса:', error);
            alert('Произошла ошибка при регистрации. Пожалуйста, проверьте подключение к интернету или попробуйте позже.');
        }
    });
});
