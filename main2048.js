var board = new Array()
var score = 0
var hasChange = new Array()
var startx
var starty
var endx
var endy
$(document).ready(function(){
    prepare()
    newGame()
})
function prepare(){
    if(documentWidth>500){
        gridContainerWidth=500
        cellSpace=20
        cellSideWidth=100
    }
    
    $("#grid-container").css(
        {"width":gridContainerWidth-2*cellSpace,
        "height":gridContainerWidth-2*cellSpace,
        "padding":cellSpace,
        "borderRadius":0.02*gridContainerWidth
        })
    
    $(".grid-cell").css(
        {"width":cellSideWidth,
        "height":cellSideWidth,
        "borderRadius":0.02*cellSideWidth
        }
    )
}
function newGame(){
    //初始化棋盘格
    init();
    //关闭得分界面
    $("#gameover").hide()
    //生成两个随机数字
    generateOneNum();
    generateOneNum();
}
function init(){
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            var girdCell = $("#grid-cell-"+i+"-"+j)
            girdCell.css("top",getPosTop(i))
            girdCell.css("left",getPosLeft(j))
        }
    }
    for(i=0;i<4;i++){
        board[i] = new Array()
        hasChange[i] = new Array()
        for(j=0;j<4;j++){
            board[i][j] = 0
            hasChange[i][j] = false
        }
    }
    score = 0
    showScore()
    updateBoardView()
    
}

function updateBoardView(){
    $(".number-cell").remove()
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            $("#grid-container").append("<div class='number-cell'"+ "id='number-cell-"+i+'-'+j+"'></div>")
            var theNumCell = $("#number-cell-"+i+"-"+j)
            if(board[i][j]==0){
                theNumCell.css({"width":"0px","height":"0px","top":getPosTop(i)+cellSideWidth/2,"left":getPosLeft(j)+cellSideWidth/2})
            }else{
                theNumCell.css(
                    {"width":cellSideWidth,
                    "height":cellSideWidth,
                    "top":getPosTop(i),
                    "left":getPosLeft(j),
                    "backgroundColor":getBackgroundColor(board[i][j]),
                    "color":getColor(board[i][j]),
                    "fontSize":getFontSize(board[i][j])
                    }
                )
                theNumCell.text(board[i][j])
            }
            hasChange[i][j] = false
        }
        $(".number-cell").css("lineHeight",cellSideWidth+"px")
    }
}
function isGameOver(){
    if(nospace()&&nomove()){
        gameover()
    }
}


function gameover(){
    $("#endscore").text(score)
    $("#gameover").css({
        "display":"block",
        "width":0.5*gridContainerWidth,
        "height":0.5*gridContainerWidth,
        "borderRadius":0.02*gridContainerWidth,
        "top":"25%",
        "left":"25%",
        "lineHeight":0.1*gridContainerWidth+"px"
    })
    
}

function generateOneNum(){
    if(nospace()){
      return false
    }else{
        //生成随机位置
        var ranx = parseInt(Math.floor(Math.random() *4))
        var rany = parseInt(Math.floor(Math.random() *4))
        var times = 0
        while(times<50){
            if(board[ranx][rany]==0){
                break
            }else{
                ranx = parseInt(Math.floor(Math.random() *4))
                rany = parseInt(Math.floor(Math.random() *4))
            }
            times++
        }
        if(times==50){
            for(i=0;i<4;i++){
                for(j=0;j<4;j++){
                    if(board[i][j]==0){
                        ranx = i
                        rany = j
                    }
                }
            }
        }
        //生成随机数字
        var rannum = Math.random()<0.5?2:4
        //位置与数字对应上
        board[ranx][rany] = rannum
        showNumberAnimation(ranx,rany,rannum)
        return true
    }
}

$(document).keydown(function(event){
    event.preventDefault()
    switch( event.keyCode){
        case 37://向左移动
            if(moveLeft()){
            setTimeout("generateOneNum()",210)
            setTimeout("isGameOver()",300)
            }
            break
            
        case 38://向上移动
            if(moveTop()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
            break
        case 39://向右移动
            if(moveRight()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
            break
        case 40://向下移动
            if(moveDown()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
            break

    }
})
document.addEventListener("touchstart",function(event){
    startx = event.touches[0].pageX
    starty = event.touches[0].pageY
})
document.addEventListener('touchmove',function(event){
    event.preventDefault()
}, { passive: false})
document.addEventListener("touchend",function(event){
    
    endx = event.changedTouches[0].pageX
    endy = event.changedTouches[0].pageY

    var delx = endx - startx
    var dely = endy - starty
    if(Math.abs(delx)<0.2*documentWidth && Math.abs(dely)<0.2*documentWidth){
        return
    }
    if(Math.abs(delx)>=Math.abs(dely)){
        //在X轴移动
        if(delx>0){
            //move right
            if(moveRight()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
        }else{
            //move left
            if(moveLeft()){
                setTimeout("generateOneNum()",210)
                setTimeout("isGameOver()",300)
                }
        }
    }else{
        if(dely>0){
            //move down
            if(moveDown()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
        }else{
            //move up
            if(moveTop()){
                setTimeout( "generateOneNum()",200)
                setTimeout( "isGameOver()",300)
            }
        }
    }
})
function moveLeft(){
    if(!canMoveLeft()){
        return false
    }
    //moveleft
    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(board[i][j]!=0){
                for(k=0;k<j;k++){
                    if(board[i][k]==0 && noBlockHer(i,j,k,board) ){
                        showMoveAnimate(i,j,i,k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                    }else if(board[i][k]==board[i][j]&&noBlockHer(i,j,k,board)&&!hasChange[i][k]){
                        showMoveAnimate(i,j,i,k)
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        score+=board[i][k]
                        showScore()
                        hasChange[i][k] = true
                        surprise(board[i][k])
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200) 
    return true
}

function moveTop(){
    if(!canMoveTop()){
        return false
    }
    for(i=1;i<4;i++){
        for(j=0;j<4;j++){
            if(board[i][j]!=0){
                for(k=0;k<i;k++){
                    if(board[k][j]==0 && noBlockVer(i,j,k,board)){
                        showMoveAnimate(i,j,k,j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                    }else if(board[k][j]==board[i][j]&&noBlockVer(i,j,k,board)&&!hasChange[k][j]){
                
                        showMoveAnimate(i,j,k,j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score+=board[k][j]
                        showScore()
                        hasChange[k][j]=true
                        surprise(board[k][j])
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}

function moveRight(){
    if(!canMoveRight()){
        return false
    }
    for(i=0;i<4;i++){
        for(j=0;j<3;j++){
            if(board[i][j]!=0){
                for(k=3;k>j;k--){
                    if(board[i][k]==0 && noBlockHer(i,k,j,board)){
                        showMoveAnimate(i,j,i,k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                    }else if(board[i][k]==board[i][j]&&noBlockHer(i,k,j,board)&&!hasChange[i][k]){
                        showMoveAnimate(i,j,k,j)
                        board[i][k]+=board[i][j]
                        board[i][j]=0
                        score+=board[i][k]
                        showScore()
                        hasChange[i][k] = true
                        surprise(board[i][k])
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200)
    return true
}

function moveDown(){
    if(!canMoveDown()){
        return false
    }
    
    for(i=0;i<3;i++){
        for(j=0;j<4;j++){
            if(board[i][j]!=0){
                for(k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockVer(k,j,i,board)){
                        showMoveAnimate(i,j,k,j)
                        board[k][j] = board[i][j]
                        board[i][j]=0
                    }else if(board[k][j]==board[i][j]&&noBlockVer(k,j,i,board)&&!hasChange[k][j]){
                        showMoveAnimate(i,j,k,j)
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        score+=board[k][j]
                        showScore()
                        hasChange[k][j] = true
                        surprise(board[k][j])
                    }
                }
            }
        }
    }
    
    setTimeout("updateBoardView()",200)
    return true
}