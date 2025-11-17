// registration.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Скрипт для 'обманной' регистрации загрузился!");

    // --- НАСТРОЙКИ СЕЛЕКТОРОВ HTML-ЭЛЕМЕНТОВ ---
    // !!! ПОЖАЛУЙСТА, ЗАПОЛНИТЕ ID ИЛИ СЕЛЕКТОРЫ СОГЛАСНО ВАШЕМУ HTML-КОДУ ФОРМЫ РЕГИСТРАЦИИ !!!
    const loginInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ЛОГИНА_ИЗ_ВАШЕГО_HTML');
    const passwordInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ПАРОЛЯ_ИЗ_ВАШЕГО_HTML');
    const confirmPasswordInput = document.getElementById('ЗДЕСЬ_ID_ПОЛЯ_ПОДТВЕРЖДЕНИЯ_ПАРОЛЯ_ИЗ_ВАШЕГО_HTML');
    // Пример для радио-кнопок роли (если они есть и вы хотите их проверить, иначе можно убрать):
    const roleInput = document.querySelector('input[name="role"]:checked'); // Находит выбранную радио-кнопку с именем "role"
    const registerButton = document.getElementById('ЗДЕСЬ_ID_КНОПКИ_РЕГИСТРАЦИИ_ИЗ_ВАШЕГО_HTML');
    // ------------------------------------------

    // Проверка, что кнопка регистрации найдена
    if (!registerButton) {
        console.error("ОШИБКА: Кнопка регистрации не найдена! Проверьте, что ID кнопки в HTML совпадает с ID в скрипте.");
        alert("Произошла ошибка: кнопка регистрации не найдена. Обратитесь к администратору.");
        return; // Прекращаем выполнение, если кнопки нет
    }

    registerButton.addEventListener('click', function(event) {
        // !!!ВАЖНО!!! Если ваша кнопка имеет type="submit" и находится внутри <form>,
        // раскомментируйте следующую строку. Это предотвратит стандартную отправку формы браузером.
        // event.preventDefault(); 

        const login = loginInput ? loginInput.value.trim() : '';
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const role = roleInput ? roleInput.value : ''; // Получаем выбранную роль

        // --- Валидация данных формы (чтобы не было совсем пусто) ---
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
        // Если выбор роли обязателен (и вы хотите его проверить):
        if (role === '') {
            alert('Пожалуйста, выберите вашу роль.');
            return;
        }
        // --- Конец валидации ---

        // --- ЕСЛИ ВСЯ ВАЛИДАЦИЯ ПРОЙДЕНА, СРАЗУ ПЕРЕНАПРАВЛЯЕМ НА СТРАНИЦУ ПОПОЛНЕНИЯ ---
        console.log("Данные валидны (для 'обманной' регистрации). Перенаправление на account.html...");
        window.location.href = 'account.html'; 
        // -----------------------------------------------------------------------------------
    });
});
