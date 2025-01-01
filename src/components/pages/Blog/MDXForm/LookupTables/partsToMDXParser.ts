import { lookupTable_PartsToMDX } from "./lookupTablesMDXParts";
import { TAllBlogParts } from "../mdxtypes";

export default function partsToMDXParser(parts: TAllBlogParts[]) {
  let combinedPartsString: string = "";
  parts.forEach((part) => {
    switch (part.type) {
      // Divider Part
      case 999:
        combinedPartsString += lookupTable_PartsToMDX[part.type].replace(
          "$index",
          part.index.toString(),
        );
        break;

      // Hero Part
      case 0:
        combinedPartsString += lookupTable_PartsToMDX[part.type]
          // .replaceAll("$title", part.title)
          .replace("$description", part.description)
          .replace("$title", `title="${part.title}"`)
          // .replace("$description", `description="${part.description}"`)
          .replace("$imageId", `imageId="${part.imageId}"`);
        break;

      // Paragraph Part
      case 1:
        combinedPartsString += lookupTable_PartsToMDX[part.type]
          .replace("$title", part.title)
          .replace("$text", part.text);
        break;

      // Image Part
      case 2:
        combinedPartsString += lookupTable_PartsToMDX[part.type].replace(
          "$imageId",
          `imageId="${part.imageId}"`,
        );
        break;

      // Separator Part
      case 3:
        combinedPartsString += lookupTable_PartsToMDX[part.type];
        break;

      // Video Part
      case 4:
        combinedPartsString += lookupTable_PartsToMDX[part.type].replace(
          "$videoId",
          `videoId="${part.videoId}"`,
        );
        break;

      // Table Part
      case 5:
        combinedPartsString += lookupTable_PartsToMDX[part.type].replace(
          "$tableData",
          `tableData={'${JSON.stringify(part.tableData)}'}`,
        );
        break;

      // Carousel Part
      case 6:
        combinedPartsString += lookupTable_PartsToMDX[part.type]
          .replace("$imageIds", `imageIds={'${JSON.stringify(part.imageIds)}'}`)
          .replace("$loop", part.loop ? `loop` : "")
          .replace("$fade", part.fade ? `fade` : "")
          .replace("$autoScroll", part.autoScroll ? `autoScroll` : "")
          .replace(
            "$autoScrollSpeed",
            part.autoScrollSpeed
              ? `autoScrollSpeed={${part.autoScrollSpeed}}`
              : "",
          );
        break;

      // Gallery Part
      case 7:
        combinedPartsString += lookupTable_PartsToMDX[part.type].replace(
          "$imageIds",
          `imageIds={'${JSON.stringify(part.imageIds)}'}`,
        );
        break;

      // Chart Part
      case 8:
        combinedPartsString += lookupTable_PartsToMDX[part.type]
          .replace(
            "$chartData",
            `chartData={'${JSON.stringify(part.chartData)}'}`,
          )
          .replace(
            "$chartConfig",
            `chartConfig={'${JSON.stringify(part.chartConfig)}'}`,
          )
          .replace("$chartType", `chartType="${part.chartType}"`)
          .replace(
            "$chartTitle",
            part.chartTitle ? `chartTitle="${part.chartTitle}"` : "",
          )
          .replace(
            "$chartDescription",
            part.chartDescription
              ? `chartDescription="${part.chartDescription}"`
              : "",
          );
        break;

      default:
        break;
    }
  });
  return combinedPartsString;
}
