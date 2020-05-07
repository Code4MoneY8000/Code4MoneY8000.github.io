documentWidth = window.screen.availWidth
gridContainerWidth = 0.92*documentWidth
cellSideWidth = 0.18*documentWidth
cellSpace = 0.04*documentWidth


function getPosTop(row){
    return cellSpace+row*(cellSideWidth+cellSpace)
}
function getPosLeft(column){
    return cellSpace+column*(cellSpace+cellSideWidth)
}
function getBackgroundColor(number){
 switch(number){
     case 2:return "#eee4da";break;
     case 4:return "#ede0c8";break;
     case 8:return "#f2b179";break;
     case 16:return "#f59563";break;
     case 32:return "#f67c5f";break;
     case 64:return "#f65e3b";break;
     case 128:return "#edcf72";break;
     case 256:return "#edcc61";break;
     case 512:return "#9c0";break;
     case 1024:return "#33b5e5";break;
     case 2048:return "#09c"; break;
     case 4096:return "#a6c";break;
     case 8192:return "#93c";break;
 }
}
function getColor(number){
    if(number<=4){
        return "#776e65"
    }else{
        return "white"
    }
}
function nospace(){
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(board[i][j]==0)
            return false
        }
    }
    return true
}

function canMoveLeft(){
    for(i=0;i<4;i++){
        for(j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0 || board[i][j]==board[i][j-1]){
                    return true
                }
            }
        }
    }
}

function canMoveTop(){
    for(i=1;i<4;i++){
        for(j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i][j]==board[i-1][j]){
                    return true
                }
            }
        }
    }
}
function canMoveRight(){
    for(i=0;i<4;i++){
        for(j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j]==board[i][j+1]){
                    return true
                }
            }
        }
    }
}
function canMoveDown(){
    for(i=0;i<3;i++){
        for(j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i][j]==board[i+1][j]){
                    return true
                }
            }
        }
    }
}
function noBlockHer(i,j,k,board){
    for(x=k+1;x<j;x++){
        if(board[i][x]!=0)
        return false
    }
    return true

}
function noBlockVer(i,j,k,board){
    for(x=k+1;x<i;x++){
        if(board[x][j]!=0)
        return false
    }
    return true
}
function nomove(){
    if(canMoveDown()||canMoveLeft()||canMoveLeft()||canMoveRight()){
        return false
    }

    return true
}