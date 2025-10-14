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

// // import { useState, useEffect, useMemo } from 'react';
// // import type { Appointment, Doctor } from '@/types';
// // import { appointmentService } from '@/services/appointmentService';

// // /**
// //  * Hook parameters
// //  */
// // interface UseAppointmentsParams {
// //   doctorId: string;
// //   date: Date;
// //   // For week view, you might want to pass a date range instead
// //   startDate?: Date;
// //   endDate?: Date;
// // }

// // /**
// //  * Hook return value
// //  */
// // interface UseAppointmentsReturn {
// //   appointments: Appointment[];
// //   doctor: Doctor | undefined;
// //   loading: boolean;
// //   error: Error | null;
// //   // Add any other useful data or functions
// // }

// // /**
// //  * useAppointments Hook
// //  *
// //  * Fetches and manages appointment data for a given doctor and date/date range.
// //  *
// //  * TODO: Implement this hook
// //  *
// //  * Tips:
// //  * - Use useState for loading and error states
// //  * - Use useEffect to fetch data when params change
// //  * - Use useMemo to memoize expensive computations
// //  * - Consider how to handle both single date (day view) and date range (week view)
// //  */
// // export function useAppointments(params: UseAppointmentsParams): UseAppointmentsReturn {
// //   const { doctorId, date, startDate, endDate } = params;

// //   // TODO: Add state for appointments, loading, error
// //   const [appointments, setAppointments] = useState<Appointment[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<Error | null>(null);

// //   // TODO: Fetch doctor data
// //   const doctor = useMemo(() => {
// //     // Implement: Get doctor by ID
// //     // return appointmentService.getDoctorById(doctorId);
// //     return undefined;
// //   }, [doctorId]);

// //   // TODO: Fetch appointments when dependencies change
// //   useEffect(() => {
// //     // Implement: Fetch appointments
// //     // Consider:
// //     // - If startDate and endDate are provided, use date range
// //     // - Otherwise, use single date
// //     // - Set loading state
// //     // - Handle errors
// //     // - Set appointments

// //     console.log('TODO: Fetch appointments for', { doctorId, date, startDate, endDate });

// //     // Placeholder - remove when implementing
// //     setLoading(false);
// //   }, [doctorId, date, startDate, endDate]);

// //   return {
// //     appointments,
// //     doctor,
// //     loading,
// //     error,
// //   };
// // }

// // /**
// //  * BONUS: Create additional hooks for specific use cases
// //  *
// //  * Examples:
// //  * - useDayViewAppointments(doctorId: string, date: Date)
// //  * - useWeekViewAppointments(doctorId: string, weekStartDate: Date)
// //  * - useDoctors() - hook to get all doctors
// //  */
// /**
//  * useAppointments Hook
//  *
//  * Custom React hook that fetches and manages appointment data
//  * for a given doctor and date or date range.
//  */

// import { useState, useEffect, useMemo } from 'react';
// import type { Appointment, Doctor } from '@/types';
// import { appointmentService } from '@/services/appointmentService';

// interface UseAppointmentsParams {
//   doctorId: string;
//   date: Date;
//   startDate?: Date;
//   endDate?: Date;
// }

// interface UseAppointmentsReturn {
//   appointments: Appointment[];
//   doctor: Doctor | undefined;
//   loading: boolean;
//   error: Error | null;
// }

// /**
//  * Main Hook
//  */
// export function useAppointments({
//   doctorId,
//   date,
//   startDate,
//   endDate,
// }: UseAppointmentsParams): UseAppointmentsReturn {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   /**
//    * Memoize doctor data for performance
//    */
//   const doctor = useMemo(() => {
//     try {
//       return appointmentService.getDoctorById(doctorId);
//     } catch (err) {
//       console.error('Error fetching doctor:', err);
//       return undefined;
//     }
//   }, [doctorId]);

//   /**
//    * Fetch appointments when dependencies change
//    */
//   useEffect(() => {
//     if (!doctorId) return;

//     setLoading(true);
//     setError(null);

//     try {
//       let result: Appointment[] = [];

//       if (startDate && endDate) {
//         // Week view: use date range
//         result = appointmentService.getAppointmentsByDoctorAndDateRange(
//           doctorId,
//           startDate,
//           endDate
//         );
//       } else {
//         // Day view: use single date
//         result = appointmentService.getAppointmentsByDoctorAndDate(
//           doctorId,
//           date
//         );
//       }

//       // Optional: sort by time
//       result = appointmentService.sortAppointmentsByTime(result);

//       setAppointments(result);
//     } catch (err: any) {
//       console.error('Error fetching appointments:', err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [doctorId, date, startDate, endDate]);

//   return {
//     appointments,
//     doctor,
//     loading,
//     error,
//   };
// }

// /**
//  * BONUS HOOKS (optional)
//  * 
//  * For convenience, you can define these wrappers:
//  */

// // export const useDayViewAppointments = (doctorId: string, date: Date) =>
// //   useAppointments({ doctorId, date });

// // export const useWeekViewAppointments = (doctorId: string, startDate: Date, endDate: Date) =>
// //   useAppointments({ doctorId, date: startDate, startDate, endDate });

// hooks/useAppointments.ts
import { useEffect, useMemo, useState } from 'react';
import type { Appointment, Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface Params {
  doctorId: string;
  date: Date;
  startDate?: Date;
  endDate?: Date;
}

export function useAppointments({ doctorId, date, startDate, endDate }: Params) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const doctor: Doctor | undefined = useMemo(() => {
    try {
      return appointmentService.getDoctorById(doctorId);
    } catch {
      return undefined;
    }
  }, [doctorId]);

  useEffect(() => {
    if (!doctorId) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result: Appointment[] = [];
      if (startDate && endDate) {
        result = appointmentService.getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
      } else {
        result = appointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      }
      result = appointmentService.sortAppointmentsByTime(result);
      setAppointments(result);
    } catch (err: any) {
      setError(err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId, date?.toISOString(), startDate?.toISOString?.(), endDate?.toISOString?.()]);

  return { appointments, doctor, loading, error };
}
