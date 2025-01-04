// gathering of different lookup tables used in MDXForm components
// meant to be edited all at once, when component added/changed

import en from "@/../messages/en.json";
import { SelectImages } from "@db/schemaImage";
import { TNonHeroParts, TParts } from "../mdxtypes";

// conversion from TParts object to MDX string
export const lookupTable_PartsToMDX: { [key: number]: string } = {
  999: "<Divider index={$index} />" + "\n",
  0: "<HeroComponent $title $imageId />\n" + "$description\n" + "\n",
  // 0: "<HeroComponent $imageId $title $description />\n" + "\n",
  1: "## $title\n" + "\n" + "$text\n" + "\n",
  2: "<ImageMDX $imageId />\n" + "\n",
  3: "---\n" + "\n",
  4: "<Video $videoId />\n" + "\n",
  5: "<TableMDX $tableData />\n" + "\n",
  6:
    "<CarouselMDX $imageIds $loop $fade $autoScroll $autoScrollSpeed />\n" +
    "\n",
  7: "<Gallery $imageIds />\n" + "\n",
  8:
    "<Chart $chartData $chartConfig $chartType $chartTitle $chartDescription />\n" +
    "\n",
};

// blog parts as objects stored in DB
export const lookupTable_Parts: TNonHeroParts[] = [
  // Divider Part
  { type: 999, index: 0 },
  // Paragraph Part
  { type: 1, text: "", title: "" },
  // Image Part
  {
    type: 2,
    imageId: null,
  },
  // Separator Part
  { type: 3 },
  // Video Part
  { type: 4, videoId: "" },
  // Table Part
  { type: 5, tableData: undefined },
  // Carousel Part
  { type: 6, imageIds: [], autoScrollSpeed: 4 },
  // Gallery Part
  { type: 7, imageIds: [] },
  // Chart Part
  {
    type: 8,
    chartData: undefined,
    chartConfig: undefined,
    chartTitle: "",
    chartDescription: "",
    chartType: "barVertical",
  },
];

// list of Part types that has no editable variables and will be excluded from editing
export const NoEditPartTypes = [3];

// array of part types that uses images
export const PartsWithImages = [0, 2, 6, 7];
// list of blog images used in parts
export const getUsedImagesArray = ({
  parts,
  blogImages,
}: {
  parts: TParts;
  blogImages: SelectImages[];
}): number[] => {
  const resultArray: number[] = [];

  parts.forEach((part) => {
    switch (part.type) {
      // Hero Part
      case 0:
        {
          const foundUsedImage = blogImages.find(
            (img) => img.imageId === part.imageId,
          )?.imageId;
          if (foundUsedImage) {
            resultArray.push(foundUsedImage);
          }
        }
        break;
      // Image Part
      case 2:
        {
          const foundUsedImage = blogImages.find(
            (img) => img.imageId === part.imageId,
          )?.imageId;
          if (foundUsedImage) {
            resultArray.push(foundUsedImage);
          }
        }
        break;
      // Carousel Part
      case 6:
        {
          part.imageIds.forEach((imageId) => {
            const foundUsedImage = blogImages.find(
              (img) => img.imageId === imageId,
            )?.imageId;
            if (foundUsedImage) {
              resultArray.push(foundUsedImage);
            }
          });
        }
        break;
      // Gallery Part
      case 7:
        {
          part.imageIds.forEach((imageId) => {
            const foundUsedImage = blogImages.find(
              (img) => img.imageId === imageId,
            )?.imageId;
            if (foundUsedImage) {
              resultArray.push(foundUsedImage);
            }
          });
        }
        break;

      default:
        break;
    }
  });

  return resultArray;
};

// blog parts data to form a card at insert new part drawer component
export const lookupTable_InsertElements: {
  name: keyof typeof en.Blog.Divider.Items;
  image: string;
  type: number;
}[] = [
  {
    name: "paragraph",
    image: "/imgPartsMDX/paragraph.webp",
    type: 1,
  },
  {
    name: "image",
    image: "/imgPartsMDX/image.webp",
    type: 2,
  },
  {
    name: "separator",
    image: "/imgPartsMDX/separator.webp",
    type: 3,
  },
  {
    name: "video",
    image: "/imgPartsMDX/video.webp",
    type: 4,
  },
  {
    name: "table",
    image: "/imgPartsMDX/table.webp",
    type: 5,
  },
  {
    name: "carousel",
    image: "/imgPartsMDX/carousel.webp",
    type: 6,
  },
  {
    name: "gallery",
    image: "/imgPartsMDX/gallery.webp",
    type: 7,
  },
  {
    name: "chart",
    image: "/imgPartsMDX/chart.webp",
    type: 8,
  },
];
