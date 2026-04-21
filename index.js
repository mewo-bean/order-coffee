const addButton = document.querySelector('.add-button');
const form = document.querySelector('form');
const modalOverlay = document.getElementById('order-modal');
const closeModalButton = document.querySelector('.close-modal-button');
const tableBody = document.getElementById('order-table-body');
const countTextElement = document.getElementById('beverage-count-text');

function getDeclension(number, words) {
    const num = Math.abs(number) % 100;
    const lastDigit = num % 10;

    if (num >= 11 && num <= 19) {
        return words[2];
    }
    if (lastDigit === 1) {
        return words[0];
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return words[1];
    }
    return words[2];
}

addButton.addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');
    const last = beverages[beverages.length - 1];

    const newBeverage = last.cloneNode(true);

    const lastTitle = last.querySelector('.beverage-count').textContent;
    const lastIndex = parseInt(lastTitle.match(/\d+/)[0], 10);
    const newIndex = lastIndex + 1;

    const title = newBeverage.querySelector('.beverage-count');
    title.textContent = `Напиток №${newIndex}`;

    const select = newBeverage.querySelector('select');
    select.selectedIndex = 0;

    const radios = newBeverage.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = radio.value === 'usual';
        radio.name = `milk-${newIndex}`;
    });

    const checkboxes = newBeverage.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    last.after(newBeverage);
});

form.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const beverages = document.querySelectorAll('.beverage');
        
        if (beverages.length > 1) {
            event.target.closest('.beverage').remove();
        }
    }
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

// отправка формы
form.addEventListener('submit', (event) => {
    event.preventDefault();
    modalOverlay.classList.remove('hidden');
    event.preventDefault();

    const beverages = document.querySelectorAll('.beverage');
    const count = beverages.length;

    const drinkWord = getDeclension(count, ['напиток', 'напитка', 'напитков']);
    countTextElement.textContent = `${count} ${drinkWord}`;

    tableBody.innerHTML = '';

    beverages.forEach((beverage) => {
        const select = beverage.querySelector('select');
        const drinkName = select.options[select.selectedIndex].textContent;

        const milkInput = beverage.querySelector('input[type="radio"]:checked');
        const milkName = milkInput ? milkInput.nextElementSibling.textContent : '';

        const optionInputs = beverage.querySelectorAll('input[type="checkbox"]:checked');
        const optionsArray = Array.from(optionInputs).map(input => input.nextElementSibling.textContent);
        const optionsName = optionsArray.join(', ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${drinkName}</td>
            <td>${milkName}</td>
            <td>${optionsName}</td>
        `;

        tableBody.appendChild(row);
    });

    modalOverlay.classList.remove('hidden');
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

form.addEventListener('input', (event) => {
    if (event.target.classList.contains('extra-text')) {
        const textarea = event.target;
        const beverage = textarea.closest('.beverage');
        const preview = beverage.querySelector('.preview');

        const text = textarea.value;
        preview.innerHTML = highlightWords(text);
    }
});

function highlightWords(text) {
    const words = [
        'очень нужно',
        'побыстрее',
        'поскорее',
        'срочно',
        'быстрее',
        'скорее'
    ];

    let result = text;

    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        result = result.replace(regex, '<b>$1</b>');
    });

    return result;
}

const confirmButton = document.querySelector('.confirm-order');

confirmButton.addEventListener('click', () => {
    const timeInput = document.querySelector('.order-time');
    const value = timeInput.value;

    if (!value) return;

    const [hours, minutes] = value.split(':').map(Number);

    const now = new Date();
    const selectedTime = new Date();

    selectedTime.setHours(hours, minutes, 0, 0);

    if (selectedTime < now) {
        timeInput.style.border = '2px solid red';
        alert('Мы не умеем перемещаться во времени. Выберите время позже, чем текущее');
        return;
    }

    timeInput.style.border = '';
    modalOverlay.classList.add('hidden');
});
