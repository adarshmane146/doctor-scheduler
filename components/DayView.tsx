'use client';

import React, { useMemo } from 'react';
import { format, parseISO, differenceInMinutes, isSameDay } from 'date-fns';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { APPOINTMENT_TYPE_CONFIG } from '@/types'; // ✅ import config

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

interface Props {
  appointments: Appointment[];
  doctor?: Doctor;
  date: Date;
}

export function DayView({ appointments, doctor, date }: Props) {
  const slots = generateTimeSlots(date);
  const occupiedSlots = useMemo(() => new Set<string>(), []);

  const getAppointmentsForSlot = (slot: TimeSlot) => {
    return appointments.filter((a) => {
      try {
        const start = parseISO(a.startTime);
        return isSameDay(start, slot.start) && start.getTime() === slot.start.getTime();
      } catch {
        return false;
      }
    });
  };

  return (
    <div className="day-view bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <div className="w-full border border-gray-300 rounded-lg">
          {/* Table Header */}
          <div className="grid grid-cols-[8rem_1fr] bg-gray-100 border-b border-gray-300 font-semibold text-gray-700">
            <div className="p-2 text-center border-r border-gray-300">Time</div>
            <div className="p-2 text-center">Appointments</div>
          </div>

          {/* Time Slots */}
          {slots.map((slot) => {
            if (occupiedSlots.has(slot.label)) return null;

            const slotAppointments = getAppointmentsForSlot(slot);

            if (slotAppointments.length === 0) {
              return (
                <div
                  key={slot.label}
                  className="grid grid-cols-[8rem_1fr] border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <div className="p-2 text-right pr-3 text-gray-600 border-r border-gray-200 font-medium">
                    {slot.label}
                  </div>
                  <div className="p-2 text-gray-300 text-xs">&nbsp;</div>
                </div>
              );
            }

            return (
              <div
                key={slot.label}
                className="grid grid-cols-[8rem_1fr] border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Time Column */}
                <div className="p-2 text-right pr-3 text-gray-600 border-r border-gray-200 font-medium">
                  {slot.label}
                </div>

                {/* Appointments Column */}
                <div className="p-2 flex flex-wrap gap-2">
                  {slotAppointments.map((apt) => {
                    const color =
                      APPOINTMENT_TYPE_CONFIG[apt.type]?.color || '#9ca3af'; // ✅ use config
                    const duration = differenceInMinutes(
                      parseISO(apt.endTime),
                      parseISO(apt.startTime)
                    );

                    // Mark multi-slot appointments as occupied
                    if (duration > 30) {
                      const startTime = parseISO(apt.startTime);
                      const spanCount = Math.round(duration / 30);
                      for (let i = 1; i < spanCount; i++) {
                        const next = new Date(startTime.getTime());
                        next.setMinutes(next.getMinutes() + i * 30);
                        occupiedSlots.add(format(next, 'h:mm a'));
                      }
                    }

                    return (
                      <span
                        key={apt.id}
                        title={`${apt.id} — ${apt.type} (${duration} min)`}
                        className="text-white rounded-md px-3 py-1 text-xs font-medium shadow-sm"
                        style={{ backgroundColor: color }} // ✅ inline style with config color
                      >
                        {apt.patientName} — {apt.type} · {duration} min
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {appointments.length === 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          No appointments scheduled for this day.
        </div>
      )}
    </div>
  );
}
