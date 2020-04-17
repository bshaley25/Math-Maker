import React from 'react';
import Grid from './Grid'
import Calculator from './Calculator';

export default function Dashboard({ gridData, updateCell, columns, rows, size }) {

  return (
    <main>
      <Calculator/>
      <Grid 
        gridData={gridData} 
        updateCell={updateCell} 
        columns={columns} 
        rows={rows} 
        size={size}
      />
    </main>
  );
}