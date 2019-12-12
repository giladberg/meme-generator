'use strict'

const initCanvas = (imgID) => {
  
    setGlobalVar(imgID)

    drawImg(imgID)
    addText()
    renderCanvas()
}

const renderCanvas = (downloadMode) => {
    const txts = getTxts()
    drawImg()
    txts.forEach((txt, index) => {
        if (getCurrSelectedTxtIdx() === index && !downloadMode) drawTextBG(txt.line, txt.size, txt.align, txt.color, txt.stroke,txt.strokeSize, txt.fontFamely, txt.offsetX, txt.offsetY)
        else drawText(txt.line, txt.size, txt.align, txt.color, txt.stroke,txt.strokeSize, txt.fontFamely, txt.offsetX, txt.offsetY)
    })

}

const onChangeText = () => {
    let elText = document.querySelector('#text')
    changeTxt(elText.value)
    renderCanvas()
}


const onChangeFontSize = (num) => {
    changeFontSize(num)
    renderCanvas()
}

const onChangeLine = (num) => {
    changeLine(num)
    renderCanvas()
}

const onAddText = () => {
    let elText = document.querySelector('#text')
    elText.value = ''
    addText()
    renderCanvas()
}

const onSwitchText = () => {
    let elText = document.querySelector('#text')
    if (getTxts().length === 0) {
        elText.value = ''
        addText()
        return
    }
    changeSelectedTxtIdx()
    elText.value = getCurrentTxt()
    renderCanvas()
}

const onDelete = () => {
    deleteTxt()
    onSwitchText()
    renderCanvas()
}
const onChangeColor = () => {
    let elColor = document.querySelector('#color')
    setColor(elColor.value)
    renderCanvas()
}

const onChangeStrokeColor=()=>{
    let elStrokeColor = document.querySelector('#stroke-color')
    setStrokeColor(elStrokeColor.value)
    renderCanvas()
}

const onDownload = (elLink) => {
            renderCanvas(true)
          const data = gCanvas.toDataURL()
          elLink.href = data
          elLink.download = 'my-meme.png'
          renderCanvas()
}

const onChangeFontFamely=()=>{
    let elFontFamely = document.querySelector('.font-famely')
    setFontFamely(elFontFamely.value)
    renderCanvas()
}

const onChangeStrokeSize=()=>{
    toggleStroke()
    renderCanvas()
}

const onChangeAling=(align)=>{
    onChangeAlign(align)
    renderCanvas()
}

const onPublish=(ev)=>{
     ev.target.innerText=""
}


function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
    })
}



