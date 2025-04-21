'use client';

import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  // State declarations
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [logs, setLogs] = useState<
    { task: string; hours: number; date: Date; isEditing?: boolean }[]
  >([]);

  const datePickerRef = useRef<DatePicker | null>(null);

  // Handlers
  const handleAddLog = () => {
    if (!task || !hours || !date || isNaN(Number(hours))) return;
    setLogs([
      ...logs,
      { task, hours: Number(hours), date, isEditing: false },
    ]);
    setTask('');
    setHours('');
    setDate(null);
  };

  const handleEditToggle = (index: number) => {
    setLogs((prevLogs) =>
      prevLogs.map((log, i) =>
        i === index ? { ...log, isEditing: !log.isEditing } : log
      )
    );
  };

  const handleEditChange = (
    index: number,
    field: 'task' | 'hours' | 'date',
    value: string | Date
  ) => {
    setLogs((prevLogs) =>
      prevLogs.map((log, i) =>
        i === index
          ? {
              ...log,
              [field]: field === 'hours' ? Number(value) : value,
            }
          : log
      )
    );
  };

  const handleDeleteLog = (index: number) => {
    setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
  };

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Theme Toggle and Sign In Button */}
      <div className="absolute top-6 right-6 flex gap-4">
        <ThemeToggle />
        <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-800 dark:text-gray-200">
          Sign In
        </button>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center sm:text-left text-gray-900 dark:text-white">
          ezLogger
        </h1>

        <div className="w-full flex flex-col gap-4">
          <input
            className="border dark:border-gray-600 rounded px-4 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            type="text"
            placeholder="Task description"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <div className="flex gap-4">
            <input
              className="border dark:border-gray-600 rounded px-4 py-2 w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              type="number"
              placeholder="Hours spent"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <div className="w-1/2 relative">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="border dark:border-gray-600 rounded px-4 py-2 w-full cursor-pointer bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholderText="Select date"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                calendarClassName="!absolute !mt-2"
                popperClassName="!absolute !z-50"
                popperPlacement="bottom-start"
                showPopperArrow={false}
              />
            </div>
          </div>

          <button
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
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
                className="border dark:border-gray-700 px-4 py-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 bg-white dark:bg-gray-800"
              >
                {log.isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <input
                      type="text"
                      value={log.task}
                      onChange={(e) =>
                        handleEditChange(index, 'task', e.target.value)
                      }
                      className="border dark:border-gray-600 px-2 py-1 rounded w-full sm:w-1/3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="number"
                      value={log.hours}
                      onChange={(e) =>
                        handleEditChange(index, 'hours', e.target.value)
                      }
                      className="border dark:border-gray-600 px-2 py-1 rounded w-full sm:w-1/4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <div className="w-full sm:w-1/3 relative">
                      <DatePicker
                        selected={log.date}
                        onChange={(date) => {
                          if (date) handleEditChange(index, 'date', date);
                        }}
                        className="border dark:border-gray-600 px-2 py-1 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                        calendarClassName="!absolute !mt-2"
                        popperClassName="!absolute !z-50"
                        popperPlacement="bottom-start"
                        showPopperArrow={false}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{log.task}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {log.date.toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex justify-end mt-2 sm:mt-0">
                  {log.isEditing ? (
                    <button
                      className="text-green-600 dark:text-green-400 font-medium hover:underline"
                      onClick={() => handleEditToggle(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {log.hours} hrs
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                          onClick={() => handleEditToggle(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          onClick={() => handleDeleteLog(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}