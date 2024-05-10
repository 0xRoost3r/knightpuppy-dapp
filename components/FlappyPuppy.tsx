"use client"
import React, {  useEffect, useState } from "react";
import { Stage, Container, Sprite, useTick, AnimatedSprite, useApp } from "@pixi/react";
import { useStore } from "~~/services/store/game";
import useWindowDimensions from "~~/hooks/useWindowDimensions";
import { Ground } from "./flappypuppy/Ground";
import { Puppy } from "./flappypuppy/Puppy";
import { Pipe } from "./flappypuppy/Pipe";
import { SIZE, THRUST } from "~~/constant/flappypuppy";
import { Loop } from "./flappypuppy/Loop";

const FlappyPuppy = () => {
  
  const size = useWindowDimensions();
  
  const {updateGameStart, playerAccount, sound, setScale,  setBirdSize, setPipeSize,  setGap,  speed, changeSpeed,  initGame, gameState, setScreen, screen, setInitGame, updateGameState } = useStore()
  
  function updateScreen() {
     // Cal new object scale and position
    setScreen(size);
    const newScale = window.innerHeight / SIZE.H;
    setBirdSize({ width: SIZE.bird.w * newScale, height: SIZE.bird.h * newScale});
    setPipeSize({ width: SIZE.pipeTop.w * newScale, height: SIZE.pipeTop.h * newScale});
    setScale(newScale);
    setGap(SIZE.GAP * newScale);
  }

  useEffect(() => {
    const handleResize = () => {
      // console.log(`resize`)
      setScreen(size);
    } 
    window.addEventListener('resize', handleResize);
    if (screen.width !== size.width || screen.height !== size.height) {
      updateScreen();
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    const handleSpace = (event: { key: string; }) => {
      if (event.key === ' ') {
        if (!playerAccount) {
          updateGameStart();
          // navigate("/");
        } else {
          // console.log(`birdCash `, birdCash, `initGame ` ,initGame )
          if (initGame && gameState) {
            // console.log(`Fly`)
            sound.play('fly');
            // console.log(`Speed`, speed)
            changeSpeed(speed - THRUST);
          }
          if (!initGame) {
            // console.log(`Init game`)
            setInitGame();
            updateGameState(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => {
      window.removeEventListener('keydown', handleSpace);
    };
  }, [initGame, gameState]);
  

  return (
    <div>
      <Stage width={screen.width} height={screen.height} options={{ autoDensity:true }}>
        <Ground/>
        <Pipe />
        <Puppy/>
        <Loop/>
        {/* <JetFighter/> */}
      </Stage>
    </div>
  );
};

export default FlappyPuppy;
