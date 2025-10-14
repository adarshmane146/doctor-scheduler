// // /**
// //  * ScheduleView Component
// //  *
// //  * Main component that orchestrates the schedule display.
// //  * This component should compose smaller components together.
// //  *
// //  * TODO for candidates:
// //  * 1. Create the component structure (header, controls, calendar)
// //  * 2. Compose DoctorSelector, DayView, WeekView together
// //  * 3. Handle view switching (day vs week)
// //  * 4. Manage state or use the useAppointments hook
// //  * 5. Think about component composition and reusability
// //  */

// // 'use client';

// // import { useState } from 'react';
// // import type { CalendarView } from '@/types';

// // // TODO: Import your components
// // // import { DoctorSelector } from './DoctorSelector';
// // // import { DayView } from './DayView';
// // // import { WeekView } from './WeekView';

// // interface ScheduleViewProps {
// //   selectedDoctorId: string;
// //   selectedDate: Date;
// //   view: CalendarView;
// //   onDoctorChange: (doctorId: string) => void;
// //   onDateChange: (date: Date) => void;
// //   onViewChange: (view: CalendarView) => void;
// // }

// // /**
// //  * ScheduleView Component
// //  *
// //  * This is the main container component for the schedule interface.
// //  *
// //  * TODO: Implement this component
// //  *
// //  * Consider:
// //  * - How to structure the layout (header, controls, calendar)
// //  * - How to compose smaller components
// //  * - How to pass data down to child components
// //  * - How to handle user interactions (view switching, date changes)
// //  */
// // export function ScheduleView({
// //   selectedDoctorId,
// //   selectedDate,
// //   view,
// //   onDoctorChange,
// //   onDateChange,
// //   onViewChange,
// // }: ScheduleViewProps) {
// //   // TODO: Use the useAppointments hook to fetch data
// //   // const { appointments, doctor, loading, error } = useAppointments({
// //   //   doctorId: selectedDoctorId,
// //   //   date: selectedDate,
// //   // });

// //   return (
// //     <div className="bg-white rounded-lg shadow-lg">
// //       {/* TODO: Implement the component structure */}

// //       {/* Header with doctor info and controls */}
// //       <div className="border-b border-gray-200 p-6">
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
// //             <p className="text-sm text-gray-600 mt-1">
// //               TODO: Display doctor name and specialty
// //             </p>
// //           </div>

// //           <div className="flex gap-4">
// //             {/* TODO: Add DoctorSelector component */}
// //             <div className="text-sm text-gray-500">Doctor Selector</div>

// //             {/* TODO: Add date picker */}
// //             <div className="text-sm text-gray-500">Date Picker</div>

// //             {/* TODO: Add view toggle buttons (Day/Week) */}
// //             <div className="flex gap-2">
// //               <button
// //                 className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
// //                 onClick={() => onViewChange('day')}
// //               >
// //                 Day
// //               </button>
// //               <button
// //                 className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded"
// //                 onClick={() => onViewChange('week')}
// //               >
// //                 Week
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Calendar View */}
// //       <div className="p-6">
// //         {/* TODO: Conditionally render DayView or WeekView based on view prop */}
// //         <div className="text-center text-gray-500 py-12">
// //           <p>Calendar View Goes Here</p>
// //           <p className="text-sm mt-2">
// //             Implement DayView and WeekView components and render based on selected view
// //           </p>
// //         </div>

// //         {/* TODO: Uncomment when components are ready */}
// //         {/* {view === 'day' ? (
// //           <DayView
// //             appointments={appointments}
// //             doctor={doctor}
// //             date={selectedDate}
// //           />
// //         ) : (
// //           <WeekView
// //             appointments={appointments}
// //             doctor={doctor}
// //             weekStartDate={getWeekStart(selectedDate)}
// //           />
// //         )} */}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { format, startOfWeek } from 'date-fns';
// import type { CalendarView } from '@/types';
// import { useAppointments } from '@/hooks/useAppointments';
// import { DoctorSelector } from './DoctorSelector';
// import { DayView } from './DayView';
// import { WeekView } from './WeekView';

// interface ScheduleViewProps {
//   selectedDoctorId: string;
//   selectedDate: Date;
//   view: CalendarView;
//   onDoctorChange: (doctorId: string) => void;
//   onDateChange: (date: Date) => void;
//   onViewChange: (view: CalendarView) => void;
// }

// /**
//  * ScheduleView Component
//  *
//  * Main container that composes all schedule-related UI elements.
//  * Handles:
//  *  - Doctor selection
//  *  - Date management
//  *  - View switching (Day/Week)
//  *  - Fetching appointments using useAppointments()
//  */
// export function ScheduleView({
//   selectedDoctorId,
//   selectedDate,
//   view,
//   onDoctorChange,
//   onDateChange,
//   onViewChange,
// }: ScheduleViewProps) {
//   // Fetch appointments using the custom hook
//   const { appointments, doctor, loading, error } = useAppointments({
//     doctorId: selectedDoctorId,
//     date: selectedDate,
//     startDate: startOfWeek(selectedDate, { weekStartsOn: 1 }),
//     endDate: new Date(startOfWeek(selectedDate, { weekStartsOn: 1 }).getTime() + 6 * 24 * 60 * 60 * 1000),
//   });

//   // Helper: Get start of week (Monday)
//   function getWeekStart(date: Date) {
//     return startOfWeek(date, { weekStartsOn: 1 });
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg">
//       {/* Header */}
//       <div className="border-b border-gray-200 p-6">
//         <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
//           {/* Left Section - Title and Doctor Info */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
//             {doctor ? (
//               <p className="text-sm text-gray-600 mt-1">
//                 Dr. {doctor.name} — {doctor.specialty}
//               </p>
//             ) : (
//               <p className="text-sm text-gray-500 mt-1">Select a doctor to view schedule</p>
//             )}
//           </div>

//           {/* Right Section - Controls */}
//           <div className="flex flex-wrap gap-3 items-center">
//             {/* Doctor Selector */}
//             <div className="min-w-[180px]">
//               <DoctorSelector
//                 selectedDoctorId={selectedDoctorId}
//                 onDoctorChange={onDoctorChange}
//               />
//             </div>

//             {/* Date Picker */}
//             <input
//               type="date"
//               className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//               value={format(selectedDate, 'yyyy-MM-dd')}
//               onChange={(e) => onDateChange(new Date(e.target.value))}
//             />

//             {/* View Toggle */}
//             <div className="flex gap-2">
//               <button
//                 className={`px-4 py-2 text-sm rounded transition ${
//                   view === 'day'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => onViewChange('day')}
//               >
//                 Day
//               </button>
//               <button
//                 className={`px-4 py-2 text-sm rounded transition ${
//                   view === 'week'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 onClick={() => onViewChange('week')}
//               >
//                 Week
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div className="p-6 min-h-[400px]">
//         {/* Loading State */}
//         {loading && (
//           <div className="text-center text-gray-500 py-12">Loading appointments...</div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="text-center text-red-500 py-12">
//             Failed to load appointments: {error.message}
//           </div>
//         )}

//         {/* View Rendering */}
//         {!loading && !error && (
//           <>
//             {view === 'day' ? (
//               <DayView
//                 appointments={appointments}
//                 doctor={doctor}
//                 date={selectedDate}
//               />
//             ) : (
//               <WeekView
//                 appointments={appointments}
//                 doctor={doctor}
//                 weekStartDate={getWeekStart(selectedDate)}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// components/ScheduleView.tsx
'use client';

import { format, startOfWeek, addDays } from 'date-fns';
import type { CalendarView } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
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

export function ScheduleView({ selectedDoctorId, selectedDate, view, onDoctorChange, onDateChange, onViewChange }: Props) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = addDays(weekStart, 6);

  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
    startDate: weekStart,
    endDate: weekEnd,
  });

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Doctor Schedule</h2>
          {doctor ? <p className="text-sm text-gray-600">Dr. {doctor.name} — {doctor.specialty}</p> : <p className="text-sm text-gray-500">Select a doctor</p>}
        </div>

        <div className="flex items-center gap-3">
          <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={onDoctorChange} />
          <input type="date" className="border px-2 py-1 rounded" value={format(selectedDate, 'yyyy-MM-dd')} onChange={(e) => onDateChange(new Date(e.target.value))} />
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => onViewChange('day')}>Day</button>
            <button className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => onViewChange('week')}>Week</button>
          </div>
        </div>
      </div>

      <div>
        {loading && <div className="text-center text-gray-500 py-10">Loading appointments...</div>}
        {error && <div className="text-center text-red-500 py-10">Failed to load appointments</div>}
        {!loading && !error && (view === 'day' ? (
          <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
        ) : (
          <WeekView appointments={appointments} doctor={doctor} weekStartDate={weekStart} />
        ))}
      </div>
    </div>
  );
}
