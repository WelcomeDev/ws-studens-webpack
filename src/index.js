import moment from 'moment';

window.addEventListener('load', () => {
    const heading = document.createElement('h2');
    heading.innerText = "Simple timer";
    document.body.appendChild(heading);

    const time = document.createElement('p');
    document.body.appendChild(time);
    setInterval(() => time.innerText = moment().format('HH:mm:ss'), 1000);

});