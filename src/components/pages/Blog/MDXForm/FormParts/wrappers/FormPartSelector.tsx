import { TAllBlogParts } from "../../mdxtypes";
import CarouselMDXPart from "../CarouselMDXPart";
import ChartPart from "../ChartPart";
import GalleryPart from "../GalleryPart";
import HeroPart from "../HeroPart";
import ImagePart from "../ImagePart";
import ParagraphPart from "../ParagraphPart";
import TableMDXPart from "../TableMDXPart";
import VideoPart from "../VideoPart";
import PartWrapper from "./PartWrapper";

export default function FormPartSelector({
  part,
  blogId,
  editFlag,
}: {
  part: TAllBlogParts | undefined;
  blogId: number;
  editFlag: boolean;
}) {
  switch (part?.type) {
    case 0:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <HeroPart blogId={blogId} />
        </PartWrapper>
      );
    case 1:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <ParagraphPart />
        </PartWrapper>
      );
    case 2:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <ImagePart blogId={blogId} />
        </PartWrapper>
      );
    // case 3:
    //   Reserved by Separator
    case 4:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <VideoPart />
        </PartWrapper>
      );
    case 5:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <TableMDXPart />
        </PartWrapper>
      );
    case 6:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <CarouselMDXPart blogId={blogId} />
        </PartWrapper>
      );
    case 7:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <GalleryPart blogId={blogId} />
        </PartWrapper>
      );
    case 8:
      return (
        <PartWrapper props={part} editFlag={editFlag}>
          <ChartPart />
        </PartWrapper>
      );

    default:
      return null;
  }
}
