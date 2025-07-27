import React from "react";
import Button from "./Button";
import DatePicker from "./DatePicker";
import { catalogDetailStyles } from "../styles/catalogDetailStyles";

const BookingForm = ({
  formData,
  onInputChange,
  onDateChange,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <form onSubmit={onSubmit} className={catalogDetailStyles.form}>
      <div className={catalogDetailStyles.formHeader}>
        <h3 className={catalogDetailStyles.formTitle}>Book your car now</h3>
        <p className={catalogDetailStyles.formSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={catalogDetailStyles.formInputsContainer}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={onInputChange}
          className={catalogDetailStyles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={onInputChange}
          className={catalogDetailStyles.input}
          required
        />
        <DatePicker
          value={formData.bookingDate}
          onChange={onDateChange}
          placeholder="Booking Date"
          className={catalogDetailStyles.input}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={onInputChange}
          className={catalogDetailStyles.textarea}
        />
      </div>
      <Button
        type="submit"
        name={isSubmitting ? "Sending..." : "Send"}
        className={catalogDetailStyles.submitButton}
        disabled={isSubmitting}
      />
    </form>
  );
};

export default BookingForm;
