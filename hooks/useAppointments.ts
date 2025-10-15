// // /**
// //  * useAppointments Hook
// //  *
// //  * This is a custom hook that encapsulates the business logic for fetching
// //  * and managing appointments. This is the "headless" pattern - separating
// //  * logic from presentation.
// //  *
// //  * TODO for candidates:
// //  * 1. Implement the hook to fetch appointments based on filters
// //  * 2. Add loading and error states
// //  * 3. Consider memoization for performance
// //  * 4. Think about how to make this reusable for both day and week views
// //  */

// }
'use client';

import { useState, useEffect } from 'react';
import { appointmentService } from '@/services/appointmentService';
import type { Appointment, Doctor } from '@/types';

interface UseAppointmentsParams {
  doctorId: string;
  date: Date;
  startDate: Date;
  endDate: Date;
}

interface UseAppointmentsResult {
  appointments: Appointment[];
  doctor?: Doctor;
  loading: boolean;
  error?: string;
}

export default function useAppointments({
  doctorId,
  date,
  startDate,
  endDate,
}: UseAppointmentsParams): UseAppointmentsResult {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctor, setDoctor] = useState<Doctor | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!doctorId) {
      setAppointments([]);
      setDoctor(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const fetchedDoctor = appointmentService.getDoctorById(doctorId);
      const fetchedAppointments = appointmentService.getAppointmentsByDoctorAndDateRange(
        doctorId,
        startDate,
        endDate
      );

      setDoctor(fetchedDoctor);
      setAppointments(appointmentService.sortAppointmentsByTime(fetchedAppointments));
      setError(undefined);
    } catch (err) {
      setError('Failed to fetch appointments.');
      setAppointments([]);
      setDoctor(undefined);
    } finally {
      setLoading(false);
    }
  }, [doctorId, date, startDate, endDate]);

  return { appointments, doctor, loading, error };
}
