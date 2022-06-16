const NAME_PATTERN = /^[A-Z][a-z]{2,}$/;
const AGE_PATTERN = /^[1-6][0-9]$/;

const fields = {
    'firstName': {
        label: 'First name',
        pattern: NAME_PATTERN.source,
    },
    'secondName': {
        label: 'Second name',
        pattern: NAME_PATTERN.source,
    },
    'age': {
        label: 'How old are you?',
        pattern: AGE_PATTERN.source,
        type: 'number'
    },
    'email': {
        label: 'Email',
        type: 'email'
    }
};

window.addEventListener('load', () => {
    const form = document.createElement('form');

    const inputs = Object.keys(fields)
        .forEach(key => {
            const configObj = fields[key];

            const labelElement = document.createElement('label');
            const labelText = document.createElement('p');
            labelText.innerText = configObj.label;

            labelElement.appendChild(labelText);
            const inputElement = document.createElement('input');
            inputElement.name = key;
            inputElement.type = configObj.type ?? 'text';

            configObj.pattern && (inputElement.pattern = configObj.pattern);

            labelElement.appendChild(inputElement);
            form.appendChild(labelElement);
        });

    form.onsubmit = (e) => {
        e.preventDefault();
        const res = {};
        const formData = new FormData(e.target);
        Array.from(formData.keys())
            .forEach(key => res[key] = formData.get(key));
    };

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Submit';
    form.appendChild(submitButton);

    document.body.append(form);
});