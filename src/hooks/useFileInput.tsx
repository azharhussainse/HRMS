import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useRef,
  useState
} from 'react';

const imageDisplaySize = { width: 200, height: 200 };

export const useFileInput = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [objectURL, setObjectURL] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const manipulateImageSize = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratioWidth = width / imageDisplaySize.width;
      const ratioHeight = height / imageDisplaySize.height;
      let newWidth = width;
      let newHeight = height;

      if (ratioWidth > ratioHeight) {
        newWidth = imageDisplaySize.width;
        newHeight = height / ratioWidth;
      } else {
        newWidth = width / ratioHeight;
        newHeight = imageDisplaySize.height;
      }

      setImageSize(newWidth, newHeight);
    };
  };

  const setImageSize = (width: number, height: number) => {
    const imageContainer = imageContainerRef.current;
    if (imageContainer) {
      imageContainer.style.width = `${width}px`;
      imageContainer.style.height = `${height}px`;
    }
  };

  const resetSelection = () => {
    setSelectedFile(null);
    const imageContainer = imageContainerRef.current;
    if (imageContainer) {
      imageContainer.innerHTML = '';
    }
    if (objectURL) {
      window.URL.revokeObjectURL(objectURL);
      setObjectURL('');
    }
  };

  const handleFiles = (files: FileList | null) => {
    resetSelection();
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.includes('image/')) {
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      return;
    }
    setSelectedFile(file);
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    const objectURL = window.URL.createObjectURL(file);
    manipulateImageSize(objectURL);
    setObjectURL(objectURL);
  };

  const openDialog: MouseEventHandler<HTMLButtonElement> = () => {
    const inputFile = inputFileRef.current;
    if (!inputFile) return;
    inputFile.click();
  };

  const stopDragEvent: DragEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileDialog: ChangeEventHandler<HTMLInputElement> = event => {
    const files = event.currentTarget.files;
    handleFiles(files);
  };

  const handleDroppedFile: DragEventHandler<HTMLDivElement> = event => {
    stopDragEvent(event);
    const dataTransfer = event.dataTransfer;
    const files = dataTransfer.files;
    if (inputFileRef.current) {
      inputFileRef.current.files = files;
    }
    handleFiles(files);
  };

  return {
    handleDroppedFile,
    handleFileDialog,
    imageContainerRef,
    inputFileRef,
    openDialog,
    selectedFile,
    stopDragEvent
  };
};
