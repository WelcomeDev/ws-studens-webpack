import { Playlist } from '../../model/playlist';
import './playlistCarouselItem.scss';
import $ from 'jquery';
import { getInlineSvg } from '../../utils/getInlineSvg';

/**
 Элемент карусели
 **/
export function playlistCarouselItem(playlist: Playlist, index: number) {

    // можно бахнуть прям вот так, прям по жести элемент, с интерполяцией. И без всяких `innerHtml`
    const descriptionElement = $(`
        <div class="carousel-item__description">
            <h3 class="carousel-item__description-title">
                <span class="carousel-item__description-index">${index + 1}</span>
                ${playlist.title}
            </h3>
            <p class="carousel-item__description-annotation">
                ${playlist.description}
             </p>
        </div>
    `);

    const imageElement = $('<img>').addClass(['carousel-item__cover', 'image', 'loading']);
    import(`/src/assets/${playlist.imgSrc}`)
        .then((imgSrc) => {
            imageElement.removeClass('loading');
            imageElement.attr('src', imgSrc.default);
        });

    const controls = getControls();
    const coverWrapper = $('<div class="carousel-item__cover-wrapper">')
        .append($('<div class="carousel-item__cover-shadow">'))
        .append(imageElement)
        .append($('<div class="carousel-item__cover-controls">')
            .append(controls));

    // jqery реализует что-то типо паттерна строитель, возвращая инстанс класса при каждом вызове метода. таким образом, мы можем вызывать методы "цепочкой"
    // можно добавлять свои атрибуты в, однако они должны иметь префикс `data`. В данном случае это может облегчить дебаг
    return $(`<li class="carousel-item" data-index="${index}">`)
        // добавление листенера
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