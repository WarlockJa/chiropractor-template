import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { blogPartsAtom } from "../store/jotai";
import partsToMDXParser from "../LookupTables/partsToMDXParser";
import remarkGFM from "remark-gfm";

export default function useSerializedParts({
  sliceIndex,
}: {
  sliceIndex: number | undefined;
}) {
  const [parts] = useAtom(blogPartsAtom);

  // storing serialized MDX in two parts for editing purposes
  const [serializedMDX_Part1, setSerializedMDX_Part1] = useState<
    | MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    | undefined
  >();
  const [serializedMDX_Part2, setSerializedMDX_Part2] = useState<
    | MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    | undefined
  >();

  useEffect(() => {
    // dividing MDX into two parts in order to substitute edited part with a JSX component
    // before edited MDX part
    const partsPart1 = partsToMDXParser(parts.slice(0, sliceIndex));
    serialize(partsPart1, {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGFM],
      },
    }).then((result) => {
      setSerializedMDX_Part1(result);
    });

    // after edited MDX part
    if (sliceIndex === undefined) {
      setSerializedMDX_Part2(undefined);
    } else {
      const partsPart2 = partsToMDXParser(parts.slice(sliceIndex + 2));
      serialize(partsPart2, {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGFM],
        },
      }).then((result) => {
        setSerializedMDX_Part2(result);
      });
    }
  }, [
    parts,
    serializedMDX_Part1?.compiledSource,
    serializedMDX_Part2?.compiledSource,
    sliceIndex,
  ]);

  return { serializedMDX_Part1, serializedMDX_Part2 };
}
