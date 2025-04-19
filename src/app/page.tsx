'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [logs, setLogs] = useState<{ task: string; hours: number }[]>([]);

  const handleAddLog = () => {
    if (!task || !hours || isNaN(Number(hours))) return;
    setLogs([...logs, { task, hours: Number(hours) }]);
    setTask('');
    setHours('');
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center sm:text-left">Hours Logger</h1>

        <div className="w-full flex flex-col gap-4">
          <input
            className="border rounded px-4 py-2 w-full"
            type="text"
            placeholder="Task description"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            className="border rounded px-4 py-2 w-full"
            type="number"
            placeholder="Hours spent"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleAddLog}
          >
            Add Log
          </button>
        </div>

        {logs.length > 0 && (
          <ul className="w-full mt-4 space-y-2">
            {logs.map((log, index) => (
              <li
                key={index}
                className="border px-4 py-2 rounded flex justify-between items-center"
              >
                <span>{log.task}</span>
                <span className="text-sm text-gray-600">{log.hours} hrs</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
