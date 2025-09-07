import { FileExplorer } from '@/components/ui/file-explorer';

export function FileExplorerField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <FileExplorer
        currentImage={value}
        onSelect={onChange}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="/ruta-a-la-imagen.webp"
      />
    </div>
  );
}
