import React, { ComponentProps, useCallback, useState } from "react";
import { Graphics, useTick, Text } from "@pixi/react";
import { SIZE, DEV_MODE, GRAVITY } from "~~/constant/flappypuppy";
// import { saveScore } from "../service/player"
import { useStore } from "~~/services/store/game";
import { sound } from "@pixi/sound";

type Draw = ComponentProps<typeof Graphics>['draw'];


export function isBirdCash(rect1: any, rect2 : any) {
  // Check if rect1 is to the left of rect2
  if (rect1.xMax < rect2.xMin || rect2.xMax < rect1.xMin) {
    return false;
  }
  // Check if rect1 is above rect2
  if (rect1.yMax < rect2.yMin || rect2.yMax < rect1.yMin) {
    return false;
  }
  // If neither condition is met, then the rectangles intersect
  return true;
}

// Main function process game logic
/**
 * Represents the main game loop.
 *
 * @returns {JSX.Element} The rendered game loop component.
 */
export function Loop() {
  const {scale, playerAccount, setPlayerAccount, totalScore,  screen, gap, pipeSize, birdSize, birdCash, initGame, score, insScore, gameState, updateGameState, setBirdCash, pipe, birdX, birdY, birdR, speed, updateBirdY, updateBirdR, changeSpeed, updatePipePosition } = useStore();
  
  const renderY1 = pipe.y + gap - pipeSize.height;  
  const renderY2 = renderY1 + gap + pipeSize.height;
  const renderPipeX = pipe.x;
  const renderBirdX = birdX - (birdSize.width / 2);
  const renderBirdY = birdY - (birdSize.height / 2);
  let GAP_POSITION1 = { xMin: renderPipeX, yMin: renderY1, xMax: renderPipeX + SIZE.pipeTop.w, yMax: renderY1 + pipeSize.height };
  let GAP_POSITION2 = { xMin: renderPipeX, yMin: renderY2, xMax: renderPipeX + SIZE.pipeTop.w, yMax: renderY2 + pipeSize.height };
  const BIRD_POSITION = { xMin: renderBirdX, yMin: renderBirdY, xMax: renderBirdX + birdSize.width, yMax: renderBirdY + birdSize.height };

  function birdFly(delta: number) {
      let newBirdY = birdY + speed * (1.2 * delta * scale);
      let newSpeed = speed + GRAVITY;
      let newRotation = Math.max(81.3, Math.min(82.7, birdR + (speed * 0.015 * scale)));
  
      if (newBirdY > (screen.height - birdSize.height / 2) || newBirdY < 0) {
        // console.log('[Game over] Bird is flying outside the screen')
        updateGameState(false);
        updateBirdR(newRotation);
        updateBirdY(newBirdY);
        changeSpeed(newSpeed);
        
        if (newBirdY > (screen.height - birdSize.height / 2)) {
          // console.log(`Game over`)
          sound.play('die');
          setBirdCash();
          if (score > 0) {
            const newTotalScore = totalScore + score;
            setPlayerAccount(playerAccount, newTotalScore);
            
            // saveScore(playerAccount, newTotalScore).then((value) => {
            //   console.log(`Update new score successfully, `, value);
            // })
          }
        }
      } else {
          updateBirdR(newRotation);
          updateBirdY(newBirdY);
          changeSpeed(newSpeed);
      }
  }


  function pipeMove(delta: number) {
    // console.log(`Delta * Scale `, delta *  scale);
    let newX = (pipe.x + pipeSize.width) < 0 ? screen.width : pipe.x - (delta *  scale);

    let newY = pipe.y;
    let moved = pipe.moved;

    if (newX < - pipeSize.width) {
      newX = screen.width;
      newY = Math.min(Math.floor(Math.random() * (1.8 - 1.2 + 1) + 1.2));
      moved = false;
    }
    updatePipePosition(newX, newY, moved);
  }
  useTick(delta => {
      if (gameState) {
        // console.log(`Start`)
        pipeMove(delta);
        birdFly(delta);
        scoreInsLogic();
      } else if (!birdCash) {
        birdFly(delta);
      }
  }, initGame);



  function scoreInsLogic() {

    let BIRD_CASH = false;

    if (BIRD_POSITION.xMax > GAP_POSITION1.xMin) {
      BIRD_CASH = isBirdCash(BIRD_POSITION, GAP_POSITION1) || isBirdCash(BIRD_POSITION, GAP_POSITION2);
      if (BIRD_CASH) {
        updateGameState(false);
      }
    } 
    
    if (!BIRD_CASH && GAP_POSITION1.xMax < BIRD_POSITION.xMin) {
      // console.log(`Pipe xMax `, GAP_POSITION1.xMax, `Bird xMin`,BIRD_POSITION.xMin )
      // Inscrease score
      if (gameState) {
        insScore();
      }
      
    }
  }

  // Draw outline debug object on CANVAS
  const drawPipe = useCallback((g: { clear: () => void; lineStyle: (arg0: number, arg1: number, arg2: number) => void; drawRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; endFill: () => void; }) => {
    g.clear();
    g.lineStyle(1.5, 0xff0000, 1);
    g.drawRect(renderPipeX, renderY1, pipeSize.width, pipeSize.height);
    g.drawRect(renderPipeX, renderY2, pipeSize.width, pipeSize.height);
    g.lineStyle(1.5, 0xff0000, 1);
    g.drawRect(BIRD_POSITION.xMin, BIRD_POSITION.yMin, screen.width, BIRD_POSITION.yMax - BIRD_POSITION.yMin);
    g.endFill();
  }, [pipe.x]);

  return (
    <>
      {DEV_MODE && <Graphics draw={drawPipe} />}
    </>
  );
}
