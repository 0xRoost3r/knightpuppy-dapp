import React from "react";
import { Container, Sprite } from "@pixi/react";
import { useStore } from "~~/services/store/game";

export function Pipe() {
  const { pipe, gap, pipeSize } = useStore();

  return (
    <Container position={[pipe.x, pipe.y]}>
      <Sprite image={"/images/game/flappypuppy/toppipe.png"} width={pipeSize.width} height={pipeSize.height}  x={0} y={gap - pipeSize.height}></Sprite>
      <Sprite image={"/images/game/flappypuppy/botpipe.png"} width={pipeSize.width} height={pipeSize.height}  x={0}  y={gap * 2}></Sprite>
    </Container>
  );
}
