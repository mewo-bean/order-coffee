const addButon = document.querySelector('.add-button');

addButon.addEventListener('click', () => {
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

const form = document.querySelector('form');

form.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const beverages = document.querySelectorAll('.beverage');
        
        if (beverages.length > 1) {
            event.target.closest('.beverage').remove();
        }
    }
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
        'срочно',
        'быстрее',
        'побыстрее',
        'скорее',
        'поскорее',
        'очень нужно'
    ];

    let result = text;

    words.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        result = result.replace(regex, '<b>$1</b>');
    });

    return result;
}
