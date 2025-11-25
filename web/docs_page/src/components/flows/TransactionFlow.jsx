'use client';

import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'User Request' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Validate Request' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Check Balance' },
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    data: { label: 'Process Transaction' },
    position: { x: 400, y: 200 },
  },
  {
    id: '5',
    data: { label: 'Update Ledger' },
    position: { x: 250, y: 300 },
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Transaction Complete' },
    position: { x: 250, y: 400 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', label: 'Valid' },
  { id: 'e2-4', source: '2', target: '4', label: 'Authorized' },
  { id: 'e3-5', source: '3', target: '5', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
  { id: 'e5-6', source: '5', target: '6', animated: true },
];

const TransactionFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TransactionFlow;
