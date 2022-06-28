import './index.scss';
import './styles/drop.scss';
import playlists from './data/playlists.json';
import { playlistCarousel } from './components/playlistCarousel/playlistCarousel';

// btw ошибка на уроке была в том, что я пытался прослушать `load` у document, а не у window. А там этого ивента нет (╯°□°）╯︵ ┻━┻
// используется jquery, и вам тоже можно его юзать. Потому что достаточно больно писать на чистом JS
window.addEventListener('load', () => {
    const mainElement = document.getElementsByTagName('main')
                                .item(0);
    if (!mainElement) return;

    // возвращаем htmlElement, что делается вот таким интересным способом `[0]`
    mainElement.appendChild(playlistCarousel(playlists)[0]);
});