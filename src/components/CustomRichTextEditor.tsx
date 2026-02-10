import { Control, RichTextEditor } from "@/components/ui/rich-text-editor";
import { Box } from "@chakra-ui/react";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { CharacterCount } from "@tiptap/extensions/character-count";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CustomRichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
      CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    content: `<h1>Welcome to Chakra UI + Tiptap!</h1><p>Edit using the toolbar below...</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  });

  if (!editor) return null;

  const charCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />

      <RichTextEditor.Footer justify="flex-end" textStyle="xs">
        <Box fontVariantNumeric="tabular-nums">Characters: {charCount}</Box>
        <Box fontVariantNumeric="tabular-nums">Words: {wordCount}</Box>
      </RichTextEditor.Footer>
    </RichTextEditor.Root>
  );
};

export default CustomRichTextEditor;
