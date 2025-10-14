// // /**
// //  * WeekView Component
// //  *
// //  * Displays appointments for a week (Monday - Sunday) in a grid format.
// //  *
// //  * TODO for candidates:
// //  * 1. Generate a 7-day grid (Monday through Sunday)
// //  * 2. Generate time slots for each day
// //  * 3. Position appointments in the correct day and time
// //  * 4. Make it responsive (may need horizontal scroll on mobile)
// //  * 5. Color-code appointments by type
// //  * 6. Handle overlapping appointments
// //  */

// // 'use client';

// // import type { Appointment, Doctor } from '@/types';

// // interface WeekViewProps {
// //   appointments: Appointment[];
// //   doctor: Doctor | undefined;
// //   weekStartDate: Date; // Should be a Monday
// // }

// // /**
// //  * WeekView Component
// //  *
// //  * Renders a weekly calendar grid with appointments.
// //  *
// //  * TODO: Implement this component
// //  *
// //  * Architecture suggestions:
// //  * 1. Generate an array of 7 dates (Mon-Sun) from weekStartDate
// //  * 2. Generate time slots (same as DayView: 8 AM - 6 PM)
// //  * 3. Create a grid: rows = time slots, columns = days
// //  * 4. Position appointments in the correct cell (day + time)
// //  *
// //  * Consider:
// //  * - How to make the grid scrollable horizontally on mobile?
// //  * - How to show day names and dates in headers?
// //  * - How to handle appointments that span multiple hours?
// //  * - Should you reuse logic from DayView?
// //  */
// // export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
// //   /**
// //    * TODO: Generate array of 7 dates (Monday through Sunday)
// //    *
// //    * Starting from weekStartDate, create an array of the next 7 days
// //    */
// //   function getWeekDays(): Date[] {
// //     // TODO: Implement week days generation
// //     // Example:
// //     // return [
// //     //   new Date(weekStartDate), // Monday
// //     //   addDays(weekStartDate, 1), // Tuesday
// //     //   ...
// //     //   addDays(weekStartDate, 6), // Sunday
// //     // ];
// //     return [];
// //   }

// //   /**
// //    * TODO: Generate time slots (same as DayView)
// //    */
// //   function generateTimeSlots() {
// //     // TODO: Implement (can be same as DayView)
// //     return [];
// //   }

// //   /**
// //    * TODO: Get appointments for a specific day
// //    */
// //   function getAppointmentsForDay(date: Date): Appointment[] {
// //     // TODO: Filter appointments that fall on this specific day
// //     return [];
// //   }

// //   /**
// //    * TODO: Get appointments for a specific day and time slot
// //    */
// //   function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
// //     // TODO: Filter appointments for this day and time
// //     return [];
// //   }

// //   const weekDays = getWeekDays();
// //   const timeSlots = generateTimeSlots();

// //   return (
// //     <div className="week-view">
// //       {/* Week header */}
// //       <div className="mb-4">
// //         <h3 className="text-lg font-semibold text-gray-900">
// //           {/* TODO: Format week range (e.g., "Oct 14 - Oct 20, 2024") */}
// //           Week View
// //         </h3>
// //         {doctor && (
// //           <p className="text-sm text-gray-600">
// //             Dr. {doctor.name} - {doctor.specialty}
// //           </p>
// //         )}
// //       </div>

// //       {/* Week grid - may need horizontal scroll on mobile */}
// //       <div className="border border-gray-200 rounded-lg overflow-x-auto">
// //         {/* TODO: Implement the week grid */}
// //         <div className="text-center text-gray-500 py-12">
// //           <p>Week View Grid Goes Here</p>
// //           <p className="text-sm mt-2">
// //             Implement 7-day grid (Mon-Sun) with time slots
// //           </p>

// //           {/* Placeholder to show appointments exist */}
// //           {appointments.length > 0 && (
// //             <div className="mt-4">
// //               <p className="text-sm font-medium">
// //                 {appointments.length} appointment(s) for this week
// //               </p>
// //             </div>
// //           )}
// //         </div>

// //         {/* TODO: Replace above with actual grid implementation */}
// //         {/* Example structure:
// //         <table className="min-w-full">
// //           <thead>
// //             <tr>
// //               <th className="w-20 p-2 text-xs bg-gray-50">Time</th>
// //               {weekDays.map((day, index) => (
// //                 <th key={index} className="p-2 text-xs bg-gray-50 border-l">
// //                   <div className="font-semibold">{format(day, 'EEE')}</div>
// //                   <div className="text-gray-600">{format(day, 'MMM d')}</div>
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {timeSlots.map((slot, slotIndex) => (
// //               <tr key={slotIndex} className="border-t">
// //                 <td className="p-2 text-xs text-gray-600">{slot.label}</td>
// //                 {weekDays.map((day, dayIndex) => (
// //                   <td key={dayIndex} className="p-1 border-l align-top min-h-[60px]">
// //                     {getAppointmentsForDayAndSlot(day, slot.start).map(apt => (
// //                       <AppointmentCard key={apt.id} appointment={apt} compact />
// //                     ))}
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //         */}
// //       </div>

// //       {/* Empty state */}
// //       {appointments.length === 0 && (
// //         <div className="mt-4 text-center text-gray-500 text-sm">
// //           No appointments scheduled for this week
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // /**
// //  * TODO: Consider reusing the AppointmentCard component from DayView
// //  *
// //  * You might want to add a "compact" prop to make it smaller for week view
// //  */
// 'use client';

// import { format, addDays, isSameDay, parseISO } from 'date-fns';
// import type { Appointment, Doctor, TimeSlot } from '@/types';

// const APPOINTMENT_TYPE_COLORS: Record<string, string> = {
//   Checkup: 'bg-blue-500',
//   Consultation: 'bg-green-500',
//   FollowUp: 'bg-orange-400',
//   Procedure: 'bg-purple-500',
// };

// interface WeekViewProps {
//   appointments: Appointment[];
//   doctor: Doctor | undefined;
//   weekStartDate: Date; // Monday
// }

// /**
//  * Helper: Generate 30-min time slots (8 AM - 6 PM)
//  */
// function generateTimeSlots(date: Date): TimeSlot[] {
//   const slots: TimeSlot[] = [];
//   for (let hour = 8; hour < 18; hour++) {
//     for (const minute of [0, 30]) {
//       const start = new Date(date);
//       start.setHours(hour, minute, 0, 0);
//       const end = new Date(start);
//       end.setMinutes(start.getMinutes() + 30);
//       slots.push({
//         start,
//         end,
//         label: format(start, 'h:mm a'),
//       });
//     }
//   }
//   return slots;
// }

// /**
//  * AppointmentCard — smaller variant for WeekView
//  */
// function AppointmentCard({
//   appointment,
//   compact = false,
// }: {
//   appointment: Appointment;
//   compact?: boolean;
// }) {
//   const color = APPOINTMENT_TYPE_COLORS[appointment.type] || 'bg-gray-400';
//   const startTime = format(parseISO(appointment.startTime), 'h:mm a');
//   const endTime = format(parseISO(appointment.endTime), 'h:mm a');

//   return (
//     <div
//       className={`rounded-lg text-white mb-1 shadow-sm ${color} ${
//         compact ? 'p-1 text-[10px]' : 'p-2 text-xs'
//       }`}
//     >
//       <div className="font-semibold truncate">{appointment.patientName}</div>
//       {!compact && <div>{appointment.type}</div>}
//       <div className="opacity-80">
//         {startTime} - {endTime}
//       </div>
//     </div>
//   );
// }

// /**
//  * WeekView Component
//  */
// export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
//   /**
//    * Generate array of 7 days (Mon–Sun)
//    */
//   function getWeekDays(): Date[] {
//     return Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
//   }

//   /**
//    * Filter appointments that belong to a specific day
//    */
//   function getAppointmentsForDay(date: Date): Appointment[] {
//     return appointments.filter((apt) =>
//       isSameDay(parseISO(apt.startTime), date)
//     );
//   }

//   /**
//    * Filter appointments for a specific day and time slot
//    */
//   function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
//     return appointments.filter((apt) => {
//       const start = parseISO(apt.startTime);
//       return isSameDay(start, date) && start.getHours() === slotStart.getHours() && start.getMinutes() === slotStart.getMinutes();
//     });
//   }

//   const weekDays = getWeekDays();
//   const timeSlots = generateTimeSlots(weekStartDate);

//   return (
//     <div className="week-view w-full">
//       {/* Week Header */}
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold text-gray-900">
//           {format(weekStartDate, 'MMM d')} –{' '}
//           {format(addDays(weekStartDate, 6), 'MMM d, yyyy')}
//         </h3>
//         {doctor && (
//           <p className="text-sm text-gray-600">
//             Dr. {doctor.name} — {doctor.specialty}
//           </p>
//         )}
//       </div>

//       {/* Week Grid */}
//       <div className="border border-gray-200 rounded-lg overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="w-20 p-2 text-xs bg-gray-50 sticky left-0">Time</th>
//               {weekDays.map((day, index) => (
//                 <th
//                   key={index}
//                   className="p-2 text-xs bg-gray-50 border-l min-w-[120px]"
//                 >
//                   <div className="font-semibold">{format(day, 'EEE')}</div>
//                   <div className="text-gray-600">{format(day, 'MMM d')}</div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {timeSlots.map((slot, slotIndex) => (
//               <tr key={slotIndex} className="border-t">
//                 {/* Time Label */}
//                 <td className="p-2 text-xs text-gray-600 sticky left-0 bg-white">
//                   {slot.label}
//                 </td>

//                 {/* Appointments per day */}
//                 {weekDays.map((day, dayIndex) => (
//                   <td
//                     key={dayIndex}
//                     className="p-1 border-l align-top min-h-[60px]"
//                   >
//                     {getAppointmentsForDayAndSlot(day, slot.start).map((apt) => (
//                       <AppointmentCard key={apt.id} appointment={apt} compact />
//                     ))}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Empty State */}
//       {appointments.length === 0 && (
//         <div className="mt-4 text-center text-gray-500 text-sm">
//           No appointments scheduled for this week
//         </div>
//       )}
//     </div>
//   );
// }
// components/WeekView.tsx
'use client';

import { format, addDays, parseISO, isSameDay } from 'date-fns';
import type { Appointment, Doctor, TimeSlot } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  Checkup: 'bg-blue-500',
  Consultation: 'bg-green-500',
  'Follow-up': 'bg-orange-400',
  Procedure: 'bg-purple-500',
};

function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 18; hour++) {
    for (const minute of [0, 30]) {
      const start = new Date(date);
      start.setHours(hour, minute, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);
      slots.push({ start, end, label: format(start, 'h:mm a') });
    }
  }
  return slots;
}

function CompactAppointment({ appointment }: { appointment: Appointment }) {
  const color = TYPE_COLORS[appointment.type] || 'bg-gray-400';
  const start = format(parseISO(appointment.startTime), 'h:mm a');
  return (
    <div className={`rounded px-1 py-0.5 text-white text-xs ${color} truncate`}>
      {appointment.patientName} · {start}
    </div>
  );
}

interface Props {
  appointments: Appointment[];
  doctor?: Doctor;
  weekStartDate: Date;
}

export function WeekView({ appointments, doctor, weekStartDate }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
  const timeSlots = generateTimeSlots(weekStartDate);

  function getAppointmentsForDayAndSlot(day: Date, slotStart: Date) {
    return appointments.filter((a) => {
      try {
        const s = parseISO(a.startTime);
        return isSameDay(s, day) && s.getHours() === slotStart.getHours() && s.getMinutes() === slotStart.getMinutes();
      } catch {
        return false;
      }
    });
  }

  return (
    <div className="week-view">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{format(weekStartDate, 'MMM d')} – {format(addDays(weekStartDate, 6), 'MMM d, yyyy')}</h3>
        {doctor && <p className="text-sm text-gray-600">Dr. {doctor.name} — {doctor.specialty}</p>}
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 w-20 p-2 text-xs border">Time</th>
              {days.map((d, i) => (
                <th key={i} className="p-2 text-xs border text-center min-w-[120px]">
                  <div className="font-semibold">{format(d, 'EEE')}</div>
                  <div className="text-gray-600 text-[12px]">{format(d, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((slot, sIdx) => (
              <tr key={sIdx} className="border-t">
                <td className="p-2 text-xs text-gray-600 align-top sticky left-0 bg-white">{slot.label}</td>
                {days.map((day, dIdx) => (
                  <td key={dIdx} className="p-2 align-top border-l min-h-[56px]">
                    {getAppointmentsForDayAndSlot(day, slot.start).map((apt) => (
                      <CompactAppointment key={apt.id} appointment={apt} />
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && <div className="mt-4 text-sm text-gray-500">No appointments scheduled for this week.</div>}
    </div>
  );
}
