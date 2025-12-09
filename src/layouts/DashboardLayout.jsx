// src/layouts/DashboardLayout.jsx
import React from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaMotorcycle, FaRegCreditCard, FaTasks, FaUsers } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import { RiEBikeFill } from 'react-icons/ri';
import { SiGoogletasks } from 'react-icons/si';
import logoImg from '../assets/logo.png';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      // optionally navigate away or show toast from caller
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        {/* NAVBAR */}
        <header className="w-full bg-base-300 border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <label
                htmlFor="dashboard-drawer"
                aria-label="Open sidebar"
                className="btn btn-ghost lg:hidden p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>

              <Link to="/" className="flex items-center gap-3">
                <img src={logoImg} alt="Logo" className="h-9 w-9 object-contain" />
                <span className="font-semibold">Garments Order & Production Tracker</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm">{(user.displayName || 'U').charAt(0).toUpperCase()}</span>
                      </div>
                    )}

                    <div className="hidden md:block">
                      <div className="text-sm font-medium">{user.displayName || user.email}</div>
                      <div className="text-xs text-gray-500">{role || 'user'}</div>
                    </div>

                    <button
                      onClick={handleLogout}
                      aria-label="Log out"
                      className="btn btn-ghost btn-sm ml-2"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                  <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT (OUTLET) */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" aria-hidden="true"></label>

        <aside className="w-64 bg-base-200 border-r min-h-screen">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-bold">G.O.P Tracker</div>
                <div className="text-xs text-gray-500">Dashboard</div>
              </div>
            </Link>
          </div>

          <nav className="p-2">
            <ul className="menu w-full">
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Home page</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-parcels">
                  <CiDeliveryTruck className="inline-block mr-2" />
                  <span>My Parcels</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaRegCreditCard className="inline-block mr-2" />
                  <span>Payment History</span>
                </NavLink>
              </li>

              {role === 'rider' && (
                <>
                  <li>
                    <NavLink to="/dashboard/assigned-deliveries">
                      <FaTasks className="inline-block mr-2" />
                      <span>Assigned Deliveries</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/completed-deliveries">
                      <SiGoogletasks className="inline-block mr-2" />
                      <span>Completed Deliveries</span>
                    </NavLink>
                  </li>
                </>
              )}

              {role === 'admin' && (
                <>
                  <li>
                    <NavLink to="/dashboard/approve-riders">
                      <FaMotorcycle className="inline-block mr-2" />
                      <span>Approve Riders</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/assign-riders">
                      <RiEBikeFill className="inline-block mr-2" />
                      <span>Assign Riders</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/users-management">
                      <FaUsers className="inline-block mr-2" />
                      <span>Users Management</span>
                    </NavLink>
                  </li>
                </>
              )}

              <li className="mt-4">
                <NavLink to="/dashboard/profile">
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="7" r="4" strokeWidth="1.5"/>
                    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t mt-auto w-full">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} G.O.P Tracker</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
