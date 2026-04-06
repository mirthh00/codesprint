import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const projects = await prisma.projectLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-2xl p-6">
            <h2 className="font-bold text-xl">{project.name}</h2>
            <p>{project.email}</p>
            <p>Status: {project.projectStatus}</p>
            <p>Progress: {project.progressPercent}%</p>
          </div>
        ))}
      </div>
    </main>
  );
}