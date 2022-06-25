import { Playlist } from '../../model/playlist';
import './playlistCarouselItem.scss';
import $ from 'jquery';
import { getInlineSvg } from '../../utils/getInlineSvg';

/**
 Элемент карусели
 **/
export function playlistCarouselItem(playlist: Playlist, index: number) {
    // jqery реализует что-то типо паттерна строитель, возвращая инстанс класса при каждом вызове метода. таким образом, мы можем вызывать методы "цепочкой"
    const descriptionElement = $('<div>').addClass('carousel-item__description')
                                         .append($('<h3>')
                                             .append(`<span class="carousel-item__description-index">${index + 1}</span>`)
                                             .append(playlist.title)
                                             .addClass('carousel-item__description-title'))
                                         .append($('<p>').text(playlist.description)
                                                         .addClass('carousel-item__description-annotation'));

    const imageElement = $('<img>').addClass(['carousel-item__cover', 'image', 'loading']);
    import(`/src/assets/${playlist.imgSrc}`)
        .then((imgSrc) => {
            imageElement.removeClass('loading');
            imageElement.attr('src', imgSrc.default);
        });

    const controls = getControls();
    const coverWrapper = $('<div>').addClass('carousel-item__cover-wrapper')
                                   .append($('<div class="carousel-item__cover-shadow">'))
                                   .append(imageElement)
                                   .append($('<div>').addClass('carousel-item__cover-controls')
                                                     .append(controls));

    return $('<li>').addClass('carousel-item')
        // можно добавлять свои атрибуты в, однако они должны иметь префикс `data`. В данном случае это может облегчить дебаг
                    .attr('data-index', index)
        // добавление лисенера
                    .on('click', () => window.open(playlist.link, '_blank'))
                    .append(coverWrapper)
                    .append(descriptionElement);
}

function getControls() {
    function createControl(svgName: string, type: 'side' | 'play') {
        const control = $('<button>').addClass(['cover-control', `cover-control--${type}`])
            // ух, семантика так и прет
                                     .on('click', (e) => e.stopPropagation())
                                     .attr('type', 'button');
        getInlineSvg(svgName).then(svg => {
            svg.classList.add('icon');
            control.append(svg);
        });
        return control;
    }

    const likeElement = createControl('like.svg', 'side');
    const shareElement = createControl('share.svg', 'side');
    const playElement = createControl('play.svg', 'play');

    return [likeElement, playElement, shareElement];
}