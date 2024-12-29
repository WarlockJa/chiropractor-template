import { SelectImages } from "@db/schemaImage";

// client side replacement for imageId from SelectImages interface inferred from images DB model
// It is possible for client images to have imageId null if they are yet to be filled
type TPartImageId = number | null;

// overwriting SelectImages interface imageId with client side on
interface IGenericImageProps extends SelectImages {
  imageId: TPartImageId;
}

// blog parts
interface IParts_Divider {
  type: 999;
  index: number;
}

interface IParts_Hero {
  type: 0;
  title: string;
  description: string;
  imageId: TPartImageId;
}

interface IParts_Paragraph {
  type: 1;
  title: string;
  text: string;
}

interface IParts_Image {
  type: 2;
  imageId: TPartImageId;
}

interface IParts_Separator {
  type: 3;
}

interface IParts_Video {
  type: 4;
  videoId: string;
}

interface ITableStyle {
  fontStyle?: "italic";
  fontWeight?: "bold";
  textDecoration?: "underline line-through" | "underline" | "line-through";
  textAlign: "left" | "center" | "right";
}
interface IParts_TableMDX_TableData {
  tableCaption?: string;
  tableHeader: {
    caption: string;
    style: ITableStyle;
  }[];
  tableBody: string[][];
  tableFooter?: string[];
}
interface IParts_TableMDX {
  type: 5;
  tableData: IParts_TableMDX_TableData | undefined;
}

interface IParts_CarouselMDX {
  type: 6;
  imageIds: TPartImageId[];
  loop?: boolean;
  fade?: boolean;
  autoScroll?: boolean;
  autoScrollSpeed?: number;
}

interface IParts_Gallery {
  type: 7;
  imageIds: TPartImageId[];
}

// making copy of ChartConfig type to not import it
type ChartConfigCopy = {
  [x: string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | {
        color?: string;
        theme?: never;
      }
    | {
        color?: never;
        theme: Record<"light" | "dark", string>;
      }
  );
};

interface IParts_Chart_ChartData<T> {
  [key: string]: T;
}

type TParts_Chart_ChartTypes =
  | "barVertical"
  | "barHorizontal"
  | "area"
  | "pie"
  | "line"
  | "radar"
  | "radial";

interface IParts_Chart<T> {
  type: 8;
  chartData: IParts_Chart_ChartData<T>[] | undefined;
  chartConfig: ChartConfigCopy | undefined;
  chartType: TParts_Chart_ChartTypes;
  chartTitle: string;
  chartDescription: string;
}

type TNonHeroParts =
  | IParts_Divider
  | IParts_Paragraph
  | IParts_Image
  | IParts_Video
  | IParts_Separator
  | IParts_TableMDX
  | IParts_CarouselMDX
  | IParts_Gallery
  | IParts_Chart<T>;
type TAllBlogParts = TNonHeroParts | IParts_Hero;
type TParts = [IParts_Hero, ...TNonHeroParts[]];

type TTableActiveCell =
  | {
      row: number | undefined;
      column: number;
    }
  | undefined;
