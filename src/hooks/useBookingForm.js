import { useState } from "react";
import toast from "react-hot-toast";

const useBookingForm = (car) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      bookingDate: date,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields (Name and Email)");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !car) return;

    setIsSubmitting(true);
    toast.loading("Sending your booking request...", { id: "booking-request" });

    const bookingData = {
      carId: car.id,
      carBrand: car.brand,
      carModel: car.model,
      customerName: formData.name,
      customerEmail: formData.email,
      bookingDate: formData.bookingDate,
      comment: formData.comment,
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        `Thank you, ${formData.name}! Your booking request for ${car.brand} ${car.model} has been submitted.`,
        { id: "booking-request" }
      );

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });
    }, 1500);
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useBookingForm;
