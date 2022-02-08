let title = document.querySelectorAll('.main__spoiler-about_title');
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



let title2 = document.querySelectorAll('.main__spoiler-process_title');
for (let i = 0; i < title2.length; i++ ) {
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