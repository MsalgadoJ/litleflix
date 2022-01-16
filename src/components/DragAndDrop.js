import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {useDropzone} from 'react-dropzone';

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
        <p>Agregá un archivo o arrastralo y soltalo aquí</p>
        {/* <em>(1 files are the maximum number of files you can drop here)</em> */}
      </div>
      {/* <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside> */}
    </section>
  );
}

export default DragAndDrop;