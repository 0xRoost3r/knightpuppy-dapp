"use client"
import React, {  useEffect, useState } from "react";
import { Stage, Container, Sprite, useTick, AnimatedSprite, useApp } from "@pixi/react";
import { HeartIcon, BoltIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BoltIcon as BoltIconSolid } from "@heroicons/react/24/solid";
import { useStore } from "~~/services/store/game";
import useWindowDimensions from "~~/hooks/useWindowDimensions";
import { Ground } from "./flappypuppy/Ground";
import { Puppy } from "./flappypuppy/Puppy";
import { Pipe } from "./flappypuppy/Pipe";
import { SIZE, THRUST } from "~~/constant/flappypuppy";
import { Loop } from "./flappypuppy/Loop";

const FlappyPuppy = () => {
  
  const size = useWindowDimensions();
  
  const {updateGameStart, playerAccount, score , sound, setScale,  setBirdSize, setPipeSize,  setGap,  speed, changeSpeed,  initGame, gameState, setScreen, screen, setInitGame, updateGameState } = useStore()
  
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
    <div className="shadow-2xl">
      <div className="ml-2 mt-2 absolute top-0 left-0 ">
        <div className="flex badge">
          Heath: <HeartIconSolid width={15} /> <HeartIconSolid width={15} /> <HeartIconSolid width={15} />
        </div>
        <div className="flex badge mt-1">
          Mana: <BoltIconSolid width={15} /> <BoltIconSolid width={15} /> <BoltIcon width={15} />
        </div>
      </div>
      <div className="mr-2 mt-2 absolute top-0 right-0">
        <div dir="rtl">
        <div className="flex badge">
            Rank #1
          </div>
          <div className="flex badge mt-1">
            Total Point: 12,214
          </div>
          <div className="flex badge mt-1">
            Point: {score}
          </div>
        </div>
      </div>
      <Stage width={screen.width} height={screen.height} options={{ autoDensity:true }}>
        <Ground/>
        <Pipe />
        <Puppy/>
        <Loop/>
      </Stage>
    </div>
  );
};

export default FlappyPuppy;
