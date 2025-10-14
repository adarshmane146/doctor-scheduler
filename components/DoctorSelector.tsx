// // /**
// //  * DoctorSelector Component
// //  *
// //  * Dropdown to select which doctor's schedule to view.
// //  * For front desk staff (can see all doctors).
// //  *
// //  * TODO for candidates:
// //  * 1. Fetch list of all doctors
// //  * 2. Display in a dropdown/select
// //  * 3. Show doctor name and specialty
// //  * 4. Handle selection change
// //  * 5. Consider using a custom dropdown or native select
// //  */

// // 'use client';

// // import { useState, useEffect } from 'react';
// // import type { Doctor } from '@/types';

// // interface DoctorSelectorProps {
// //   selectedDoctorId: string;
// //   onDoctorChange: (doctorId: string) => void;
// // }

// // /**
// //  * DoctorSelector Component
// //  *
// //  * A dropdown to select a doctor from the list of available doctors.
// //  *
// //  * TODO: Implement this component
// //  *
// //  * Consider:
// //  * - Should you fetch doctors here or accept them as props?
// //  * - Native <select> or custom dropdown component?
// //  * - How to display doctor info (name + specialty)?
// //  * - Should this be a reusable component?
// //  */
// // export function DoctorSelector({
// //   selectedDoctorId,
// //   onDoctorChange,
// // }: DoctorSelectorProps) {
// //   const [doctors, setDoctors] = useState<Doctor[]>([]);

// //   // TODO: Fetch doctors
// //   useEffect(() => {
// //     // Option 1: Use appointmentService to get doctors
// //     // const allDoctors = appointmentService.getAllDoctors();
// //     // setDoctors(allDoctors);

// //     // Option 2: Import MOCK_DOCTORS directly
// //     // import { MOCK_DOCTORS } from '@/data/mockData';
// //     // setDoctors(MOCK_DOCTORS);

// //     console.log('TODO: Fetch doctors');
// //   }, []);

// //   // Find currently selected doctor for display
// //   const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

// //   return (
// //     <div className="doctor-selector">
// //       {/* TODO: Implement the dropdown */}

// //       {/* Option 1: Native select */}
// //       <select
// //         value={selectedDoctorId}
// //         onChange={(e) => onDoctorChange(e.target.value)}
// //         className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //       >
// //         <option value="">Select a doctor...</option>
// //         {/* TODO: Map over doctors and create options */}
// //         {doctors.map((doctor) => (
// //           <option key={doctor.id} value={doctor.id}>
// //             {/* TODO: Format display text (e.g., "Dr. Sarah Chen - Cardiology") */}
// //             Dr. {doctor.name} - {doctor.specialty}
// //           </option>
// //         ))}
// //       </select>

// //       {/* Option 2: Custom dropdown (BONUS)
// //       <button
// //         type="button"
// //         className="w-full px-4 py-2 text-sm text-left border rounded-lg"
// //         onClick={() => setIsOpen(!isOpen)}
// //       >
// //         {selectedDoctor
// //           ? `Dr. ${selectedDoctor.name} - ${selectedDoctor.specialty}`
// //           : 'Select a doctor...'}
// //       </button>

// //       {isOpen && (
// //         <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
// //           {doctors.map((doctor) => (
// //             <button
// //               key={doctor.id}
// //               className="w-full px-4 py-2 text-left hover:bg-gray-100"
// //               onClick={() => {
// //                 onDoctorChange(doctor.id);
// //                 setIsOpen(false);
// //               }}
// //             >
// //               Dr. {doctor.name} - {doctor.specialty}
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //       */}
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import type { Doctor } from '@/types';
// import { appointmentService } from '@/services/appointmentService';

// interface DoctorSelectorProps {
//   selectedDoctorId: string;
//   onDoctorChange: (doctorId: string) => void;
// }

// /**
//  * DoctorSelector Component
//  *
//  * Displays a dropdown list of all doctors.
//  * Shows doctor name and specialty, and triggers selection change.
//  */
// export function DoctorSelector({
//   selectedDoctorId,
//   onDoctorChange,
// }: DoctorSelectorProps) {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   // Fetch doctors on mount
//   useEffect(() => {
//     try {
//       setLoading(true);
//       const allDoctors = appointmentService.getAllDoctors();
//       setDoctors(allDoctors);
//     } catch (err: any) {
//       console.error('Error fetching doctors:', err);
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-sm text-gray-500 animate-pulse">
//         Loading doctors...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-sm text-red-500">
//         Failed to load doctors. Please try again.
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-selector w-full max-w-sm">
//       <label
//         htmlFor="doctor"
//         className="block mb-2 text-sm font-medium text-gray-700"
//       >
//         Select Doctor
//       </label>

//       <select
//         id="doctor"
//         value={selectedDoctorId}
//         onChange={(e) => onDoctorChange(e.target.value)}
//         className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="">Select a doctor...</option>
//         {doctors.map((doctor) => (
//           <option key={doctor.id} value={doctor.id}>
//             Dr. {doctor.name} — {doctor.specialty}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }


// components/DoctorSelector.tsx
'use client';

import { useEffect, useState } from 'react';
import type { Doctor } from '@/types';
import { appointmentService } from '@/services/appointmentService';

interface Props {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export function DoctorSelector({ selectedDoctorId, onDoctorChange }: Props) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      setDoctors(appointmentService.getAllDoctors());
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-sm text-gray-500">Loading doctors...</div>;

  return (
    <div className="doctor-selector">
      <label className="sr-only" htmlFor="doctor-select">Select doctor</label>
      <select
        id="doctor-select"
        className="border rounded px-3 py-2 text-sm"
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
      >
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            Dr. {d.name} — {d.specialty}
          </option>
        ))}
      </select>
    </div>
  );
}
