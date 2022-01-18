import React, {useMemo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import clip from '../assests/images/clip.png';

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
  borderColor: 'var(--primaryColor)'
};

const acceptStyle = {
  borderColor: 'var(--primaryColor)'
};

const rejectStyle = {
  borderColor: '#FF0000'
};



const DragAndDrop = ({onSelectedImgChange, onRejected}) => {

  const [accepted, setAccepted] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    onSelectedImgChange(acceptedFiles[0]);
    onRejected(rejectedFiles);
    setAccepted(acceptedFiles);
    setRejected(rejectedFiles);
  }, [])

  const renderAccFiles = (files) => {
    let renderFilesMap = files.map((file, i) => {
      return (
        <p key={i}>{file.name}</p>
      )
    })
    return renderFilesMap;
  }

  const renderRecFiles = (files) => {
    let renderFilesMap = files.map((file, i) => {
      return (
        <p key={i}>{file.file.name}</p>
      )
    })
    return renderFilesMap;
  }

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
          
          {accepted.length === 0 && rejected.length === 0 ? 
            (
              <div className='zone-initial-text'>
                <img src={clip} alt="clip" title="clip"/> <p className="desktop-text">AGREGÁ UN ARCHIVO O ARRASTRALO Y SOLTALO AQUÍ</p>
                <p className="mobile-text">AGREGÁ UN ARCHIVO</p>
              </div>
            )
          : null}

          {accepted.length > 0 ? renderAccFiles(accepted) : null}
          {rejected.length > 0 ? renderRecFiles(rejected) : null}

        </div>
      </div>
    </section>
  );
}

export default DragAndDrop;