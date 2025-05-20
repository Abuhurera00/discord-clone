// "use client"

// const ServerIdPage = () => {
//   return (
//     <div>
//       Server ID Page
//     </div>
//   )
// }

// export default ServerIdPage



// app/(main)/servers/[serverId]/page.tsx
// -> NO "use client" here

interface PageProps {
  params: { serverId: string };
}

export default function ServerIdPage({ params }: PageProps) {
  return (
    <div>
      Server ID
    </div>
  );
}
