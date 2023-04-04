import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const CreateVehicle = () => {
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleRegistration, setVehicleRegistration] = useState("");
  const [vehicleBodyType, setVehicleBodyType] = useState("");
  const [vehicleSeats, setVehicleSeats] = useState("");
  const [vehicleEngineCapacity, setVehicleEngineCapacity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const driver = {
      vehicleMake,
      vehicleModel,
      vehicleRegistration,
      vehicleBodyType,
      vehicleSeats,
      vehicleEngineCapacity,
    };
    console.log(driver);
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
            <label htmlFor="vehicleMake" className="label">
              <span className="label-text font-bold">Vehicle Make</span>
            </label>
            <input
              type="text"
              id="vehicleMake"
              value={vehicleMake}
              placeholder="Toyota"
              onChange={(event) => setVehicleMake(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="vehicleModel" className="label">
              <span className="label-text font-bold">Vehicle Model</span>
            </label>
            <input
              type="text"
              id="vehicleModel"
              placeholder="Hiace"
              value={vehicleModel}
              onChange={(event) => setVehicleModel(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="vehicleBodyType" className="label">
              <span className="label-text font-bold">Body Type</span>
            </label>
            <select
              id="vehicleBodyType"
              as="select"
              value={vehicleBodyType}
              onChange={(event) => setVehicleBodyType(event.target.value)}
              className="select select-bordered"
            >
              <option value="Bus">Bus</option>
              <option value="Minibus">Minibus</option>
              <option value="Van">Van</option>
              <option value="Minivan">Minivan</option>
              <option value="Truck">Truck</option>
              <option value="Mini Truck">Mini Truck</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
            <label htmlFor="vehicleSeats" className="label">
              <span className="label-text font-bold">
                Seats
              </span>
            </label>
            <input
              type="text"
              id="vehicleSeats"
              placeholder="30"
              value={vehicleSeats}
              onChange={(event) => setVehicleSeats(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="vehicleEngineCapacity" className="label">
              <span className="label-text font-bold">
                Engine Capacity (CCs)
              </span>
            </label>
            <input
              type="text"
              id="vehicleEngineCapacity"
              placeholder="3000"
              value={vehicleEngineCapacity}
              onChange={(event) => setVehicleEngineCapacity(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="vehicleRegistration" className="label">
              <span className="label-text font-bold">Vehicle Registration</span>
            </label>
            <input
              type="text"
              id="vehicleRegistration"
              placeholder="KDP 666X"
              value={vehicleRegistration}
              onChange={(event) => setVehicleRegistration(event.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="submit"
              disabled={loading}
              id="submit"
              className="btn btn-primary w-full max-w-xs mt-4 text-white"
            >
              {loading ? "Saving..." : "Add Vehicle"}
            </button>
          </form>
        </div>
      </Sidebar>
    </>
  );
};

export default CreateVehicle;