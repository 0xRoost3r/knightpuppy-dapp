import React from "react";
import { AnimatedSprite, Container } from "@pixi/react";
import { useStore } from "~~/services/store/game";

export function Puppy() {
  const {birdSize,  birdR, birdX, birdY } = useStore();

  return (
    <Container position={[birdX, birdY]}>
      <AnimatedSprite
        rotation={birdR}
        width={birdSize.width}
        height={birdSize.height}
        animationSpeed={0.1}
        isPlaying={true}
        loop={true}
        anchor={0.5}
        images={["/images/game/flappypuppy/puppy/puppy1.png", "/images/game/flappypuppy/puppy/puppy2.png", "/images/game/flappypuppy/puppy/puppy3.png", "/images/game/flappypuppy/puppy/puppy4.png"]}
        />
        {/* <AnimatedSprite
        width={birdSize.width}
        height={birdSize.height}
        rotation={birdR}
        anchor={0.5}
        images={["/images/game/flappypuppy/puppy/cloth/cloth11.png", "/images/game/flappypuppy/puppy/cloth/cloth12.png", "/images/game/flappypuppy/puppy/cloth/cloth13.png", "/images/game/flappypuppy/puppy/cloth/cloth14.png"]}
        initialFrame={0}
        animationSpeed={0.1} 
        isPlaying={true} 
        />
        <AnimatedSprite
        width={birdSize.width}
        height={birdSize.height}
        rotation={birdR}
        anchor={0.5}
        images={["/images/game/flappypuppy/puppy/star/star1.png", "/images/game/flappypuppy/puppy/star/star2.png", "/images/game/flappypuppy/puppy/star/star3.png", "/images/game/flappypuppy/puppy/star/star4.png"]}
        initialFrame={0}
        animationSpeed={0.1} 
        isPlaying={true}
         /> */}
    </Container>
    );
}
