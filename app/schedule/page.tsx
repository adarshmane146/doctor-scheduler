// // /**
// //  * Schedule Page
// //  *
// //  * Main page for the appointment scheduler.
// //  * This is where candidates will implement the calendar views.
// //  *
// //  * TODO for candidates:
// //  * 1. Import and use the ScheduleView component
// //  * 2. Set up state for selected doctor and date
// //  * 3. Handle view switching (day/week)
// //  */



'use client';

import { useState } from 'react';
import { MOCK_DOCTORS } from '@/data/mockData';
import type { CalendarView } from '@/types';
import { ScheduleView } from '@/components/ScheduleView';
import { motion, AnimatePresence } from 'framer-motion';

export default function SchedulePage() {
  const defaultDoctorId = MOCK_DOCTORS?.[0]?.id ?? '';
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(defaultDoctorId);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <header className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Appointment Schedule
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            View and manage doctor appointments efficiently
          </p>
        </header>

        {/* Animated Schedule View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedDoctorId}-${selectedDate.toDateString()}-${view}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ScheduleView
              selectedDoctorId={selectedDoctorId}
              selectedDate={selectedDate}
              view={view}
              onDoctorChange={setSelectedDoctorId}
              onDateChange={setSelectedDate}
              onViewChange={setView}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
