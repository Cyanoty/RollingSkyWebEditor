var favNumber = Math.floor(Math.random() * 5)+1;
var fav = document.createElement('link');
fav.rel = 'icon';
fav.href = "../../assets/favicon/icon.png"
document.getElementsByTagName('head')[0].appendChild(fav);