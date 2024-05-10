import React from "react";
import { Sprite } from "@pixi/react";
import { useStore } from "~~/services/store/game";

export function Ground() {
    const {screen} = useStore();
    return <Sprite image={"/images/game/flappypuppy/background.png"}
      height={screen.height}
      x={0}
      y={0}>
    </Sprite>;
}
