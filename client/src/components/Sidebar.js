import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActiveSiteVisits } from "../redux/features/siteVisit/siteVisitSlice";
import { fetchActiveVehicleRequests } from "../redux/features/vehicleRequest/vehicleRequestSlice";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const accessRole = useSelector((state) => state.user.accessRole);
  const activeVisits = useSelector((state) => state.siteVisit.activeVisits);
  const status = useSelector((state) => state.siteVisit.status);

  const activeVehicleRequests = useSelector(
    (state) => state.vehicleRequest.activeRequests
  );
  // const vehicleRequestStatus = useSelector(
  //   (state) => state.vehicleRequest.status
  // );

  console.log("Active Site Visits:", activeVisits ? activeVisits.length : 'undefined');
  console.log("Active Vehicle Requests", activeVehicleRequests ? activeVehicleRequests.length : 'undefined')

  const isMarketer = accessRole === `113`;
  const isHOSorGM = (accessRole === `113#114` || accessRole === `113#115`);
  const isAdmin =
    (accessRole === `            112#700#117#116` ||
      accessRole === ` 112#305#117#116#113#770` ||
      accessRole === `     112#114#700`);
  const isOperations =
    (accessRole === `     112#116#303#305` ||
      accessRole === `   112#304` ||
      accessRole === `   112#305`);
  const isDriver = accessRole === `driver69`;
  const isBrian = accessRole === `brianHR`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActiveSiteVisits());
    dispatch(fetchActiveVehicleRequests());
  }, [dispatch]);

  const canBookSiteVisit = () => {
    if (status === "loading") {
      return false;
    }

    if (activeVisits.length === 0) {
      return true;
    }

    const latestVisit = activeVisits[0];
    return latestVisit.state === "completed";
  };

  // const canRequestVehicle = () => {
  //   if (vehicleRequestStatus === "loading") {
  //     return false;
  //   }

  //   if (activeVehicleRequests.length === 0) {
  //     return true;
  //   }

  //   const latestVehicleRequest = activeVehicleRequests[0];
  //   return latestVehicleRequest.state === "completed";
  // };

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
            {(isMarketer || isHOSorGM || isAdmin || isDriver || isBrian) && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Site Visits</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  {(isMarketer || isAdmin) && (
                    <a
                      href="/book-site-visit"
                      className={`font-medium mt-1 hover:bg-base-200 rounded p-2 ${!canBookSiteVisit() || status === "loading"
                        ? "disabled-link"
                        : ""
                        }`}
                    >
                      Book a Site Visit
                    </a>
                  )}
                  {(isMarketer || isAdmin) && (
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/my-site-visits"
                    >
                      My Site Visits
                    </a>
                  )}
                  {(isAdmin || isDriver) && (
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/assigned-site-visits"
                    >
                      Assigned Site Visits
                    </a>
                  )}
                  {(isHOSorGM || isAdmin || isOperations || isBrian) && (
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/approved-site-visits"
                    >
                      Approved Site Visits
                    </a>
                  )}
                  {(isAdmin || isBrian) && (
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/site-visit-requests"
                    >
                      Site Visit Requests
                    </a>
                  )}
                  {(isHOSorGM || isAdmin || isOperations || isBrian) && (
                    <a
                      className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                      href="/all-site-visits"
                    >
                      All Site Visit Bookings
                    </a>
                  )}
                </div>
              </div>
            )}
            {/* Sites */}
            {(isAdmin || isOperations || isBrian) && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Sites</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  {(isAdmin || isBrian) && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      className="font-medium mt-1 hover:bg-base-200 rounded p-2 disabled opacity-50 pointer-events-none"
                      href="#"
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
                  Request For A Vehicle
                </a>
                {(isAdmin || isBrian) && (
                  <a
                    href="/vehicle-requests"
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                  >
                    Vehicle Requests
                  </a>
                )}
                <a
                  href="/past-vehicle-requests"
                  className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                >
                  My Past Vehicle Requests
                </a>
                {(isAdmin || isOperations || isBrian) && (
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
                      href="/vehicles"
                    >
                      View Vehicles
                    </a>
                  </>
                )}
                {(isAdmin || isDriver) && (
                  <a
                    className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                    href="/assigned-vehicle-requests"
                  >
                    Assigned Vehicle Requests
                  </a>
                )}
              </div>
            </div>
            {/* Clients */}
            {(isMarketer || isHOSorGM || isAdmin || isBrian) && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Clients</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  {(isMarketer || isAdmin) && (
                    <>
                      <a
                        className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                        href="/my-clients-contacts"
                      >
                        My Clients' Contacts
                      </a>
                    </>
                  )}
                  {(isHOSorGM || isAdmin || isBrian) && (
                    <>
                      <a
                        className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                        href="/all-clients-contacts"
                      >
                        All Clients' Contacts
                      </a>
                      {/* <a
                        className="font-medium mt-3 hover:bg-base-200 rounded p-2"
                        href="/clients-feedback"
                      >
                        Clients Feedback
                      </a> */}
                    </>
                  )}
                </div>
              </div>
            )}
            {/* Drivers */}
            {(isAdmin || isBrian) && (
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-bold">Drivers</div>
                <div className="collapse-content -mt-3 flex flex-col menu bg-base-100">
                  <a
                    className="font-medium mt-1 hover:bg-base-200 rounded p-2"
                    href="/drivers"
                  >
                    View Drivers
                  </a>
                </div>
              </div>
            )}
            {/* Users */}
            {(isAdmin || isBrian) && (
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
