'use strict'


const initGallery=()=>{
    const elGallery= document.querySelector('.gallery-content')
    const gallery= getGalleryData()
    const strDivs = gallery.map( img=> {
        return `<div class="picture" data-id=${img.id} onclick="onSelectedPicture(${img.id})">
                    <img class="" src=${img.url} alt=${img.id}>
                </div>`;
    })
    elGallery.innerHTML = strDivs.join('');
}

const onSelectedPicture=(imgID)=>{
    initCanvas(imgID)
}