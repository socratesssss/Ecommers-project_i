

const Loading = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6 mx-auto animate-pulse"></div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        {/* Skeleton cart items */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex gap-3 items-start border-b-1 border-gray-400 pb-4 animate-pulse">
            <div className="w-20 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
            <div className="flex flex-col justify-between w-full">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>

                <div className="h-6 w-16 bg-gray-200 rounded-sm"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Skeleton subtotal */}
        <div className="flex items-center justify-between mb-2 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="w-6"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>

        {/* Skeleton buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 animate-pulse">
          <div className="hidden md:block flex-1 h-12 bg-gray-200 rounded-md"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
export default Loading