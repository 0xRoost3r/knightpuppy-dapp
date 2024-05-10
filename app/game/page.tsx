import dynamic from "next/dynamic";

const FlappyPuppy = dynamic(() => import("~~/components/FlappyPuppy"), { ssr: false });

export default function IndexPage() {
    
  return (
    <FlappyPuppy />
  );
}
