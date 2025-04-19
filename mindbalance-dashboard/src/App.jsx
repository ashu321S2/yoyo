import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const screenTimeData = [
  { day: "Mon", time: 3 },
  { day: "Tue", time: 4.5 },
  { day: "Wed", time: 5 },
  { day: "Thu", time: 4 },
  { day: "Fri", time: 6 },
  { day: "Sat", time: 7 },
  { day: "Sun", time: 2 }
];

const categoryData = [
  { name: "Social Media", value: 10 },
  { name: "Productivity", value: 5 },
  { name: "Entertainment", value: 8 },
  { name: "Education", value: 4 }
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

function App() {
  const [screenTime, setScreenTime] = useState(0);
  const [goal, setGoal] = useState(5); // in hours

  useEffect(() => {
    const total = screenTimeData.reduce((sum, d) => sum + d.time, 0);
    setScreenTime(total / 7);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Weekly Screen Time (hrs)</h2>
        <BarChart width={300} height={200} data={screenTimeData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
        <PieChart width={300} height={200}>
          <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 col-span-1 md:col-span-2 text-center">
        <h2 className="text-xl font-bold mb-2">Daily Average vs. Goal</h2>
        <p className="text-lg">You average <strong>{screenTime.toFixed(1)}</strong> hrs/day</p>
        <p className="text-sm text-gray-500">Goal: {goal} hrs/day</p>
        {screenTime > goal ? (
          <p className="text-red-600 mt-2">⚠️ You’re exceeding your goal! Try reducing screen time.</p>
        ) : (
          <p className="text-green-600 mt-2">✅ Great job! You're within your screen time goal.</p>
        )}
        <button
          onClick={() => alert("🎯 Focus mode activated!")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Activate Focus Mode
        </button>
      </div>
    </div>
  );
}

export default App;
