import React, { useState } from 'react';
import html2canvas from 'html2canvas'
import '../stylesheets/Modal.scss'

export default () => {
  
  const [open, setOpen] = useState(false);
  const [dataURL, setDataURL] = useState('');

  const showHideClassName = open ? 'modal show' : 'modal hidden';

  const handleOpen = () => {
    setOpen(true);
    html2canvas(document.getElementById('grid'))
    .then(canvas => {
      setDataURL(canvas.toDataURL())
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>Take Picture</button>
      <div className={showHideClassName}>
        <section >
          <img id="image" src={dataURL} alt="MathMaker.png"></img>
              <a href={dataURL} download={"MathMaker.png"}>Click To Download</a>
          <button onClick={handleClose} > click to close</button>
        </section>
      </div>
    </>
  );
}