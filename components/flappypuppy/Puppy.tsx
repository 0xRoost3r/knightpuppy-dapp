import React, { useState } from "react";
import { AnimatedSprite, Container, Sprite, useTick } from "@pixi/react";
import { useStore } from "~~/services/store/game";

export function Puppy() {
  const {birdSize,  birdR, birdX, birdY } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // Define your array of images
  const pipeImages = [
    "/images/game/flappypuppy/puppy/puppy1.png",
    "/images/game/flappypuppy/puppy/puppy2.png",
    "/images/game/flappypuppy/puppy/puppy3.png",
    "/images/game/flappypuppy/puppy/puppy4.png"
  ];

  // Use useTick to change the image every 10 milliseconds
  useTick((deltaTime) => {
    const newFrame = frame + 1;
    if (newFrame > 12) {
      setFrame(0);

      if (imageIndex > 3) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
      
    } else {
      setFrame(newFrame)
    }
  });

  return (
    <Container position={[birdX, birdY]}>
      <Sprite anchor={0.5} rotation={birdR} image={pipeImages[imageIndex]} width={birdSize.width} height={birdSize.height}></Sprite>

      {/* <AnimatedSprite
        rotation={birdR}
        width={birdSize.width}
        height={birdSize.height}
        animationSpeed={0.1}
        isPlaying={true}
        loop={true}
        anchor={0.5}
        images={["/images/game/flappypuppy/puppy/puppy1.png", "/images/game/flappypuppy/puppy/puppy2.png", "/images/game/flappypuppy/puppy/puppy3.png", "/images/game/flappypuppy/puppy/puppy4.png"]}
        /> */}
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
