import { AnimationOptions } from "./types";
import Lottie, { Options } from "react-lottie";

const AnimationHandler: React.FC<AnimationOptions> = ({
  animationData,
  height,
  width,
  isStopped,
  isPaused,
  loop,
}) => {
  /**
   * @var Options
   */
  const defaultOptions: Options = {
    loop: loop ?? true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        isStopped={isStopped}
        isPaused={isPaused}
      />
    </>
  );
};

export default AnimationHandler;
