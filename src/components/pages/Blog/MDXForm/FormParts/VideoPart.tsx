import { IParts_Video } from "../mdxtypes";
import PartHeader from "./primitives/PartHeader";
import VideoPrimitive from "./primitives/VideoPrimitive";
import { usePartWrapperContext } from "./wrappers/PartWrapper";

interface IVideoPartFormValues extends IFormValues {
  originalState: IParts_Video;
  currentValues: IParts_Video;
}

export default function VideoPart() {
  // FormPartSelector which calls this component, ensures type correctness.
  // Asserting the correct type for local TS functionality
  const { formValues, setFormValues } = usePartWrapperContext() as {
    formValues: IVideoPartFormValues;
    setFormValues: React.Dispatch<React.SetStateAction<IVideoPartFormValues>>;
  };

  // not using this type validation to preserve a single origin of truth for the type field located in mdxtypes.d.ts
  // if(formValues.type !== 0)
  return (
    <>
      <PartHeader partName="Video Part" />
      <VideoPrimitive
        setVideoId={(videoId) =>
          setFormValues((prev) => ({
            ...prev,
            currentValues: { ...prev.currentValues, videoId },
            isOkToSave: prev.originalState.videoId !== videoId,
          }))
        }
        labelText="Youtube video id"
        placeholderText="Enter youtube video url"
        videoId={formValues.currentValues.videoId}
      />
    </>
  );
}
