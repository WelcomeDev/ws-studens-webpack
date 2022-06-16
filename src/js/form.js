const fields = {
    'firstName': {
        label: 'First name'
    },
    'secondName': {
        label: 'Second name'
    },
    'email': {
        label: 'Email'
    }
};

window.addEventListener('load', () => {
    const form = document.createElement('form');

    const inputs = Object.keys(fields)
        .forEach(key => {
            const labelElement = document.createElement('label');
            const labelText = document.createElement('p');
            labelText.innerText = fields[key].label;
            labelElement.appendChild(labelText);
            const inputElement = document.createElement('input');
            inputElement.name = key;

            labelElement.appendChild(inputElement);
            form.appendChild(labelElement);
        });

    document.body.append(form);
});