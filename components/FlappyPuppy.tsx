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
  
  const { screen } = useStore();
  

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
