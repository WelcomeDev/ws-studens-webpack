import { Playlist } from '../../model/playlist';
import $ from 'jquery';
import { playlistCarouselItem } from '../playlistCarouselItem/playlistCarouselItem';
import { switcher } from '../switcher/switcher';
import './playlistCarousel.scss';

export function playlistCarousel(items: Playlist[]) {
    const playlists = items.map(playlistCarouselItem);
    const leftSwitcher = switcher({ direction: 'left', onClick: turnLeft });
    const rightSwitcher = switcher({ direction: 'right', onClick: turnRight });

    // стили добавляем здесь, потому что сам switcher не должен ничего знать о своем положении в контейнере. Это обеспечит переиспользуемость
    leftSwitcher.classList.add('carousel__control', 'carousel__control--left');
    rightSwitcher.classList.add('carousel__control', 'carousel__control--right');
    // эквивалент document.createElement('ul');
    const carouselElement = $('<div>').addClass('carousel')
                                      .append($('<ul>').addClass('carousel-list')
                                                       .append(playlists))
                                      .append(leftSwitcher)
                                      .append(rightSwitcher);


    function turnLeft() {

    }

    function turnRight() {

    }

    // возвращаем htmlElement, что делается вот таким интересным способом
    return carouselElement[0];
}