'use client'

import React from 'react'
import { Chart } from "react-google-charts";

import { useState } from 'react';
export const data = [
  [
    { type: "string", id: "Position" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  [
    "Time",
    "George Washington",
    new Date(1789, 3, 30),
    new Date(1797, 2, 4),
  ],
  ["Time", "John Adams", new Date(1797, 2, 4), new Date(1801, 2, 4)],
  ["Time", "Thomas Jefferson", new Date(1801, 2, 4), new Date(1809, 2, 4)],
  ["Time", "Thomas Jefferson", new Date(1810, 2, 4), new Date(1819, 2, 4)],
];


export default function page() {
const options = {

  colors: ["#9ecad6",
    "#748DAE",
    "F5CBCB",
    "#FFEAEA"
],
  lineWidth: 4,
  pointSize: 10,
 

};


  return (
      <Chart 
      
      
      options={options}
      chartType="Timeline" data={data} width="" height="400px" />
  )
}
