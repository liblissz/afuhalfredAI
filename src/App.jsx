import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Realone from './pages/Realone'
import Sample from './pages/Sample'

const App = () => {

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Realone/>}/>
  <Route path='/testing' element={<Sample/>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App






















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Bar,
//   Line,
//   Pie,
//   Doughnut,
//   Radar,
//   PolarArea,
//   Bubble,
//   Scatter,
// } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   RadialLinearScale,
//   Filler,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from "chart.js";

// import ChartDataLabels from "chartjs-plugin-datalabels";
// import "chartjs-adapter-date-fns";

// // Register all core components except datalabels plugin (we'll register datalabels only once for time chart)
// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   RadialLinearScale,
//   Filler,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// // Register datalabels plugin globally (needed for time chart) but we'll enable display only on time chart
// ChartJS.register(ChartDataLabels);

// const App = () => {
//   const [chartData, setChartData] = useState([]);
//   const [label, setLabel] = useState("");
//   const [value, setValue] = useState("");
//   const [date, setDate] = useState(() =>
//     new Date().toISOString().substr(0, 10)
//   );

//   // Fetch data from backend
//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:1000/api/data");
//       setChartData(res.data);
//     } catch (err) {
//       console.error("Error fetching data:", err.message);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Submit new data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newEntry = { label, value: parseInt(value), date };

//     try {
//       const res = await axios.post("http://localhost:1000/api/data", newEntry);
//       setChartData((prev) => [...prev, res.data]);
//       setLabel("");
//       setValue("");
//       setDate(new Date().toISOString().substr(0, 10));
//     } catch (err) {
//       console.error("Error submitting data:", err.message);
//     }
//   };

//   // Base data for most charts (ignores date)
//   const baseData = {
//     labels: chartData.map((item) => item.label),
//     datasets: [
//       {
//         label: "Chart Data",
//         data: chartData.map((item) => item.value),
//         backgroundColor: [
//           "#36A2EB",
//           "#FF6384",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#8A2BE2",
//           "#00CED1",
//           "#FF4500",
//           "#228B22",
//         ],
//         borderColor: "#333",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Bubble chart data
//   const bubbleData = {
//     datasets: chartData.map((item, index) => ({
//       label: item.label,
//       data: [{ x: index * 10, y: item.value, r: item.value / 2 }],
//       backgroundColor: "#36A2EB",
//     })),
//   };

//   // Scatter chart data
//   const scatterData = {
//     datasets: chartData.map((item, index) => ({
//       label: item.label,
//       data: [{ x: index, y: item.value }],
//       backgroundColor: "#FF6384",
//     })),
//   };

//   // Time series data for time chart with labels
//   const timeData = {
//     datasets: [
//       {
//         label: "Tasks Over Time",
//         data: chartData.map((item) => ({
//           x: new Date(item.date),
//           y: item.value,
//           label: item.label, // task name for tooltip and datalabels
//         })),
//         borderColor: "blue",
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         fill: true,
//         tension: 0.3,
//       },
//     ],
//   };

//   // Options for time series chart with datalabels enabled and styled
//   const timeOptions = {
//     responsive: true,
//     scales: {
//       x: {
//         type: "time",
//         time: { unit: "day", tooltipFormat: "PP" },
//         title: { display: true, text: "Date" },
//       },
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: "Value" },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (ctx) => {
//             const label = ctx.raw.label || "";
//             const value = ctx.parsed.y;
//             return `Task: ${label} | Value: ${value}`;
//           },
//         },
//       },
//       datalabels: {
//         display: true,
//         color: "white",
//         font: {
//           weight: "bold",
//           size: 10,
//         },
//         backgroundColor: "rgba(54, 162, 235, 0.8)",
//         borderRadius: 4,
//         padding: 4,
//         anchor: "end",
//         align: "top",
//         formatter: (value) => value.label || "",
//         textAlign: "center",
//         shadowColor: "rgba(0,0,0,0.5)",
//         shadowBlur: 4,
//       },
//     },
//   };

//   // Base options for other charts - datalabels off
//   const baseOptions = {
//     responsive: true,
//     plugins: {
//       datalabels: {
//         display: false, // disable datalabels on other charts
//       },
//     },
//   };

//   return (
//     <div style={{ width: "90%", margin: "auto", padding: 20 }}>
//       <h2>📊 Multi-Chart Dashboard with Time Series</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Label"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           required
//           style={{ marginRight: 10, padding: "5px" }}
//         />
//         <input
//           type="number"
//           placeholder="Value"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           required
//           style={{ marginRight: 10, padding: "5px", width: 100 }}
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//           style={{ marginRight: 10, padding: "5px" }}
//         />
//         <button type="submit" style={{ padding: "5px 15px" }}>
//           Add Data
//         </button>
//       </form>

//       <div
//         className="grid"
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
//           gap: 40,
//           marginTop: 20,
//         }}
//       >
//         <div>
//           <h4>Bar</h4>
//           <Bar data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Horizontal Bar</h4>
//           <Bar data={baseData} options={{ ...baseOptions, indexAxis: "y" }} />
//         </div>

//         <div>
//           <h4>Line</h4>
//           <Line data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Area (Line + fill)</h4>
//           <Line
//             data={{
//               ...baseData,
//               datasets: [
//                 {
//                   ...baseData.datasets[0],
//                   fill: true,
//                   backgroundColor: "rgba(54,162,235,0.2)",
//                 },
//               ],
//             }}
//             options={baseOptions}
//           />
//         </div>

//         <div>
//           <h4>Pie</h4>
//           <Pie data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Doughnut</h4>
//           <Doughnut data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Radar</h4>
//           <Radar data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Polar Area</h4>
//           <PolarArea data={baseData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Bubble</h4>
//           <Bubble data={bubbleData} options={baseOptions} />
//         </div>

//         <div>
//           <h4>Scatter</h4>
//           <Scatter data={scatterData} options={baseOptions} />
//         </div>

//         {/* Time series chart with labels */}
//         <div style={{ gridColumn: "1 / -1" }}>
//           <h4>Time Series (Date) Chart with Task Labels</h4>
//           <Line data={timeData} options={timeOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;




// // import React, { useEffect, useState } from 'react';
// // import io from 'socket.io-client';

// // const socket = io('http://localhost:3000'); // make sure the port matches your server

// // const App = () => {
// //   const [notification, setNotification] = useState([]);

// //   useEffect(() => {
// //     // Request notification permission on load
// //     if (Notification.permission === "default" || Notification.permission === "denied") {
// //       Notification.requestPermission().then((permission) => {
// //         if (permission === "granted") {
// //           alert("Notification permission granted");
// //         } else {
// //           alert("Notification permission denied");
// //         }
// //       });
// //     }

// //     // Socket event listener
// //     socket.on('PushNotification', (data) => {
// //       console.log("📨 Received:", data);

// //       // Show system notification
// //       if (Notification.permission === "granted") {
// //         new Notification('🛎️ New Notification', {
// //           body: data.message,
// //           icon: 'https://via.placeholder.com/50'
// //         });
// //       }

// //       // Update state
// //       setNotification((prev) => [...prev, data]);
// //     });

// //     // Clean up listener on unmount
// //     return () => socket.off('PushNotification');
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Push Notifications</h1>
// //       <ul>
// //         {notification.map((notify, index) => (
// //           <li key={index}>{notify.message}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default App;
