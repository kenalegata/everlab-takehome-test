import { useDropzone } from 'react-dropzone';
import { Container } from './FileUpload.styles';

export const FileUpload = ({ onChange }: any) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: files => onChange(files),
    maxFiles: 1,
    accept: {
      'text/html': ['.oru.txt'],
    }
   });
  
  return (
    <div className="container">
      <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
    </div>
  );
}