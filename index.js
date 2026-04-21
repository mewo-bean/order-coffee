const addButon = document.querySelector('.add-button');

addButon.addEventListener('click', () => {
    const beverages = document.querySelectorAll('.beverage');
    const last = beverages[beverages.length - 1];

    const newBeverage = last.cloneNode(true);
    const newIndex = beverages.length + 1;

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
})