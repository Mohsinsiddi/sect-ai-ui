import JoinSectClient from './JoinSectClient';

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await the params
  const resolvedParams = await params;

  return <JoinSectClient token={resolvedParams.token} />;
}
