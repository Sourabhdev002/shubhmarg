import { describe, it, expect } from "vitest";
import { istMinutes, istWeekday, istDayNumber, istDateLabel } from "@/lib/ist-time";

// 2026-11-04 00:00 UTC = 05:30 IST, a Wednesday.
const T = Date.UTC(2026, 10, 4, 0, 0);

describe("ist-time helpers", () => {
  it("converts UTC to IST minutes", () => {
    expect(istMinutes(T)).toBe(330);
    expect(istMinutes(Date.UTC(2026, 10, 4, 18, 29))).toBe(23 * 60 + 59);
    expect(istMinutes(Date.UTC(2026, 10, 4, 18, 30))).toBe(0);
  });

  it("rolls the IST day and weekday at IST midnight, not UTC midnight", () => {
    const before = Date.UTC(2026, 10, 4, 18, 29); // 23:59 IST Wed
    const after = Date.UTC(2026, 10, 4, 18, 30);  // 00:00 IST Thu
    expect(istWeekday(before)).toBe(3);
    expect(istWeekday(after)).toBe(4);
    expect(istDayNumber(after) - istDayNumber(before)).toBe(1);
  });

  it("formats the date label like en-IN", () => {
    expect(istDateLabel(T)).toBe("Wednesday, 4 November");
    expect(istDateLabel(Date.UTC(2026, 10, 4, 18, 30))).toBe("Thursday, 5 November");
  });
});