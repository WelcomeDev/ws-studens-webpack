import './index.scss';
import './styles/drop.scss';

// btw ошибка на уроке была в том, что я пытался прослушать `load` у document, а не у window. А там этого ивента нет (╯°□°）╯︵ ┻━┻
window.addEventListener('load', () => {
    const mainElement = document.getElementsByTagName('main')
                                .item(0);
    console.log(document.getElementsByTagName('main'));
    if (!mainElement) return;
    mainElement.innerText = 'Working!';

});