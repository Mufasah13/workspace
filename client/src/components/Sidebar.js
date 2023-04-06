import React from "react";
import { useSelector } from "react-redux";

const Sidebar = ({ children }) => {
  const accessRole = useSelector((state) => state.user.accessRole);

  const isMarketer = accessRole === `113`;
  const isHOSorGM = accessRole === `113#114` || accessRole === `113#115`;
  const isAdmin =
    accessRole === `        112#700#117#116` ||
    accessRole === `    112#770#303#304#305#116` ||
    accessRole === `     112#114#700`;
  const isOperations =
    accessRole === `     112#116#303#305` ||
    accessRole === `   112#304` ||
    accessRole === `   112#305`;

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-visible">{children}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <a href="/" className="font-bold my-1">
                Home
              </a>
            </li>
            {(isHOSorGM || isAdmin) && (
              <li>
                <a href="/dashboard" className="font-bold my-1">
                  Dashboard
                </a>
              </li>
            )}
            {/* Site Visit */}
            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-bold">Site Visits</div>
              <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                {(isMarketer || isHOSorGM || isAdmin) && (
                  <a
                    href="/create-booking"
                    className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                  >
                    Book a Site Visit
                  </a>
                )}
                {(isMarketer || isHOSorGM || isAdmin) && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/my-bookings"
                  >
                    My Site Visits
                  </a>
                )}
                {isAdmin && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/assigned-bookings"
                  >
                    Assigned Site Visits
                  </a>
                )}
                {(isHOSorGM || isAdmin || isOperations) && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/approved-bookings"
                  >
                    Approved Site Visits
                  </a>
                )}
                {isAdmin && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/bookings-requests"
                  >
                    Site Visit Requests
                  </a>
                )}
                {(isHOSorGM || isAdmin || isOperations) && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/all-bookings"
                  >
                    All Site Visit Bookings
                  </a>
                )}
              </div>
            </div>
            {/* Sites */}
            {(isAdmin || isOperations) && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Sites</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  {isAdmin && (
                    <a
                      className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                      href="/create-site"
                    >
                      Create Site
                    </a>
                  )}
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/view-sites"
                  >
                    View Sites
                  </a>
                </div>
              </div>
            )}
            {/* Vehicles */}
            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-bold">Vehicles</div>
              <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                <a
                  href="/request-vehicle"
                  className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                >
                  Request Vehicle
                </a>
                {(isAdmin || isOperations) && (
                  <>
                    {isAdmin && (
                      <a
                        className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                        href="/create-vehicle"
                      >
                        Add Vehicle
                      </a>
                    )}
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/view-vehicles"
                    >
                      View Vehicles
                    </a>
                  </>
                )}
              </div>
            </div>
            {/* Clients */}
            <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
              <input type="checkbox" className="peer" />
              <div className="collapse-title font-bold">Clients</div>
              <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                <a
                  className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                  href="/clients-contacts"
                >
                  Clients Contacts
                </a>
                {(isHOSorGM || isAdmin) && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/clients-feedback"
                  >
                    Clients Feedback
                  </a>
                )}
              </div>
            </div>
            {/* Drivers */}
            {isAdmin && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Drivers</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  <a
                    className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                    href="/create-driver"
                  >
                    Add Driver
                  </a>
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/view-drivers"
                  >
                    View Drivers
                  </a>
                </div>
              </div>
            )}
            {isAdmin && (
              <li>
                <a href="/users" className="font-bold my-1">
                  Users
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
