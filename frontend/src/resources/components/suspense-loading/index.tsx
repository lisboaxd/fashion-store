import animationData from "../../../resources/assets/animations/drone-flying.json";
import { SuspenseLoadingOptions } from "./types";
import AnimationHandler from "../animation-handler";

const SuspenseLoading: React.FC<SuspenseLoadingOptions> = () => {
  return (
    <>
      <div className="centralize relative flex flex-col min-w-0 break-words w-full mb-6">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="text-center align-center">
                <AnimationHandler animationData={animationData} width={310} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuspenseLoading;
