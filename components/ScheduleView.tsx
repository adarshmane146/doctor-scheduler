'use client';

import { useMemo } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import type { CalendarView } from '@/types';
import useAppointments from '@/hooks/useAppointments';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';

interface Props {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (id: string) => void;
  onDateChange: (d: Date) => void;
  onViewChange: (v: CalendarView) => void;
}

export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: Props) {
  // Memoize start and end of week for stable references
  const { weekStart, weekEnd } = useMemo(() => {
    const ws = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const we = addDays(ws, 6);
    return { weekStart: ws, weekEnd: we };
  }, [selectedDate]);

  // Fetch appointments using custom hook
  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
    startDate: weekStart,
    endDate: weekEnd,
  });

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
          {doctor ? (
            <p className="text-sm text-gray-600 mt-1">
              {doctor.name} — {doctor.specialty}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Select a doctor to begin</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <DoctorSelector
            selectedDoctorId={selectedDoctorId}
            onDoctorChange={onDoctorChange}
          />

          <input
            type="date"
            className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => onDateChange(new Date(e.target.value))}
          />

          <div className="flex gap-2">
            {(['day', 'week'] as const).map((v) => (
              <button
                key={v}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  view === v
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onViewChange(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px]">
        {loading && (
          <div className="text-center text-gray-500 py-10 animate-pulse">
            Loading appointments...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-10">
            Failed to load appointments.
          </div>
        )}
        {!loading && !error && (
          <>
            {view === 'day' ? (
              <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
            ) : (
              <WeekView appointments={appointments} doctor={doctor} weekStartDate={weekStart} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

