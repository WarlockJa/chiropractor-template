// this function parses MDX blog mdx into pure string of content to be used
// as a value to generate Embedding to store in CF Vectorize

import { TAllBlogParts, TParts } from "../mdxtypes";

export default function convertMDXtoVectorizableString({
  mdx,
}: {
  mdx: TParts;
}): string {
  // return mdx.map((part) => parsePart(part)).flat()[0];
  return mdx.reduce((result, part) => result.concat(parsePart(part)), "\n");
}

const parsePart = (part: TAllBlogParts): string => {
  switch (part.type) {
    // Hero Part
    case 0:
      return `${part.title} - ${part.description} \n \n`;

    // Paragraph Part
    case 1:
      return `${part.title} - ${part.text} \n`;

    // Image Part (ignoring) NOTE: Image aria is populated via queue after the blog update.
    // case 2:
    //   return `${part.alt} = ${part.aria} \n`

    // Separator type (ignoring)
    // case 3:

    // Video part (ignoring)
    // case 4:

    // Table Part
    case 5:
      return part.tableData
        ? `table: ${part.tableData.tableCaption} \n`.concat(
            `${part.tableData.tableHeader.reduce((res, item) => res.concat(`${item.caption} | `), "| ")} \n`,
            part.tableData.tableBody.reduce(
              (rowString, row) =>
                rowString.concat(
                  `${row.reduce(
                    (res, column) => res.concat(`${column} | `),
                    "| ",
                  )} \n`,
                ),
              "",
            ),
            `${part.tableData.tableFooter?.reduce((res, item) => res.concat(`${item} | `), "| ")} \n`,
            "\n",
          )
        : "\n";

    // Carousel Part (ignoring)
    // case 6:

    // Gallery Part (ignoring)
    // case 7:

    // Chart Part
    case 8:
      return `${part.chartType} chart: ${part.chartTitle} - ${part.chartDescription} \n`.concat(
        // part.chartData ? part.chartData.flat().toString() : "",
        part.chartData
          ? part.chartData.reduce(
              (res, row) => res.concat(JSON.stringify(row)),
              "\n",
            )
          : "",
        "\n",
      );

    // Divider (ignoring)
    // case 999:

    default:
      return "";
  }
};
