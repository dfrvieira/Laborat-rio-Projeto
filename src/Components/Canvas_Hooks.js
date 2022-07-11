import { useOnDraw } from '../Components/Hooks'
//import { Stage, Layer, Line } from "react-konva"

const Canvas = ({
    width,
    height,
    img
}) => {

    const setCanvasRef = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5, "round")
        //drawRect(ctx, 50, 50, 50, 50, 'FFFFFF', 3)
        //drawText(ctx, 30, 'Arial', 150, 100)
        //drawCircle(ctx,50,50,50)
    }

    function drawText(ctx, size, font, x, y) {
        ctx.font = `${size}px ${font}`
        ctx.fillText("Hello World", x, y);
        //console.log(123);
    }

    function drawRect(ctx, x, y, width, height, borderColor, borderWidth) {
        ctx.beginPath();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }

    function drawCircle(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.stroke()
    }

    function drawLine(start, end, ctx, color, width, cap) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.lineCap = cap;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke()

        // ctx.fillStyle = color;
        // ctx.beginPath();
        // ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI)
        // ctx.fill()
    }

    return (
        <div>
            <>
                <canvas
                    width={width}
                    height={height}
                    img={img}
                    style={canvasStyle}
                    ref={setCanvasRef}
                />
            </>
        </div>
    )
}

export default Canvas

const canvasStyle = {
    border: "3px solid black",
    width: "1205px",
    height: "450px",
}

