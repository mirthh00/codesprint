import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Track",
  description:
    "Track the progress of your website in real time.",
};

export default async function TrackPage({ params }) {
  const project = await prisma.projectLead.findUnique({
    where: { trackingCode: params.code },
  });

  if (!project) return notFound();

  const startedDate = new Date(project.createdAt).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-900 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 shadow-2xl rounded-[2rem] overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-8">
            <p className="text-green-400 uppercase tracking-[0.2em] text-sm font-semibold mb-2">
              Live Project Tracking
            </p>
            <h1 className="text-4xl font-bold">Your Website Sprint Progress</h1>
            <p className="text-gray-300 mt-3 leading-7">
              Follow your build in real time as our developers move through design,
              branding, development, and launch.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Progress card */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5">
                <p className="text-sm text-gray-500">Current Status</p>
                <p className="text-xl font-bold mt-1">{project.projectStatus}</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="text-xl font-bold mt-1 text-green-600">
                  {project.progressPercent}%
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5">
                <p className="text-sm text-gray-500">Started</p>
                <p className="text-xl font-bold mt-1">{startedDate}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Build completion</span>
                <span>{project.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-700"
                  style={{ width: `${project.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Project details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-6">
                <p className="text-sm uppercase tracking-wider text-green-600 font-semibold mb-3">
                  Project Brief
                </p>
                <p className="text-gray-700 leading-8">{project.idea}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6">
                <p className="text-sm uppercase tracking-wider text-green-600 font-semibold mb-3">
                  Preferred Design Direction
                </p>
                <p className="text-gray-700 leading-8">
                  {project.designPreference}
                </p>
              </div>
            </div>

            {/* Midway changes */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">
              <p className="text-lg font-bold text-gray-900 mb-2">
                Need changes while we build?
              </p>
              <p className="text-gray-700 leading-8 mb-4">
                No problem. If you would like to request content updates, layout
                changes, color adjustments, or new sections midway through the
                sprint, email our project team and we’ll log the change into your
                active build queue.
              </p>
              <a
                href="mailto:projects@codesprint.co.za?subject=Project%20Change%20Request"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
              >
                Email change request →
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="border border-gray-300 hover:border-green-600 hover:text-green-600 px-6 py-3 rounded-2xl font-semibold transition"
              >
                Contact Support
              </Link>
              <Link
                href="/"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-2xl font-semibold transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
