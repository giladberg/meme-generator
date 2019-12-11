'use strict'


const initCanvas = (imgID) => {
    setGlobalVar(imgID)
    
    drawImg(imgID)
    addText()
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
    txts.forEach((txt,index)=>{
        if(getCurrSelectedTxtIdx()===index)drawTextBG(txt.line,txt.size,txt.align,txt.color,txt.stroke,txt.fontFamely,txt.offsetX,txt.offsetY)
       else drawText(txt.line,txt.size,txt.align,txt.color,txt.stroke,txt.fontFamely,txt.offsetX,txt.offsetY)       
    })
    
}

const onChangeText=()=>{
    let elText = document.querySelector('#text')
    changeTxt(elText.value)
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

const onAddText=()=>{
    let elText = document.querySelector('#text')
    elText.value=''
    addText()
    renderCanvas()
}

const onSwitchText=()=>{
    let elText = document.querySelector('#text')
    if(getTxts().length===0){
        elText.value=''
        addText()
        return
    }
    changeSelectedTxtIdx()
    elText.value= getCurrentTxt()
    renderCanvas()
}

const onDelete=()=>{
    deleteTxt()
    onSwitchText()
    //  changeSelectedTxtIdx()
      renderCanvas()
}