'use strict'


const gKeywords = { 'happy': 12, 'funny puk': 1 }
const gImgs = [{ id: 1, url: 'img/003.jpg', keywords: ['trump', 'angry', 'speach'] },
{ id: 2, url: 'img/004.jpg', keywords: ['dog', 'cute', 'happy', 'love', 'kiss'] },
{ id: 3, url: 'img/005.jpg', keywords: ['dog', 'baby', 'happy', 'smile'] }];
const gMeme = {
    selectedImgId: 1, selectedTxtIdx: 0,
    txts: []
}
let gCanvas
let gCtx
let gImg


const resizeCanvas = () => {
    const elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100

    // TODO: redraw..
}

const setGlobalVar = (imgID) => {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    gImg = null
    gMeme.selectedImgId = imgID
    gMeme.selectedTxtIdx=0
}

const findImgById = (imgID) => {
    return gImgs.find((img) => {
        return img.id === imgID
    });
}

const getGalleryData = () => { return gImgs }

const getTxts = () => { return gMeme.txts }



const drawImg = (imgID) => {
    // const img = document.querySelector('img');
    // gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    if (gImg)
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gImg = new Image()
        let img = findImgById(imgID)
        gImg.onload = () => {
            gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        };
        gImg.src = img.url
    }
    // NOTE: the proportion of the image - should be as the canvas,
    // otherwise the image gets distorted
}

const changeTxt = (line) => {
    gMeme.txts[gMeme.selectedTxtIdx].line = line
}

const addText = () => {
    gMeme.selectedTxtIdx = gMeme.txts.length
    let newTxt = createTxt()
    gMeme.txts.push(newTxt)
}

const createTxt = (line = '', size = 20, align = 'left', color = 'white', stroke = 'black', fontFamely = 'impact', offsetX = gCanvas.width / 2, offsetY = gCanvas.height / 2) => {
    return { line, size, align, color, stroke, fontFamely, offsetX, offsetY }
}



const drawText = (txt, size, align, color, stroke, fontFamely, x, y) => {
    gCtx.save()
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFamely}`;
    gCtx.textAlign = align;
    gCtx.lineWidth = 2;
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
    gCtx.restore()
}

const drawTextBG = (txt, font, align, color, stroke, fontFamely, x, y) => {

    /// lets save current state as we make a lot of changes        
    gCtx.save();
    /// set font
    gCtx.font = `${font}px ${fontFamely}`;
    gCtx.textAlign = align;
    /// draw text from top - makes life easier at the moment
    gCtx.textBaseline = 'Bottom';
    /// color for background
    gCtx.fillStyle = 'transparent';
    gCtx.strokeStyle = 'red'
    /// get width of text
    let width = gCtx.measureText(txt).width;
    /// draw background rect assuming height of font
    gCtx.beginPath();
    gCtx.rect(x, y - font, width, parseInt(font, 10))
    //gCtx.fillRect(x, y, width, parseInt(font, 10));
    gCtx.stroke()
    gCtx.closePath()
    /// text color
    gCtx.fillStyle = color;
    gCtx.strokeStyle = stroke
    /// draw text on top
    gCtx.lineWidth = 2;
    gCtx.strokeText(txt, x, y);
    gCtx.fillText(txt, x, y);
    /// restore original state
    gCtx.restore();
}

const changeFontSize = (num) => {
    gMeme.txts[gMeme.selectedTxtIdx].size += num
    if (gMeme.txts[gMeme.selectedTxtIdx].size === 0) gMeme.txts[gMeme.selectedTxtIdx].size = 1
}

const changeLine = (num) => {
    let index = gMeme.selectedTxtIdx
    gMeme.txts[index].offsetY += num
    if (gMeme.txts[index].offsetY < 0) gMeme.txts[gMeme.selectedTxtIdx].offsetY = 0
    if (gMeme.txts[index].offsetY > gCanvas.height + gMeme.txts[index].size) gMeme.txts[index].offsetY = gCanvas.height + gMeme.txts[index].size
}

const getCurrSelectedTxtIdx = () => { return gMeme.selectedTxtIdx }

const changeSelectedTxtIdx = () => {
    gMeme.selectedTxtIdx = (gMeme.selectedTxtIdx + 1) % gMeme.txts.length
}

const deleteTxt=()=>{
    gMeme.txts.splice(gMeme.selectedTxtIdx,1)
}

const getCurrentTxt=()=>{
    return gMeme.txts[gMeme.selectedTxtIdx].line
}