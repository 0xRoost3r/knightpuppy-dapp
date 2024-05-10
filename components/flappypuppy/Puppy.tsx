import React, { useState } from "react";
import { AnimatedSprite, Container, Sprite, useTick } from "@pixi/react";
import { useStore } from "~~/services/store/game";

export function Puppy() {
  const {birdSize,  birdR, birdX, birdY } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [frame, setFrame] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // Define your array of images
  const barkley = [
    "/images/game/flappypuppy/puppy/puppy1.png",
    "/images/game/flappypuppy/puppy/puppy2.png",
    "/images/game/flappypuppy/puppy/puppy3.png",
    "/images/game/flappypuppy/puppy/puppy4.png"
  ];

  const cape = [
    "/images/game/flappypuppy/puppy/cloth/cloth11.png", 
    "/images/game/flappypuppy/puppy/cloth/cloth12.png", 
    "/images/game/flappypuppy/puppy/cloth/cloth13.png", 
    "/images/game/flappypuppy/puppy/cloth/cloth14.png"
  ]

  const star = [
    "/images/game/flappypuppy/puppy/star/star1.png", 
    "/images/game/flappypuppy/puppy/star/star2.png", 
    "/images/game/flappypuppy/puppy/star/star3.png", 
    "/images/game/flappypuppy/puppy/star/star4.png"
  ]


  const helmet = [
    "/images/game/flappypuppy/puppy/helmet/helmet11.png", 
    "/images/game/flappypuppy/puppy/helmet/helmet12.png", 
    "/images/game/flappypuppy/puppy/helmet/helmet13.png", 
    "/images/game/flappypuppy/puppy/helmet/helmet14.png"
  ]

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
      <Sprite anchor={0.5} rotation={birdR} image={barkley[imageIndex]} width={birdSize.width} height={birdSize.height}></Sprite>
      <Sprite anchor={0.5} rotation={birdR} image={cape[imageIndex]} width={birdSize.width} height={birdSize.height}></Sprite>
      <Sprite anchor={0.5} rotation={birdR} image={star[imageIndex]} width={birdSize.width} height={birdSize.height}></Sprite>
      <Sprite anchor={0.5} rotation={birdR} image={helmet[imageIndex]} width={birdSize.width} height={birdSize.height}></Sprite>
    </Container>
    );
}
