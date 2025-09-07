import { TitleEditor } from '@/components/ui/title-editor';

export function TitleEditorField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <TitleEditor content={value} onChange={onChange} />
    </div>
  );
}
