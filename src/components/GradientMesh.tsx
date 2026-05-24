"use client";

export function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Blue blob */}
      <div
        className="blob-1 absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Purple blob */}
      <div
        className="blob-2 absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Teal blob */}
      <div
        className="blob-3 absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
