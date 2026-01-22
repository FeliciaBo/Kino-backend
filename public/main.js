//retrieve and log last visit time
const lastVisit = localStorage.getItem('lastVisit');
console.log('Last visited on:', lastVisit);

//store current visit time
const currentVisit = new Date().toISOString();
localStorage.setItem('lastVisit', currentVisit);