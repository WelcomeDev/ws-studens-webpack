const COMMENT_HEADING = 'Share some info about you';

window.addEventListener('load', () => {
    const firstExistingForm = document.querySelector('form');
    if (!firstExistingForm) return;

    const labelElement = document.createElement('label');
    labelElement.innerHTML = `<p>${COMMENT_HEADING}</p>`;
    const wordsCouneter = document.createElement('span');
    labelElement.appendChild(wordsCouneter);
    const commentElement = document.createElement('textarea');
    labelElement.appendChild(commentElement);
    commentElement.addEventListener('input', (e: Event) => {
        const value = (e.target as HTMLTextAreaElement).value;
        const wordsAmount = value.split(' ').filter(x => !!x).length;
        wordsCouneter.innerText = `${wordsAmount} words`;
    });

    firstExistingForm.appendChild(labelElement);
});