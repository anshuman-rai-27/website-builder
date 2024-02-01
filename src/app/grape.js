'use client'
import React, { useEffect , useRef} from 'react';
import grapesjs from 'grapesjs';
import Draggable from 'react-draggable'; 
import JSZip from 'jszip';
import './app.css'

const GrapesJSComponent = () => {
    const editorRef = useRef(null);
    // const handleSave = () => {
    //     const savedState = editorRef.current.getHtml(); // You can customize this based on your save requirements
    //     const savedCss = editorRef.current.getCss();
    //     console.log('Saved State:', savedState);
    //     console.log('Saved State:', savedCss);
    //     // Add logic here to save the state (e.g., send it to a server, save it to local storage, etc.)
    //   };
    const handleSave = () => {
        const zip = new JSZip();
    
        // Get HTML content
        const htmlContent = editorRef.current.getHtml();
    
        // Create a folder for the files
        const folder = zip.folder('website');
    
        // Add HTML file
        folder.file('index.html', htmlContent);
    
        // You may need to customize this based on how your CSS is stored in GrapesJS
        // For simplicity, let's assume you have a CSS string that you want to include
        const cssContent = 'body { background-color: #f0f0f0; }';
        folder.file('styles.css', cssContent);
        // Generate the zip file
    zip.generateAsync({ type: 'blob' }).then((content) => {
        // Trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'website.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    };
    
  useEffect(() => {
    
    const editor = grapesjs.init({
      container: '#gjs',
      panels: { defaults: [] },
      
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
    editorRef.current = editor;
    

    return () => {
      // Cleanup GrapesJS resources if necessary
      editor.destroy();
    };
  }, []); // Run this effect only once on component mount

  return (
    <div className='cont'>
      <div id="blocks"></div>
      <button onClick={handleSave} className='save'>Save</button>
      <div id="gjs"></div>
      
    </div>
  );
};

export default GrapesJSComponent;
