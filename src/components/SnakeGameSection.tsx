import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Gamepad2, Play, RotateCcw } from "lucide-react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SPEED = 150;

const SnakeGameSection = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const directionRef = useRef<Direction>("RIGHT");

  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("snake-highscore");
    return saved ? parseInt(saved) : 0;
  });

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let pos: Position;
    do {
      pos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((s) => s.x === pos.x && s.y === pos.y));
    return pos;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setGameState("idle");
  }, [generateFood]);

  const startGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setScore(0);
    setGameState("playing");
  }, [generateFood]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    const tick = () => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = directionRef.current;

        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameState("over");
          return prev;
        }

        // Self collision
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameState("over");
          return prev;
        }

        const newSnake = [head, ...prev];

        // Eat food
        setFood((currentFood) => {
          if (head.x === currentFood.x && head.y === currentFood.y) {
            setScore((s) => {
              const newScore = s + 10;
              setHighScore((hs) => {
                if (newScore > hs) {
                  localStorage.setItem("snake-highscore", String(newScore));
                  return newScore;
                }
                return hs;
              });
              return newScore;
            });
            const nextFood = generateFood(newSnake);
            return nextFood;
          } else {
            newSnake.pop();
            return currentFood;
          }
        });

        return newSnake;
      });
    };

    const speed = Math.max(60, INITIAL_SPEED - score * 0.5);
    gameLoopRef.current = window.setInterval(tick, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, score, generateFood]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = GRID_SIZE * CELL_SIZE;
    ctx.clearRect(0, 0, size, size);

    // Grid background
    ctx.fillStyle = "hsl(220, 18%, 10%)";
    ctx.fillRect(0, 0, size, size);

    // Grid lines
    ctx.strokeStyle = "hsl(220, 15%, 14%)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(size, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = "hsl(38, 70%, 55%)";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Snake
    snake.forEach((seg, i) => {
      const alpha = 1 - i * 0.03;
      ctx.fillStyle = i === 0 ? "hsl(38, 60%, 65%)" : `hsla(38, 50%, 55%, ${Math.max(0.4, alpha)})`;
      ctx.fillRect(
        seg.x * CELL_SIZE + 1,
        seg.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
  }, [snake, food]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      const key = e.key;
      const current = directionRef.current;
      if ((key === "ArrowUp" || key === "w") && current !== "DOWN") {
        directionRef.current = "UP";
        setDirection("UP");
      } else if ((key === "ArrowDown" || key === "s") && current !== "UP") {
        directionRef.current = "DOWN";
        setDirection("DOWN");
      } else if ((key === "ArrowLeft" || key === "a") && current !== "RIGHT") {
        directionRef.current = "LEFT";
        setDirection("LEFT");
      } else if ((key === "ArrowRight" || key === "d") && current !== "LEFT") {
        directionRef.current = "RIGHT";
        setDirection("RIGHT");
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState]);

  // Touch controls
  const touchStart = useRef<Position | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || gameState !== "playing") return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const current = directionRef.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && current !== "LEFT") { directionRef.current = "RIGHT"; setDirection("RIGHT"); }
      else if (dx < -20 && current !== "RIGHT") { directionRef.current = "LEFT"; setDirection("LEFT"); }
    } else {
      if (dy > 20 && current !== "UP") { directionRef.current = "DOWN"; setDirection("DOWN"); }
      else if (dy < -20 && current !== "DOWN") { directionRef.current = "UP"; setDirection("UP"); }
    }
    touchStart.current = null;
  };

  // Save high score on game over
  useEffect(() => {
    if (gameState === "over" && score > highScore) {
      setHighScore(score);
      localStorage.setItem("snake-highscore", String(score));
    }
  }, [gameState, score, highScore]);

  const canvasPixels = GRID_SIZE * CELL_SIZE;

  return (
    <section id="game" className="section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gamepad2 className="w-4 h-4 text-primary" />
          <span className="text-primary font-body text-sm tracking-widest uppercase font-semibold">
            {t("game.label")}
          </span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("game.title")}
        </h2>

        <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto">
          {t("game.desc")}
        </p>

        <div className="flex items-center justify-center gap-8 mb-6 font-body text-sm">
          <div>
            <span className="text-muted-foreground">{t("game.score")}: </span>
            <span className="text-primary font-bold">{score}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{t("game.highscore")}: </span>
            <span className="text-primary font-bold">{highScore}</span>
          </div>
        </div>

        <div
          className="relative inline-block border-2 border-border rounded-lg overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={canvasRef}
            width={canvasPixels}
            height={canvasPixels}
            className="block"
            style={{ imageRendering: "pixelated" }}
          />

          {gameState === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                <Play className="w-4 h-4" />
                {t("game.play")}
              </button>
              <p className="text-muted-foreground text-xs mt-3 font-body">
                {t("game.controls")}
              </p>
            </div>
          )}

          {gameState === "over" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <p className="text-foreground font-display text-2xl font-bold mb-1">
                Game Over
              </p>
              <p className="text-primary font-body text-lg font-bold mb-4">
                {score} {t("game.points")}
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t("game.retry")}
              </button>
            </div>
          )}
        </div>

        {/* Mobile D-pad */}
        {gameState === "playing" && (
          <div className="md:hidden mt-6 flex flex-col items-center gap-2">
            <button
              onTouchStart={() => { if (directionRef.current !== "DOWN") { directionRef.current = "UP"; setDirection("UP"); } }}
              className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold active:bg-primary active:text-primary-foreground transition-colors"
            >
              ▲
            </button>
            <div className="flex gap-2">
              <button
                onTouchStart={() => { if (directionRef.current !== "RIGHT") { directionRef.current = "LEFT"; setDirection("LEFT"); } }}
                className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold active:bg-primary active:text-primary-foreground transition-colors"
              >
                ◀
              </button>
              <div className="w-14 h-14" />
              <button
                onTouchStart={() => { if (directionRef.current !== "LEFT") { directionRef.current = "RIGHT"; setDirection("RIGHT"); } }}
                className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold active:bg-primary active:text-primary-foreground transition-colors"
              >
                ▶
              </button>
            </div>
            <button
              onTouchStart={() => { if (directionRef.current !== "UP") { directionRef.current = "DOWN"; setDirection("DOWN"); } }}
              className="w-14 h-14 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold active:bg-primary active:text-primary-foreground transition-colors"
            >
              ▼
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SnakeGameSection;
