import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";
import BookingSteps from "@/components/BookingSteps";

describe("ServiceCard", () => {
  const mockService = {
    id: "cleaning",
    name: "Dental Cleaning",
    description: "Professional teeth cleaning",
    duration: 45,
    price: 120,
    icon: "🦷",
  };

  it("renders service name and price", () => {
    render(
      <ServiceCard service={mockService} selected={false} onSelect={() => {}} />
    );
    expect(screen.getByText("Dental Cleaning")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
  });

  it("renders service description and duration", () => {
    render(
      <ServiceCard service={mockService} selected={false} onSelect={() => {}} />
    );
    expect(
      screen.getByText("Professional teeth cleaning")
    ).toBeInTheDocument();
    expect(screen.getByText("45 min")).toBeInTheDocument();
  });

  it("shows selected state", () => {
    render(
      <ServiceCard service={mockService} selected={true} onSelect={() => {}} />
    );
    expect(screen.getByText("Selected")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(
      <ServiceCard
        service={mockService}
        selected={false}
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith("cleaning");
  });
});

describe("DoctorCard", () => {
  const mockDoctor = {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    specialty: "General Dentistry",
    photo: "",
    bio: "15 years of experience.",
    availableDays: [1, 2, 3, 4, 5],
  };

  it("renders doctor name and specialty", () => {
    render(
      <DoctorCard doctor={mockDoctor} selected={false} onSelect={() => {}} />
    );
    expect(screen.getByText("Dr. Sarah Smith")).toBeInTheDocument();
    expect(screen.getByText("General Dentistry")).toBeInTheDocument();
  });

  it("renders initials avatar", () => {
    render(
      <DoctorCard doctor={mockDoctor} selected={false} onSelect={() => {}} />
    );
    expect(screen.getByText("DS")).toBeInTheDocument();
  });

  it("shows available days", () => {
    render(
      <DoctorCard doctor={mockDoctor} selected={false} onSelect={() => {}} />
    );
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(
      <DoctorCard doctor={mockDoctor} selected={false} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith("dr-smith");
  });
});

describe("BookingSteps", () => {
  const stepLabels = ["Service", "Doctor", "Date", "Details"];

  it("renders step progress correctly", () => {
    render(
      <BookingSteps
        currentStep={1}
        totalSteps={4}
        stepLabels={stepLabels}
      />
    );
    expect(screen.getByText("Step 2 of 4")).toBeInTheDocument();
    expect(screen.getByText("Doctor")).toBeInTheDocument();
  });

  it("shows first step correctly", () => {
    render(
      <BookingSteps
        currentStep={0}
        totalSteps={4}
        stepLabels={stepLabels}
      />
    );
    expect(screen.getByText("Step 1 of 4")).toBeInTheDocument();
    expect(screen.getByText("Service")).toBeInTheDocument();
  });
});
