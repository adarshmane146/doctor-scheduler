# Frontend Challenge Submission

**Candidate Name:** - Adarsh Mane
**Date:**  -15-10-2025
**Time Spent:**  -4 hours

---

## ✅ Completed Features

### Core Features
- [x] Day View calendar (time slots 8 AM - 6 PM)
- [x] Week View calendar (7-day grid)
- [x] Doctor selector dropdown
- [x] Appointment rendering with correct positioning
- [x] Color-coding by appointment type
- [x] Service layer implementation
- [x] Custom hooks (headless pattern)
- [x] Component composition

### Bonus Features (if any)
- [x] Current time indicator
- [x] Responsive design (mobile-friendly)
- [x] Empty states
- [x] Loading states
- [ ] Error handling
- [ ] Appointment search/filter
- [ ] Dark mode
- [ ] Accessibility improvements
- [ ] Other: _________________

---

## 🏗️ Architecture Decisions

### Component Structure

```
SchedulePage (app/schedule/page.tsx)
└── ScheduleView (components/ScheduleView.tsx)
    ├── DoctorSelector (components/DoctorSelector.tsx)
    ├── Controls (date picker + day/week view buttons, inline in ScheduleView)
    ├── DayView (components/DayView.tsx)
    │   ├── Time Slots (rendered inline in DayView)
    │   └── Appointment Cards (rendered inline in DayView)
    └── WeekView (components/WeekView.tsx)
        └── CompactAppointment (rendered inline in WeekView)

```

**Why did you structure it this way?**

I separated UI and logic to follow headless component patterns. `ScheduleView` acts as a container, `DoctorSelector` handles filtering, `DayView` and `WeekView` render appointments using reusable `AppointmentCard` components. This ensures maintainability, reusability, and clean separation of concerns.

---

### State Management

**What state management approach did you use?**
**Approach:**  
- [x] useState + useEffect  
- [x] Custom hooks (headless pattern)  

**Why did you choose this approach?**

I used `useAppointments` custom hook to manage all appointment-related logic, keeping UI components purely presentational. `useState` manages selected doctor and date.

---

### Service Layer

**How did you structure your data access?**

`AppointmentService` is a class that abstracts data access from mockData.  

**What methods did you implement in AppointmentService?**

- [x] getAppointmentsByDoctor  
- [x] getAppointmentsByDoctorAndDate  
- [x] getAllDoctors  


### Custom Hooks

**What custom hooks did you create?**

->`useAppointments` – Fetches appointments by doctor/date and generates time slots.  

**How do they demonstrate the headless pattern?**

->Demonstrates headless pattern by separating fetching and processing logic from UI rendering in DayView and WeekView.


## 🎨 UI/UX Decisions

### Calendar Rendering

**How did you generate time slots?**

Generated 30-minute intervals from 8 AM to 6 PM using a utility function in `useAppointments` hook.

**How did you position appointments in time slots?**

Used CSS Grid to map appointments into time slots. Overlapping appointments are displayed stacked with proper color coding.

**How did you handle overlapping appointments?**

Appointments with overlapping times are rendered as stacked blocks within the same time slot to maintain clarity.


### Responsive Design

**Is your calendar mobile-friendly?**
- [x] Yes, fully responsive  

**What responsive strategies did you use?**

Tailwind CSS, flexbox for grids, horizontal scrolling for small screens.
---

## 🧪 Testing & Quality

### Code Quality

**Did you run these checks?**
- [x] `npm run lint` - No errors  
- [x] `npm run type-check` - No TypeScript errors  
- [x] `npm run build` - Builds successfully  
- [x] Manual testing - All core features functional  
### Testing Approach

- Manual testing for Day and Week view rendering  
- Checked color-coding, overlapping appointments, and doctor filtering


## 🤔 Assumptions Made

1. All appointments fall within doctor working hours.  
2. No real backend; data comes from `mockData.ts`.  
3. No authentication implemented; role-based view is simulated with a doctor dropdown.



## ⚠️ Known Issues / Limitations

1. Week view does not fully handle multiple overlapping appointments visually for more than 2 overlaps.  
2. No appointment editing/creation implemented (out of scope).  

---

## 🚀 Future Improvements

1. Drag-and-drop rescheduling.  
2. Add appointment creation and editing.  
3. Optimize performance for large datasets with virtualization.  
4. Add dark mode and full accessibility features.  

---

## 💭 Challenges & Learnings

### Biggest Challenge

Handling overlapping appointments in the calendar and aligning them correctly in both Day and Week views.

### What Did You Learn?

I learned how to design reusable components with headless patterns and implement time-slot-based scheduling with TypeScript.

### What Are You Most Proud Of?


The clean architecture separating UI, hooks, and service layers, making the application maintainable and scalable.

---

## 🎯 Trade-offs

### Time vs. Features

**Where did you spend most of your time?**

- [x] Architecture/planning  
- [x] Day view implementation  
- [x] Week view implementation  
- [x] Styling/polish  

**What did you prioritize and why?**

Core functionality (Day/Week view, doctor filtering) first for correctness and maintainable architecture.

### Technical Trade-offs

Used simple array filters and map functions to render appointments instead of complex data structures to meet the time constraint while keeping the code readable.


## 📚 Libraries & Tools Used

### Third-Party Libraries
Did you use any additional libraries beyond what was provided?

**Calendar/UI Libraries:**
- [ ] react-big-calendar  
- [ ] FullCalendar  
- [x] Tailwind CSS  
- [ ] Radix UI  
- [ ] Headless UI  

**Utility Libraries:**
- [x] date-fns  

**Why did you choose these libraries?**

Tailwind CSS for quick responsive UI, date-fns for date manipulation.

---

### AI Tools & Documentation

**AI Coding Assistants:**
- [ ] GitHub Copilot
- [x] ChatGPT  
- [ ] Claude
- [ ] Other: _________________

**How did you use AI tools?**
- Suggested architecture and service/hook patterns  
- Generated utility snippets for time slot generation  
- All code reviewed, customized, and fully understood by me

**Documentation & Resources:**
- React, Next.js, Tailwind CSS, TypeScript docs  
- date-fns documentation  


## 📝 Additional Notes

The application fulfills all core requirements and demonstrates clean architecture and reusable component design.

---

## ✨ Screenshots (Optional)


---

**Thank you for your submission! We'll review it and get back to you soon.**
