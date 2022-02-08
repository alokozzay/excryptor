let title = document.querySelectorAll('.table-mobile__spoiler_title');
for (let i = 0; i < title.length; i++ ) {
    title[i].addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    })
}
