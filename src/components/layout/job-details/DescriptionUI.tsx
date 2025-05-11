import parse, { type HTMLReactParserOptions } from "html-react-parser";

interface Props {
  description?: string;
}

export function DescriptionUI({ description }: Props) {
  const options: HTMLReactParserOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    replace: ({ name, children, attribs }: any) => {
      if (name === "p" && (!children || children.length === 0)) {
        return <br />;
      }
      return { name, children, attribs };
    },
  };

  return (
    <div className="w-full overflow-visible border-b-2 border-slate-200 md:border-0 pb-4">
      <div className="relative w-full overflow-visible rounded-xl bg-white">
        <div className="minimal-tiptap-editor tiptap ProseMirror h-full w-full overflow-visible px-0! pb-7">
          <div className="tiptap ProseMirror job-description mt-0! px-0! text-ellipsis overflow-hidden">
            {parse(description?.startsWith('"') ? JSON.parse(description || "") : (description ?? ""), options)}
          </div>
        </div>
      </div>
    </div>
  );
}
