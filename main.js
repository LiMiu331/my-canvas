var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
//1.控制画板宽高
autoSetCanvasSize(canvas)

//2.监听用户鼠标行为
listenToMouse(canvas)

//3.橡皮
var usingEraser = false
eraser.onclick = function () {
    usingEraser = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    usingEraser = false
    actions.className = 'actions'
}
//-------------------------------下方为工具函数-----------------------

//控制画板宽高
function autoSetCanvasSize(canvasid) {
    setCanvasSize() //设置画板宽高

    window.onresize = function () { //当用户调整窗口大小时，再次设置画板宽高
        setCanvasSize()
    }

    function setCanvasSize() {
        var pagewidth = document.documentElement.clientWidth //获取页面的宽高
        var pageheight = document.documentElement.clientHeight
        canvasid.width = pagewidth;
        canvasid.height = pageheight; //画板的宽高设置为页面宽高
    }
}

//画线
function drawline(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black'
    context.moveTo(x1, y1) //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
}
//监听用户函数
function listenToMouse(canvasid) {
    var using = false

    //按下去鼠标
    canvasid.onmousedown = function (down) {
        var x = down.clientX
        var y = down.clientY
        using = true
        if (usingEraser) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPonit = {
                "x": x,
                "y": y
            }
        }

    }
    //移动
    canvasid.onmousemove = function (move) {
        var x = move.clientX
        var y = move.clientY

        if (!using) { return }
        
        if (usingEraser) {
            
                context.clearRect(x - 5, y - 5, 10, 10)
          
        } else {
                NewPoint = {
                    "x": x,
                    "y": y
                }
            drawline(lastPonit.x, lastPonit.y, NewPoint.x, NewPoint.y)
            lastPonit = NewPoint
        }

    }

    //松开
    canvasid.onmouseup = function (up) {
        using = false
    }
}