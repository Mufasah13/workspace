import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const RequestVehicle = () => {
  const [location, setLocation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [passengers, setPassengers] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const request = {
      location,
      purpose,
      passengers,
      date,
      time,
    };
    console.log(request);
    setLoading(false);
    // todo: submit to db
  };

  return (
    <>
      <Sidebar>
        <div className="hero mt-10">
          <form
            onSubmit={handleSubmit}
            className="form-control w-full max-w-xs"
          >
            <label htmlFor="location" className="label">
              <span className="label-text font-bold">Location</span>
            </label>
            <input
              type="text"
              id="location"
              value={location}
              placeholder="Nakuru"
              onChange={(event) => setLocation(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="purpose" className="label">
              <span className="label-text font-bold">Purpose</span>
            </label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              placeholder="Colleague's burial"
              onChange={(event) => setPurpose(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="passengers" className="label">
              <span className="label-text font-bold">Number of Passengers</span>
            </label>
            <input
              type="number"
              id="passengers"
              value={passengers}
              placeholder="4"
              onChange={(event) => setPassengers(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="date" className="label">
              <span className="label-text font-bold">Date</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="time" className="label">
              <span className="label-text font-bold">Time</span>
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="submit"
              disabled={loading}
              id="submit"
              className="btn btn-primary w-full max-w-xs mt-4 text-white"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </Sidebar>
    </>
  );
};

export default RequestVehicle;
