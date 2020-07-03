const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');

let tags = [];

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeIcon = document.createElement('i');
    closeIcon.setAttribute('class', 'fa fa-times');
    closeIcon.setAttribute('data-item', label);
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

function clearTags() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });
}

function addTags() {
    clearTags();
    tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.target.value.split(',').forEach(tag => {
            tags.push(tag);
        });
        addTags();
        displayTags();
        input.value = '';
    }
});
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        const tagLabel = e.target.getAttribute('data-item');
        const index = tags.indexOf(tagLabel);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        addTags();
        displayTags();
    }
})

input.focus();
var cards = document.querySelectorAll(".card");
var activeCards=cards;
function displayTags() {
    var i, j, k;
    if (tags.length == 0) {
        for (i = 0; i < cards.length; i++){
            cards[i].style.display = "block";
            activeCards=cards;
        }
    }
    for (i = 0; i < tags.length; i++) {
        var current_tag = tags[i];
        var count=0;
        for (k = 0; k < activeCards.length; k++) {
            var currentCard = activeCards[k];
            var spans = currentCard.querySelectorAll('span');
            for (j = 0; j < spans.length; j++) {
                var role = spans[j].dataset.role;
                var level = spans[j].dataset.level;
                var languages = spans[j].dataset.languages;
                var tools = spans[j].dataset.tools;
                if ((current_tag === role) || (current_tag === level) || (current_tag === languages) || (current_tag === tools)){
                    count++;
                }
            }
            if(count!=0){
                currentCard.style.display = "block";
            }
            else{
                currentCard.style.display = "none";
            }
            count=0;
        }
    }
    for(i = 0; i < cards.length; i++){
        if(window.getComputedStyle(cards[i], null).getPropertyValue("display")=="block")
            activeCards[i]=cards[i];
    }
}
