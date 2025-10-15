'use client';

import { format, addDays, parseISO, isSameDay } from 'date-fns';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { APPOINTMENT_TYPE_CONFIG } from '@/types'; // ✅ import colors from config

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
  // Use color from APPOINTMENT_TYPE_CONFIG
  const colorHex = APPOINTMENT_TYPE_CONFIG[appointment.type]?.color || '#9CA3AF'; // fallback gray
  // Convert hex to Tailwind-like bg color using inline style
  const style = { backgroundColor: colorHex };

  const start = format(parseISO(appointment.startTime), 'h:mm a');

  return (
    <div
      className="rounded-full px-2 py-1 text-white text-xs font-medium mb-1 truncate shadow-sm"
      style={style}
      title={`${appointment.type} at ${start}`}
    >
      {appointment.type} — {start}
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

  const getAppointmentsForDayAndSlot = (day: Date, slotStart: Date) =>
    appointments.filter((a) => {
      try {
        const s = parseISO(a.startTime);
        return (
          isSameDay(s, day) &&
          s.getHours() === slotStart.getHours() &&
          s.getMinutes() === slotStart.getMinutes()
        );
      } catch {
        return false;
      }
    });

  return (
    <div className="week-view bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {format(weekStartDate, 'MMM d')} – {format(addDays(weekStartDate, 6), 'MMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="sticky left-0 bg-gray-100 w-20 p-2 text-xs font-semibold border-r border-gray-300 text-right">
                Time
              </th>
              {days.map((d, i) => (
                <th
                  key={i}
                  className="p-2 text-xs font-semibold border-b border-gray-300 text-center min-w-[120px]"
                >
                  <div>{format(d, 'EEE')}</div>
                  <div className="text-gray-500 text-[12px]">{format(d, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timeSlots.map((slot, sIdx) => (
              <tr key={sIdx} className="border-t hover:bg-gray-50 transition">
                {/* Time column */}
                <td className="p-2 text-xs text-gray-500 align-top sticky left-0 bg-white text-right pr-3 border-r border-gray-200">
                  {slot.label}
                </td>

                {/* Appointment cells */}
                {days.map((day, dIdx) => (
                  <td
                    key={dIdx}
                    className="p-2 align-top border-l border-gray-100 min-h-[56px]"
                  >
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

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          No appointments scheduled for this week.
        </div>
      )}
    </div>
  );
}
