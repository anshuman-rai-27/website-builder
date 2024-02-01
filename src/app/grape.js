'use client'
import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import Draggable from 'react-draggable'; 
import './app.css'

const GrapesJSComponent = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      // ... other GrapesJS configuration options

      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text"><Draggable> Insert your text here</Draggable> </div>',
          },
          {
            id: 'image',
            label: 'Image',
            select: true,
            content: { type: 'image' },
            activate: true,
          },
        ],
      },
    });

    return () => {
      // Cleanup GrapesJS resources if necessary
      editor.destroy();
    };
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <div id="blocks"></div>
      <div id="gjs"></div>
    </div>
  );
};

export default GrapesJSComponent;
