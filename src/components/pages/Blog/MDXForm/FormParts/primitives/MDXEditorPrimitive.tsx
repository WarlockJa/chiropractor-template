import { Label } from "@/components/ui/label";
import MDXEditor from "../../../MDXEditor/MDXEditor";

interface IMDXEditorPrimitiveProps {
  markdown: string | undefined;
  setMarkdown: (markdown: string) => void;
  labelText: string;
  showPlugins?: boolean;
  placeholder?: string;
}

export default function MDXEditorPrimitive({
  markdown,
  setMarkdown,
  labelText,
  showPlugins,
  placeholder,
}: IMDXEditorPrimitiveProps) {
  return (
    <div className="p-4">
      <Label>{labelText}</Label>
      <MDXEditor
        markdown={markdown}
        callback={setMarkdown}
        showPlugins={showPlugins}
        placeholder={placeholder}
      />
    </div>
  );
}
