import React from 'react';
import './globals.css'; 
import Background from '../components/background/background';

export const metadata = {
  title: 'My App',
  description: 'This is my Next.js application',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head className='Layout-body'>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className='Layout-body' style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <Background
          direction="diagonal"
          speed={0.5}
          borderColor="#111"
          squareSize={70}
          hoverFillColor="#001"
        />
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
