'use strict'


const initCanvas = (imgID) => {
    setGlobalVar(imgID)
    
    drawImg(imgID)
   
    renderCanvas()
    // resizeCanvas()
    // window.addEventListener('resize',
    //     () => {
    //          gCanvas.width = window.innerWidth - 50
    //          gCanvas.height = window.innerHeight - 100;
    //     })
}

const renderCanvas=()=>{
    // const img= findImgById(1)
    const txts=getTxts()
    drawImg()
    txts.forEach(txt=>{
       // drawText(txt.line,txt.size,txt.align,txt.color,txt.offsetX,txt.offsetY)
        drawTextBG(txt.line,txt.size,txt.align,txt.color,txt.offsetX,txt.offsetY)
    })
    
}

const onChangeText=()=>{
    let text = document.querySelector('#text')
    addTxt(text.value)
    renderCanvas()
}


const onChangeFontSize=(num)=>{
   changeFontSize(num)
   renderCanvas()
}

const onChangeLine=(num)=>{
    changeLine(num)
    renderCanvas()
}