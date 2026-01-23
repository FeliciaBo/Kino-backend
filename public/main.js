//retrieve and log last visit time
const lastVisit = localStorage.getItem('lastVisit');
console.log('Last visited on:', lastVisit);



if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);

    document.querySelectorAll('.movie-poster').forEach(card => {
        const publishedAt = new Date(card.dataset.publishedAt);
        

        if (publishedAt > lastVisitDate) {
            card.classList.add('new');
        }
    });
}

localStorage.setItem('lastVisit', new Date().toISOString());