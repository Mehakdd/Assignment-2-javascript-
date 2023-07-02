console.log('gallery.js loaded')
const data = [
    {
        id: 1,
        caption: 'Pink Flowers',
        image: {
            large: 'images/flowers-pink-large.jpg',
            small: 'images/flowers-pink-small.jpg',
        }
    },
    {
        id: 2,
        caption: 'Purple Flowers',
        image: {
            large: 'images/flowers-purple-large.jpg',
            small: 'images/flowers-purple-small.jpg',
        }
    },
    {
        id: 3,
        caption: 'Red Flowers',
        image: {
            large: 'images/flowers-red-large.jpg',
            small: 'images/flowers-red-small.jpg',
        }
    },
    {
        id: 4,
        caption: 'White Flowers',
        image: {
            large: 'images/flowers-white-large.jpg',
            small: 'images/flowers-white-small.jpg',
        }
    },
    {
        id: 5,
        caption: 'Yellow Flowers',
        image: {
            large: 'images/flowers-yellow-large.jpg',
            small: 'images/flowers-yellow-small.jpg',
        }
    }
]

const gallery = document.querySelector('#gallery');
const figure = gallery.querySelector('figure');
const thumbnails = gallery.querySelector('.thumbnails');

let featuredImageId = 1;

function renderPage() {
    renderFeaturedImage();
    renderThumbnails();
    setInactiveThumbnailImageColorToGrey();
}

// function to render all small images in a list
function renderThumbnails() {
    const ul = document.createElement('ul');
    data.forEach(image => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = image.image.small;
        img.alt = image.caption;
        img.dataset.id = image.id;
        // add click event listener to each thumbnail image to change the featured image
        // and re-render feature image and apply grey filter to all thumbnail images
        li.addEventListener('click', function() {
            featuredImageId = image.id;
            renderFeaturedImage();
            setInactiveThumbnailImageColorToGrey();
        });
        li.appendChild(img);
        ul.appendChild(li);
    });
    thumbnails.innerHTML = '';
    thumbnails.appendChild(ul);
}

function renderFeaturedImage() {
    const image = data.find(image => image.id === featuredImageId);
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    img.src = image.image.large;
    img.alt = image.caption;
    img.classList.add('opacity-0');
    figcaption.textContent = image.caption;
    figure.innerHTML = '';
    figure.appendChild(img);
    figure.appendChild(figcaption);
    // add fade-in animation to featured image in a timeout to allow the image to load
    setInterval(() => {
        img.classList.add('fade-in');
    }, 10);
}

// function to set all thumbnail images to grey and set featured image to color
function setInactiveThumbnailImageColorToGrey() {
    thumbnails.querySelectorAll('img').forEach(img => {
        img.style.filter = 'grayscale(100%)';
    });
    thumbnails.querySelector(`img[data-id="${featuredImageId}"]`).style.filter = 'grayscale(0%)';
}

// initial render of page
renderPage();