import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';

export function playlistCarousel(items: Playlist[]) {
    const playlists = items.map(playlistCarouselItem);
    const leftSwitcher = switcher({ direction: 'left', onClick: turnLeft });
    const rightSwitcher = switcher({ direction: 'right', onClick: turnRight });

    // эквивалент document.createElement('ul');
    const carouselElement = $('<ul>').addClass('carousel-list')
                                     .append(playlists)
                                     .append(leftSwitcher)
                                     .append(rightSwitcher);

    function turnLeft() {

    }

    function turnRight() {

    }

    // возвращаем htmlElement, что делается вот таким интересным способом
    return carouselElement[0];
}