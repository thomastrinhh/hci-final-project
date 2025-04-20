'use client';

import { useState, useRef } from "react";
import DatePicker from "react-datepicker";  // Import DatePicker correctly
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from react-icons

export default function Home() {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [logs, setLogs] = useState<
    { task: string; hours: number; date: Date; isEditing?: boolean }[]
  >([]);

  const datePickerRef = useRef<DatePicker | null>(null);

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
    setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index)); // Remove the log by index
  };

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Fake Sign In Button */}
      <button className="absolute top-6 right-6 bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
        Sign In
      </button>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          ezLogger
        </h1>

        <div className="w-full flex flex-col gap-4">
          <input
            className="border rounded px-4 py-2 w-full"
            type="text"
            placeholder="Task description"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <div className="flex gap-4">
            <input
              className="border rounded px-4 py-2 w-1/2"
              type="number"
              placeholder="Hours spent"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <div className="w-1/2">
              <DatePicker
                ref={datePickerRef}
                selected={date}
                onChange={(date) => setDate(date)}
                className="border rounded px-4 py-2 w-full cursor-pointer bg-white"
                placeholderText="Select date"
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()}
                onFocus={(e) => e.target.blur()}
                onCalendarOpen={() => datePickerRef.current?.setOpen(true)}  // Using onCalendarOpen instead of onClick
              />
            </div>
          </div>

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
                className="border px-4 py-3 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
              >
                {log.isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:items-center">
                    <input
                      type="text"
                      value={log.task}
                      onChange={(e) =>
                        handleEditChange(index, 'task', e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full sm:w-1/3"
                    />
                    <input
                      type="number"
                      value={log.hours}
                      onChange={(e) =>
                        handleEditChange(index, 'hours', e.target.value)
                      }
                      className="border px-2 py-1 rounded w-full sm:w-1/4"
                    />
                    {/* Fixing DatePicker's Container */}
                    <div className="w-full sm:w-1/3">
                      <DatePicker
                        selected={log.date}
                        onChange={(date) => {
                          if (date) handleEditChange(index, 'date', date);
                        }}                       
                        dateFormat="yyyy-MM-dd"
                        maxDate={new Date()}
                        className="border px-2 py-1 rounded w-full"
                        showPopperArrow={false}
                        readOnly
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">{log.task}</p>
                    <p className="text-sm text-gray-500">
                      {log.date.toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex justify-end mt-2 sm:mt-0">
                  {log.isEditing ? (
                    <button
                      className="text-green-600 font-medium hover:underline"
                      onClick={() => handleEditToggle(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {log.hours} hrs
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-blue-600 font-medium hover:underline"
                          onClick={() => handleEditToggle(index)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteLog(index)} // Trigger delete on click
                        >
                          <FaTrash /> {/* Trash icon */}
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
