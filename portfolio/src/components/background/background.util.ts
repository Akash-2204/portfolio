export const initBackground = ({
  canvas,
  direction,
  speed,
  borderColor,
  squareSize,
  hoverFillColor,
  setHoveredSquare,
}: {
  canvas: HTMLCanvasElement;
  direction: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed: number;
  borderColor: string;
  squareSize: number;
  hoverFillColor: string;
  setHoveredSquare?: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
}) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const gridOffset = { x: 0, y: 0 };

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.y / squareSize) * squareSize;

    for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
      for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
        const squareX = x - (gridOffset.x % squareSize);
        const squareY = y - (gridOffset.y % squareSize);

        // Draw rounded borders
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = borderColor;
        ctx.roundRect(squareX, squareY, squareSize, squareSize, 100); // Radius of 5 for rounded corners
        ctx.stroke();

        // If hovering, fill the square
        if (setHoveredSquare) {
          ctx.fillStyle = hoverFillColor;
          ctx.fillRect(squareX + 2, squareY + 2, squareSize - 4, squareSize - 4); // Slight padding for rounded borders
        }
      }
    }
  };

  const updateGridMovement = () => {
    const effectiveSpeed = Math.max(speed, 0.1);
    switch (direction) {
      case 'right':
        gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'left':
        gridOffset.x = (gridOffset.x + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'up':
        gridOffset.y = (gridOffset.y + effectiveSpeed + squareSize) % squareSize;
        break;
      case 'down':
        gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
      case 'diagonal':
        gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
        gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
        break;
      default:
        break;
    }
  };

  const animate = () => {
    updateGridMovement();
    drawGrid();
    requestAnimationFrame(animate);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
    const startY = Math.floor(gridOffset.y / squareSize) * squareSize;

    const hoveredSquareX = Math.floor((mouseX + gridOffset.x - startX) / squareSize);
    const hoveredSquareY = Math.floor((mouseY + gridOffset.y - startY) / squareSize);

    setHoveredSquare?.({ x: hoveredSquareX, y: hoveredSquareY });
  };

  const handleMouseLeave = () => {
    setHoveredSquare?.(null);
  };

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  resizeCanvas();
  animate();

  return () => {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  };
};
