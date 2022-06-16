import GolosSrc from '../images/golos-logo.svg';
import DocumentSrc from '../images/document.png';

window.addEventListener('load', () => {
    const imagesSection = document.createElement('section');
    imagesSection.id = 'images';
    document.body.appendChild(imagesSection);

    imagesSection.innerHTML = GolosSrc;

    const documentImage = new Image();
    documentImage.src = DocumentSrc;
    imagesSection.appendChild(documentImage);
});