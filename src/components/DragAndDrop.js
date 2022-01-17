import React, {useMemo, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import clip from '../assests/images/clip.png'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 70px',
  borderWidth: 1,
  borderColor: 'var(--white)',
  borderStyle: 'dashed',
  backgroundColor: 'var(--backgroundColor)',
  color: 'var(--white)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor:'pointer',
  marginBottom: '50px'
};

const focusedStyle = {
  borderColor: 'Aqua'
};

const acceptStyle = {
  borderColor: 'Aqua'
};

const rejectStyle = {
  borderColor: '#FF0000'
};



const DragAndDrop = ({onSelectedImgChange, onRejected}) => {

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log('aceptados: ', acceptedFiles)
    console.log('rechazados: ',rejectedFiles)
    onSelectedImgChange(acceptedFiles[0])
    onRejected(rejectedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps, 
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, multiple: false, maxFiles: 1, accept: 'image/*' });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);
  

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className='drag-zone-wrapper'>
        <img src={clip} alt="clip" title="clip"/> <p>AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ</p>
        </div>
      </div>
    </section>
  );
}

export default DragAndDrop;