// function checks for errors and returns a corresponding boolean
// error descriptions are saved to a state to be used in chart table
// boolean response is used to define formValues.isOkToSave
export default function checkForChartHeaderErrors({
  chartDataCaptions,
  setErrors,
  collisionPrefix,
}: {
  chartDataCaptions: string[];
  setErrors: (
    newErrors: (
      prev: (string | undefined)[][] | null,
    ) => (string | undefined)[][] | (string | undefined)[][],
  ) => void;
  collisionPrefix: string;
}): boolean {
  let isOkToSave = true;
  chartDataCaptions.forEach((caption, index) => {
    // checking for duplicates
    if (caption.includes(collisionPrefix)) {
      setErrors((prev) =>
        prev
          ? [
              prev[0].map((val, errorIndex) =>
                errorIndex === index
                  ? "Field with this name already in use"
                  : val,
              ),
              ...prev.slice(1),
            ]
          : [],
      );
      isOkToSave = false;
      return;
    }

    // checking for empty strings
    if (caption === "") {
      setErrors((prev) =>
        prev
          ? [
              prev[0].map((val, errorIndex) =>
                errorIndex === index
                  ? "Field value cannot be an ampty string"
                  : val,
              ),
              ...prev.slice(1),
            ]
          : [],
      );
      isOkToSave = false;
      return;
    }

    // resetting errors
    setErrors((prev) =>
      prev
        ? [
            prev[0].map((val, errorIndex) =>
              errorIndex === index ? undefined : val,
            ),
            ...prev.slice(1),
          ]
        : [],
    );
  });

  return isOkToSave;
}
