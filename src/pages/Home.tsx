
function Home() {
  return (
    <div className=" flex flex-col items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl text-center">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to DailyTrace — <span className="text-teal-600">The Journey to Achieving Your Dreams Starts Here.</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Track your goals, take consistent action, and reflect on your growth every day!
        </p>

        {/* Steps */}
        <div className="text-left mb-8 space-y-4">
          <h2 className="text-2xl font-semibold text-teal-600">How It Works</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-700">
            <li><strong>Step 1:</strong> Create Your Account — Join a community of achievers today.</li>
            <li><strong>Step 2:</strong> Set Your First Goal — Dream big and break your vision into actionable steps.</li>
            <li><strong>Step 3:</strong> Take Daily Action — Consistency is key — one step, one day at a time.</li>
            <li><strong>Step 4:</strong> Reflect and Grow — Track your progress, celebrate the small wins, and keep moving forward.</li>
            <li><strong>Step 5:</strong> See Your Progress — Witness the power of your actions through streaks and milestones.</li>
          </ul>
        </div>

        {/* Quote */}
        <blockquote className="text-xl text-gray-600 italic mb-8">
          "Success doesn’t come from what you do occasionally; it comes from what you do consistently."
          <span className="block text-teal-600 font-semibold">— Marie Forleo</span>
        </blockquote>

        {/* Call to Action */}
        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-500 transition duration-200"
          >
            Start Your Journey
          </a>
          <a
            href="/signin"
            className="px-6 py-3 border border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-100 transition duration-200"
          >
            Already a Member? Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
