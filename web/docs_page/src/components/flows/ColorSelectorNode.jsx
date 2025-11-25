import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
  return (
    <div style={{
      padding: '10px 20px',
      borderRadius: '8px',
      border: '2px solid #555',
      background: '#fff',
      minWidth: '150px'
    }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        Custom Color Picker
      </div>
      <input
        id="text"
        name="text"
        type="color"
        onChange={data.onChange}
        value={data.color}
        style={{ width: '100%', height: '40px', cursor: 'pointer' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: '30%', background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: '70%', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
