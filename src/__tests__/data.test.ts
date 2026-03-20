import {
  services,
  doctors,
  getServiceById,
  getDoctorById,
  formatDate,
  formatTime,
  generateTimeSlots,
  sampleAppointments,
} from "@/lib/data";

describe("Data utilities", () => {
  describe("services", () => {
    it("should have at least one service", () => {
      expect(services.length).toBeGreaterThan(0);
    });

    it("each service should have required fields", () => {
      for (const service of services) {
        expect(service.id).toBeTruthy();
        expect(service.name).toBeTruthy();
        expect(service.description).toBeTruthy();
        expect(service.duration).toBeGreaterThan(0);
        expect(service.price).toBeGreaterThan(0);
        expect(service.icon).toBeTruthy();
      }
    });
  });

  describe("doctors", () => {
    it("should have at least one doctor", () => {
      expect(doctors.length).toBeGreaterThan(0);
    });

    it("each doctor should have required fields", () => {
      for (const doctor of doctors) {
        expect(doctor.id).toBeTruthy();
        expect(doctor.name).toBeTruthy();
        expect(doctor.specialty).toBeTruthy();
        expect(doctor.bio).toBeTruthy();
        expect(doctor.availableDays.length).toBeGreaterThan(0);
      }
    });

    it("available days should be valid day indices (0-6)", () => {
      for (const doctor of doctors) {
        for (const day of doctor.availableDays) {
          expect(day).toBeGreaterThanOrEqual(0);
          expect(day).toBeLessThanOrEqual(6);
        }
      }
    });
  });

  describe("getServiceById", () => {
    it("should return a service by valid id", () => {
      const service = getServiceById("cleaning");
      expect(service).toBeDefined();
      expect(service!.name).toBe("Dental Cleaning");
    });

    it("should return undefined for invalid id", () => {
      expect(getServiceById("nonexistent")).toBeUndefined();
    });
  });

  describe("getDoctorById", () => {
    it("should return a doctor by valid id", () => {
      const doctor = getDoctorById("dr-smith");
      expect(doctor).toBeDefined();
      expect(doctor!.name).toBe("Dr. Sarah Smith");
    });

    it("should return undefined for invalid id", () => {
      expect(getDoctorById("nonexistent")).toBeUndefined();
    });
  });

  describe("formatDate", () => {
    it("should format a date string correctly", () => {
      const result = formatDate("2026-03-23");
      expect(result).toContain("March");
      expect(result).toContain("23");
      expect(result).toContain("2026");
    });
  });

  describe("formatTime", () => {
    it("should format morning time correctly", () => {
      expect(formatTime("09:00")).toBe("9:00 AM");
    });

    it("should format afternoon time correctly", () => {
      expect(formatTime("14:00")).toBe("2:00 PM");
    });

    it("should format noon correctly", () => {
      expect(formatTime("12:00")).toBe("12:00 PM");
    });

    it("should format midnight correctly", () => {
      expect(formatTime("00:00")).toBe("12:00 AM");
    });
  });

  describe("generateTimeSlots", () => {
    it("should generate time slots", () => {
      const slots = generateTimeSlots();
      expect(slots.length).toBeGreaterThan(0);
    });

    it("should start at 9:00", () => {
      const slots = generateTimeSlots();
      expect(slots[0]).toBe("09:00");
    });

    it("should include half-hour slots", () => {
      const slots = generateTimeSlots();
      expect(slots).toContain("09:30");
      expect(slots).toContain("10:30");
    });

    it("should end before 17:30", () => {
      const slots = generateTimeSlots();
      const lastSlot = slots[slots.length - 1];
      expect(lastSlot).toBe("16:00");
    });
  });

  describe("sampleAppointments", () => {
    it("should have sample appointments", () => {
      expect(sampleAppointments.length).toBeGreaterThan(0);
    });

    it("each appointment should reference valid services and doctors", () => {
      for (const apt of sampleAppointments) {
        expect(getServiceById(apt.serviceId)).toBeDefined();
        expect(getDoctorById(apt.doctorId)).toBeDefined();
      }
    });
  });
});
