// /**
//  * Appointment Service
//  *
//  * This service provides an abstraction layer for accessing appointment data.
//  * It's your data access layer - implement the methods to fetch and filter appointments.
//  *
//  * TODO for candidates:
//  * 1. Implement getAppointmentsByDoctor
//  * 2. Implement getAppointmentsByDoctorAndDate
//  * 3. Implement getAppointmentsByDoctorAndDateRange (for week view)
//  * 4. Consider adding helper methods for filtering, sorting, etc.
//  * 5. Think about how to structure this for testability
//  */

// import type { Appointment, Doctor, Patient, PopulatedAppointment } from '@/types';
// import {
//   MOCK_APPOINTMENTS,
//   MOCK_DOCTORS,
//   MOCK_PATIENTS,
//   getDoctorById,
//   getPatientById,
// } from '@/data/mockData';

// /**
//  * AppointmentService class
//  *
//  * Provides methods to access and manipulate appointment data.
//  * This is where you abstract data access from your components.
//  */
// export class AppointmentService {
//   /**
//    * Get all appointments for a specific doctor
//    *
//    * TODO: Implement this method
//    */
//   getAppointmentsByDoctor(doctorId: string): Appointment[] {
//     // TODO: Implement - filter MOCK_APPOINTMENTS by doctorId
//     throw new Error('Not implemented - getAppointmentsByDoctor');
//   }

//   /**
//    * Get appointments for a specific doctor on a specific date
//    *
//    * TODO: Implement this method
//    * @param doctorId - The doctor's ID
//    * @param date - The date to filter by
//    * @returns Array of appointments for that doctor on that date
//    */
//   getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
//     // TODO: Implement - filter by doctor AND date
//     // Hint: You'll need to compare dates properly (same day, ignoring time)
//     throw new Error('Not implemented - getAppointmentsByDoctorAndDate');
//   }

//   /**
//    * Get appointments for a specific doctor within a date range (for week view)
//    *
//    * TODO: Implement this method
//    * @param doctorId - The doctor's ID
//    * @param startDate - Start of the date range
//    * @param endDate - End of the date range
//    * @returns Array of appointments within the date range
//    */
//   getAppointmentsByDoctorAndDateRange(
//     doctorId: string,
//     startDate: Date,
//     endDate: Date
//   ): Appointment[] {
//     // TODO: Implement - filter by doctor AND date range
//     throw new Error('Not implemented - getAppointmentsByDoctorAndDateRange');
//   }

//   /**
//    * Get a populated appointment (with patient and doctor objects)
//    *
//    * This is useful for display purposes where you need patient/doctor details
//    *
//    * TODO: Implement this helper method
//    */
//   getPopulatedAppointment(appointment: Appointment): PopulatedAppointment | null {
//     // TODO: Implement - merge appointment with patient and doctor data
//     // Hint: Use getDoctorById and getPatientById from mockData
//     throw new Error('Not implemented - getPopulatedAppointment');
//   }

//   /**
//    * Get all doctors
//    *
//    * TODO: Implement this method
//    */
//   getAllDoctors(): Doctor[] {
//     // TODO: Implement - return all doctors
//     throw new Error('Not implemented - getAllDoctors');
//   }

//   /**
//    * Get doctor by ID
//    *
//    * TODO: Implement this method
//    */
//   getDoctorById(id: string): Doctor | undefined {
//     // TODO: Implement - find doctor by ID
//     throw new Error('Not implemented - getDoctorById');
//   }

//   /**
//    * BONUS: Add any other helper methods you think would be useful
//    * Examples:
//    * - Sort appointments by time
//    * - Check for overlapping appointments
//    * - Get appointments by type
//    * - etc.
//    */
// }

// /**
//  * Singleton instance (optional pattern)
//  *
//  * You can either:
//  * 1. Export a singleton instance: export const appointmentService = new AppointmentService();
//  * 2. Or let consumers create their own instances: new AppointmentService()
//  *
//  * Consider which is better for your architecture and testing needs.
//  */
// export const appointmentService = new AppointmentService();

/**
 * Appointment Service
 *
 * Provides an abstraction layer for accessing and filtering appointment data.
 */

// import type { Appointment, Doctor, PopulatedAppointment } from '@/types';
// import {
//   MOCK_APPOINTMENTS,
//   MOCK_DOCTORS,
//   getDoctorById,
//   getPatientById,
// } from '@/data/mockData';

// export class AppointmentService {
//   /**
//    * Get all appointments for a specific doctor
//    */
//   getAppointmentsByDoctor(doctorId: string): Appointment[] {
//     return MOCK_APPOINTMENTS.filter((appt) => appt.doctorId === doctorId);
//   }

//   /**
//    * Get appointments for a specific doctor on a specific date
//    */
//   getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
//     const targetDate = date.toDateString();

//     return MOCK_APPOINTMENTS.filter(
//       (appt) =>
//         appt.doctorId === doctorId &&
//         new Date(appt.date).toDateString() === targetDate
//     );
//   }

//   /**
//    * Get appointments for a specific doctor within a date range (for week view)
//    */
//   getAppointmentsByDoctorAndDateRange(
//     doctorId: string,
//     startDate: Date,
//     endDate: Date
//   ): Appointment[] {
//     return MOCK_APPOINTMENTS.filter((appt) => {
//       const apptDate = new Date(appt.date);
//       return (
//         appt.doctorId === doctorId &&
//         apptDate >= startDate &&
//         apptDate <= endDate
//       );
//     });
//   }

//   /**
//    * Get a populated appointment (with patient and doctor objects)
//    */
//   getPopulatedAppointment(appointment: Appointment): PopulatedAppointment | null {
//     const doctor = getDoctorById(appointment.doctorId);
//     const patient = getPatientById(appointment.patientId);

//     if (!doctor || !patient) return null;

//     return {
//       ...appointment,
//       doctor,
//       patient,
//     };
//   }

//   /**
//    * Get all doctors
//    */
//   getAllDoctors(): Doctor[] {
//     return MOCK_DOCTORS;
//   }

//   /**
//    * Get doctor by ID
//    */
//   getDoctorById(id: string): Doctor | undefined {
//     return getDoctorById(id);
//   }

//   /**
//    * Helper: Sort appointments by time (optional)
//    */
//   sortAppointmentsByTime(appointments: Appointment[]): Appointment[] {
//     return [...appointments].sort(
//       (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//     );
//   }
// }

// /**
//  * Singleton instance for convenience
//  */
// export const appointmentService = new AppointmentService();
// services/appointmentService.ts
import { parseISO } from 'date-fns';
import type { Appointment, Doctor, Patient, PopulatedAppointment } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from '@/data/mockData';

export class AppointmentService {
  getAllAppointments(): Appointment[] {
    return MOCK_APPOINTMENTS;
  }

  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return MOCK_APPOINTMENTS.filter((a) => a.doctorId === doctorId);
  }

  getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return MOCK_APPOINTMENTS.filter((a) => {
      try {
        const start = parseISO(a.startTime);
        return a.doctorId === doctorId &&
          start.getFullYear() === date.getFullYear() &&
          start.getMonth() === date.getMonth() &&
          start.getDate() === date.getDate();
      } catch {
        return false;
      }
    }).sort((x, y) => parseISO(x.startTime).getTime() - parseISO(y.startTime).getTime());
  }

  getAppointmentsByDoctorAndDateRange(doctorId: string, startDate: Date, endDate: Date): Appointment[] {
    const s = startDate.getTime();
    const e = endDate.getTime();
    return MOCK_APPOINTMENTS.filter((a) => {
      try {
        const start = parseISO(a.startTime).getTime();
        return a.doctorId === doctorId && start >= s && start <= e;
      } catch {
        return false;
      }
    }).sort((x, y) => parseISO(x.startTime).getTime() - parseISO(y.startTime).getTime());
  }

  getPopulatedAppointment(a: Appointment): PopulatedAppointment | null {
    const doctor = getDoctorById(a.doctorId);
    const patient = getPatientById(a.patientId);
    if (!doctor || !patient) return null;
    return { ...a, doctor, patient };
  }

  getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  getDoctorById(id: string): Doctor | undefined {
    return getDoctorById(id);
  }

  // helpful util: sort by start time
  sortAppointmentsByTime(list: Appointment[]): Appointment[] {
    return [...list].sort((a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime());
  }
}

export const appointmentService = new AppointmentService();
