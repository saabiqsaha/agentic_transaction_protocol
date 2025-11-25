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
  MarkerType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Agent A' },
    position: { x: 0, y: 150 },
    style: { background: '#6ede87', color: 'white', border: '2px solid #4caf50' },
  },
  {
    id: '2',
    data: { label: 'Protocol Layer' },
    position: { x: 250, y: 150 },
    style: { background: '#6865A5', color: 'white' },
  },
  {
    id: '3',
    data: { label: 'Authentication' },
    position: { x: 250, y: 50 },
    style: { background: '#ff6b6b', color: 'white' },
  },
  {
    id: '4',
    data: { label: 'Message Queue' },
    position: { x: 250, y: 250 },
    style: { background: '#4ecdc4', color: 'white' },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Agent B' },
    position: { x: 500, y: 150 },
    style: { background: '#6ede87', color: 'white', border: '2px solid #4caf50' },
  },
  {
    id: '6',
    data: { label: 'Transaction Log' },
    position: { x: 500, y: 50 },
    style: { background: '#ffd93d', color: 'black' },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: 'Send Message',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    label: 'Verify',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    label: 'Queue',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    label: 'Deliver',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    animated: true,
    style: { stroke: '#4caf50', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#4caf50' },
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    label: 'Log',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const AgentCommunicationFlow = () => {
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
        <Background color="#aaa" gap={16} />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default AgentCommunicationFlow;
