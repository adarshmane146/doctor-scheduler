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
          {d.name} — {d.specialty}
          </option>
        ))}
      </select>
    </div>
  );
}
