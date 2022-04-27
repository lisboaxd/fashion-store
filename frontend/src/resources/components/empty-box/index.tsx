import animationData from "../../../resources/assets/animations/box-open.json";
import AnimationHandler from "../animation-handler";
import { EmptyBoxOptions } from "./interface";
import "./styles.scss";

const EmptyBox: React.FC<EmptyBoxOptions> = ({}) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <div className="text-center align-center">
                <AnimationHandler
                  animationData={animationData}
                  width={310}
                  loop={false}
                />
                <p>Nothing to show here</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyBox;
