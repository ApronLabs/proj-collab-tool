export default function NotAuthenticatedPage() {
  const salesKeeperUrl = process.env.SALES_KEEPER_URL || "http://13.210.110.218";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h1>
        <p className="text-sm text-gray-500 mb-6">
          Collab 도구를 사용하려면 Sales Keeper에서 먼저 로그인해주세요.
        </p>
        <a
          href={`${salesKeeperUrl}/login`}
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
        >
          Sales Keeper 로그인
        </a>
      </div>
    </div>
  );
}
