// src/pages/CheckIn.jsx

export default function CheckIn() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Hostel Check-In</h2>
          <p className="text-gray-600 text-sm mb-6 text-center">
            Please enter your details to complete the check-in process.
          </p>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Room Preference</label>
              <select className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none">
                <option>Single</option>
                <option>Shared</option>
                <option>Dormitory</option>
              </select>
            </div>
  
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              Check In
            </button>
          </form>
  
          <p className="text-xs text-gray-500 text-center mt-6">By checking in, you agree to our terms and policies.</p>
        </div>
      </div>
    );
  }
  