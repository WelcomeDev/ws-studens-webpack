import moment from 'moment';
import '../css/index.css';

const DEADLINE = moment('18:20', 'HH:mm');

window.addEventListener('load', () => {
    const heading = document.createElement('h2');
    heading.innerText = "Simple timer";
    document.body.appendChild(heading);

    const time = document.createElement('div');
    document.body.appendChild(time);
    const nowTime = document.createElement('p');
    nowTime.classList.add('info');
    const toDeadline = document.createElement('p');
    toDeadline.classList.add('warning');
    time.appendChild(nowTime);
    time.appendChild(toDeadline);

    setInterval(
        () => {
            nowTime.innerText = `Now is: ${moment().format('HH:mm:ss')}`;
            const timeLeft = DEADLINE.diff(moment(), 'hours', true);
            const timeLeftStr = `${timeLeft.toFixed(0)}:${(timeLeft % 1 * 60).toFixed(0)}`;
            toDeadline.innerText = `It's ${timeLeftStr} left`;
        },
        1000
    );


});