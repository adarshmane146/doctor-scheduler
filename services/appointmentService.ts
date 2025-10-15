// // /**
// //  * Appointment Service
// //  *
// //  * This service provides an abstraction layer for accessing appointment data.
// //  * It's your data access layer - implement the methods to fetch and filter appointments.
// //  *
// //  * TODO for candidates:
// //  * 1. Implement getAppointmentsByDoctor
// //  * 2. Implement getAppointmentsByDoctorAndDate
// //  * 3. Implement getAppointmentsByDoctorAndDateRange (for week view)
// //  * 4. Consider adding helper methods for filtering, sorting, etc.
// //  * 5. Think about how to structure this for testability
// //  */


import { parseISO } from 'date-fns';
import type { Appointment, Doctor, PopulatedAppointment } from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  getDoctorById,
  getPatientById,
} from '@/data/mockData';

export class AppointmentService {
  getAllAppointments(): (Appointment & { patientName: string })[] {
    return MOCK_APPOINTMENTS.map((a) => {
      const patient = getPatientById(a.patientId);
      return {
        ...a,
        patientName: patient ? patient.name : 'Unknown Patient',
      };
    });
  }

  getAppointmentsByDoctor(doctorId: string): (Appointment & { patientName: string })[] {
    return MOCK_APPOINTMENTS
      .filter((a) => a.doctorId === doctorId)
      .map((a) => {
        const patient = getPatientById(a.patientId);
        return {
          ...a,
          patientName: patient ? patient.name : 'Unknown Patient',
        };
      });
  }

  getAppointmentsByDoctorAndDate(
    doctorId: string,
    date: Date
  ): (Appointment & { patientName: string })[] {
    return MOCK_APPOINTMENTS
      .filter((a) => {
        try {
          const start = parseISO(a.startTime);
          return (
            a.doctorId === doctorId &&
            start.getFullYear() === date.getFullYear() &&
            start.getMonth() === date.getMonth() &&
            start.getDate() === date.getDate()
          );
        } catch {
          return false;
        }
      })
      .map((a) => {
        const patient = getPatientById(a.patientId);
        return {
          ...a,
          patientName: patient ? patient.name : 'Unknown Patient',
        };
      })
      .sort(
        (x, y) =>
          parseISO(x.startTime).getTime() - parseISO(y.startTime).getTime()
      );
  }

  getAppointmentsByDoctorAndDateRange(
    doctorId: string,
    startDate: Date,
    endDate: Date
  ): (Appointment & { patientName: string })[] {
    const s = startDate.getTime();
    const e = endDate.getTime();
    return MOCK_APPOINTMENTS
      .filter((a) => {
        try {
          const start = parseISO(a.startTime).getTime();
          return a.doctorId === doctorId && start >= s && start <= e;
        } catch {
          return false;
        }
      })
      .map((a) => {
        const patient = getPatientById(a.patientId);
        return {
          ...a,
          patientName: patient ? patient.name : 'Unknown Patient',
        };
      })
      .sort(
        (x, y) =>
          parseISO(x.startTime).getTime() - parseISO(y.startTime).getTime()
      );
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
  sortAppointmentsByTime(
    list: (Appointment & { patientName?: string })[]
  ): (Appointment & { patientName?: string })[] {
    return [...list].sort(
      (a, b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime()
    );
  }
}

export const appointmentService = new AppointmentService();
