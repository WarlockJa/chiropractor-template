"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  ListsToggle,
  Separator,
  StrikeThroughSupSubToggles,
  UndoRedo,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { ForwardRefEditor } from "./ForwardRefEditor";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function MDXEditor({
  markdown,
  callback,
  showPlugins,
  placeholder = "",
}: {
  markdown?: string;
  callback: (newText: string) => void;
  showPlugins?: boolean;
  placeholder?: string;
}) {
  const theme = useTheme();
  return (
    <ForwardRefEditor
      contentEditableClassName="prose dark:prose-invert"
      markdown={markdown ?? " "}
      onChange={callback}
      className={cn(
        "w-screen-lg rounded border shadow-xl",
        theme.resolvedTheme === "dark" ? "dark-theme" : "",
      )}
      placeholder={placeholder}
      plugins={
        showPlugins
          ? [
              // links
              linkPlugin(),
              linkDialogPlugin(),
              // quotes
              quotePlugin(),
              // lists
              listsPlugin(),
              // toolbar
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <StrikeThroughSupSubToggles />
                    <Separator />
                    <ListsToggle />
                    <BlockTypeSelect />
                    <Separator />
                    <CreateLink />
                  </>
                ),
              }),
            ]
          : undefined
      }
    />
  );
}
