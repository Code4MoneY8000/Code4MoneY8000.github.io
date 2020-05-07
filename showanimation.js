function showNumberAnimation(i,j,num){
    var theNumberCell = $("#number-cell-"+i+"-"+j)
    theNumberCell.css({
        "backgroundColor":getBackgroundColor(num),
        "color":getColor(num)
    })
    theNumberCell.text(num)
    theNumberCell.animate({
        "width":cellSideWidth,
        "height":cellSideWidth,
        "top":getPosTop(i),
        "left":getPosLeft(j)
    },50)
}
function showMoveAnimate(fromx,fromy,tox,toy){
    var theNumberCell = $("#number-cell-"+fromx+"-"+fromy)
    theNumberCell.animate({
        "top":getPosTop(tox),
        "left":getPosLeft(toy)
    },200)
}
function showScore(){
    $("#score").text(score)
}
function surprise(num){
    if(num>2047){
        alert("太强了！")
    }
}