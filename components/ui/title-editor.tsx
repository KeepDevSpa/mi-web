'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Hash } from 'lucide-react';

interface TitleEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function TitleEditor({ content, onChange }: TitleEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[100px] px-3 py-2',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <input 
          type="color"
          onChange={(e) => {
            editor.chain().focus().setColor(e.target.value).run();
          }}
          className="w-8 h-8 p-0 border-0"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
