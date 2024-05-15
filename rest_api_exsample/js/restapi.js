// URL на REST API, от който ще взимаме данни
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Функция за взимане на данни от API
async function fetchData() {
    try {
        // Правим заявка към API-то
        const response = await fetch(apiUrl);

        // Проверяваме дали заявката е успешна
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Парсваме отговора като JSON
        const data = await response.json();
        console.log(data);
        // Визуализираме данните в HTML таблица
        populateTable(data);
    } catch (error) {
        // Ако има грешка, я извеждаме в конзолата
        console.error('Error fetching data:', error);
    }
}

// Функция за попълване на таблицата с данни
function populateTable(data) {
    const tableBody = document.getElementById('apiTable').getElementsByTagName('tbody')[0];

    data.forEach(item => {
        const row = document.createElement('tr');

        const cellId = document.createElement('td');
        cellId.textContent = item.id;
        if (parseInt(item.id) % 2 == 0) {
            cellId.className = "even_color";
        }

        row.appendChild(cellId);

        const cellTitle = document.createElement('td');
        cellTitle.textContent = item.title;
        row.appendChild(cellTitle);

        const cellBody = document.createElement('td');
        cellBody.textContent = item.body;
        row.appendChild(cellBody);

        tableBody.appendChild(row);
    });
}

// Извикваме функцията за взимане на данни
fetchData();
