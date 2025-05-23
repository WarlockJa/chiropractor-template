"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
const H1 = lazy(() => import("./mdx/H1"));
const H2 = lazy(() => import("./mdx/H2"));
const P = lazy(() => import("./mdx/P"));
const A = lazy(() => import("./mdx/A"));
const ImageMDX = lazy(() => import("./mdx/ImageMDX"));
const HR = lazy(() => import("./mdx/HR"));
const Divider = lazy(() => import("./mdx/Divider"));
const EmptyPlug = lazy(() => import("./mdx/EmptyPlug"));
const Video = lazy(() => import("./mdx/Video"));
const TableMDX = lazy(() => import("./mdx/TableMDX"));
const CarouselMDX = lazy(() => import("./mdx/CarouselMDX"));
const Gallery = lazy(() => import("./mdx/Gallery"));
const Blockquote = lazy(() => import("./mdx/Blockquote"));
const Chart = lazy(() => import("./mdx/Chart/Chart"));
import { lazy, useEffect } from "react";
import HeroComponent from "./mdx/HeroComponent";
import { SelectImages } from "@db/schemaImage";
import { useSetAtom } from "jotai";
import { blogImagesAtom } from "./store/jotai";
import BackToBlogsButton from "../BackToBlogsButton";

interface IMDXRemoteWrapperProps {
  editFlag?: boolean;
  props: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  blogImages?: SelectImages[];
}

export default function MDXRemoteWrapper({
  editFlag,
  props,
  blogImages,
}: IMDXRemoteWrapperProps) {
  // list DB records about post images
  const setImages = useSetAtom(blogImagesAtom);
  // loading blog images data into local state on component load
  useEffect(() => {
    blogImages && setImages(blogImages);
  }, []);

  return (
    <article className="prose w-full max-w-screen-lg dark:prose-invert *:mx-auto *:max-w-screen-sm [&>div]:max-w-screen-lg">
      <MDXRemote
        {...props}
        // specifying the custom MDX components
        components={{
          HeroComponent,
          h1: H1,
          h2: H2,
          p: P,
          // @ts-ignore
          a: A,
          ImageMDX,
          hr: HR,
          Video,
          TableMDX,
          CarouselMDX,
          Gallery,
          blockquote: Blockquote,
          Chart,
          Divider: editFlag ? Divider : EmptyPlug,
        }}
      />
    </article>
  );
}
