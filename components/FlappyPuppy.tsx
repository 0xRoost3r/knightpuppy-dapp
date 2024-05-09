"use client"
import React, {  useState } from "react";
import { Stage, Container, Sprite, useTick } from "@pixi/react";
import useWindowDimensions from "~~/hooks/useWindowDimensions";

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
  const size = useWindowDimensions();
  return (
    <div>
      <Stage width={size.width} height={size.height}>
        <Container position={[size.width/2, 250]}>
          <RotatingBunny />
        </Container>
      </Stage>
    </div>
  );
};

export default FlappyPuppy;
