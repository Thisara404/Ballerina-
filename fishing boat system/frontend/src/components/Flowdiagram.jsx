import { useState } from 'react';
"use client"; 
import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

const FlowDiagram = () => {
  const [nodes] = useState([
    { id: 'center', type: 'circle', color: 'bg-blue-700', x: '50%', y: '50%' },
    { 
      id: 'top', 
      type: 'square', 
      color: 'bg-yellow-200', 
      x: '50%', 
      y: '1%', // Increased the height of the upper arrow
      card: true, 
      cardTitle: "My Resources", 
      link: '/resources' // Add the link here
    },
    { 
      id: 'right-top', 
      type: 'square', 
      color: 'bg-red-200', 
      x: '75%', 
      y: '30%', 
      card: true, 
      cardTitle: "Market Access", 
      link: '/market' // Add the link here
    },
    { 
      id: 'right-bottom', 
      type: 'square', 
      color: 'bg-blue-200', 
      x: '75%', 
      y: '70%', 
      card: true, 
      cardTitle: "Settings", 
      link: '/settings' // Add the link here
    },
    { 
      id: 'left-top', 
      type: 'square', 
      color: 'bg-green-200', 
      x: '25%', 
      y: '30%', 
      card: true, 
      cardTitle: "Safety Alert", 
      link: '/alerts' // Add the link here
    },
    { 
      id: 'left-bottom', 
      type: 'square', 
      color: 'bg-orange-200', 
      x: '25%', 
      y: '70%', 
      card: true, 
      cardTitle: "My Profile", 
      link: '/profile' // Add the link here
    },
  ]);

  const connections = [
    { from: 'center', to: 'top' },
    { from: 'center', to: 'right-top' },
    { from: 'center', to: 'right-bottom' },
    { from: 'center', to: 'left-top' },
    { from: 'center', to: 'left-bottom' },
  ];

  const Node = ({ type, color, x, y, card, cardTitle, link }) => {
    const commonClasses = "absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 shadow-lg cursor-pointer transition-transform hover:scale-105";
    
    if (card) {
      return (
        <div 
          className={`${commonClasses} ${color} rounded-lg w-40 h-40`} 
          style={{ left: x, top: y }}
        >
          <Card className="w-full h-full">
            <h5 className="font-bold tracking-tight text-gray-900 dark:text-white text-center pt-4">
              {cardTitle}
            </h5>
            <Button 
              outline 
              pill 
              className='hover:bg-blue-500' 
              onClick={() => window.location.href = link} // Redirect on click
            >
              <HiOutlineArrowRight className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      );
    }

    if (type === 'circle') {
      return (
        <div 
          className={`${commonClasses} ${color} rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32`} 
          style={{ left: x, top: y }}
        >
          <p className="text-xl text-white font-bold text-center">My Dashboard</p>
        </div>
      );
    }
    
    return (
      <div 
        className={`${commonClasses} ${color} rounded-lg w-24 h-24`} 
        style={{ left: x, top: y }}
      >
        <p className="text-xl text-white font-bold text-center">My Dashboard</p>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen max-h-[600px] rounded-lg">
      <svg className="absolute w-full h-full pointer-events-none">
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          return (
            <line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#94a3b8"
              strokeWidth="2"
              className="pointer-events-none"
            />
          );
        })}
      </svg>
      
      {nodes.map((node) => (
        <Node
          key={node.id}
          type={node.type}
          color={node.color}
          x={node.x}
          y={node.y}
          card={node.card}
          cardTitle={node.cardTitle}
          link={node.link} // Pass the link prop
        />
      ))}
    </div>
  );
};

export default FlowDiagram;
