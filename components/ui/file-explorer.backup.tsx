'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, FolderIcon, ImageIcon, ChevronLeft, Upload } from 'lucide-react';
import Image from 'next/image';

interface FileExplorerProps {
  onSelect: (path: string) => void;
  currentImage?: string;
}

export function FileExplorer({ onSelect, currentImage }: FileExplorerProps) {
  const [currentPath, setCurrentPath] = useState('/public');
  const [files, setFiles] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadFiles = async () => {
    try {
      const res = await fetch(`/api/admin/files?path=${encodeURIComponent(currentPath)}`);
      if (!res.ok) throw new Error('Failed to load files');
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [currentPath, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', currentPath);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      // Reload files after upload
      loadFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const isImageFile = (filename: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
  };

  const handleSelect = (file: string) => {
    if (isImageFile(file)) {
      onSelect(file);
      setIsOpen(false);
    }
  };

  const goBack = () => {
    const newPath = currentPath.split('/').slice(0, -1).join('/') || '/public';
    setCurrentPath(newPath);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer group relative">
          {currentImage ? (
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                src={currentImage}
                alt="Selected image"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-sm">Cambiar imagen</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-40 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Seleccionar imagen</p>
              </div>
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[80vw] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Explorador de Archivos</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Navigation bar */}
          <div className="flex items-center space-x-4 p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              disabled={currentPath === '/public'}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input value={currentPath} readOnly className="flex-1" />
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Subir
              </Button>
            </div>
          </div>

          {/* File list */}
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-4 gap-4 p-4">
              {files.map((file) => {
                const isImage = isImageFile(file);
                const fullPath = `${currentPath}/${file}`.replace('/public', '');

                return (
                  <div
                    key={file}
                    onClick={() => isImage ? handleSelect(fullPath) : setCurrentPath(`${currentPath}/${file}`)}
                    className="relative group cursor-pointer rounded-lg overflow-hidden"
                  >
                    {isImage ? (
                      <div className="relative w-full h-40">
                        <Image
                          src={fullPath}
                          alt={file}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Check className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-100 flex flex-col items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <FolderIcon className="h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 text-center break-all px-2">
                          {file}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
