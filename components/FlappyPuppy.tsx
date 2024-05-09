"use client"
import React, {  useEffect, useState } from "react";
import { Stage, Container, Sprite, useTick } from "@pixi/react";
import { useStore } from "~~/services/store/game";
import useWindowDimensions from "~~/hooks/useWindowDimensions";
import { Ground } from "./flappypuppy/Ground";

const RotatingBunny = () => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => delta && setRotation(rotation + 0.05 * delta));

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      anchor={0.5}
      scale={4}
      rotation={rotation}
    />
  );
};

const FlappyPuppy = () => {
  const {setScreen} = useStore()
  const size = useWindowDimensions();
  
  useEffect(() => {
    setScreen(size);
  }, [size.width]);

  return (
    <div>
      <Stage width={size.width} height={size.height}>
        <Ground/>
        <RotatingBunny />
      </Stage>
    </div>
  );
};

export default FlappyPuppy;
