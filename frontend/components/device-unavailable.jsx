export function DeviceUnavailable() {
  return (
    <div className="hidden sm:flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">
        This app is only available on mobile.
      </h1>
      <p className="mt-4 text-lg">
        Please visit this page on your mobile device.
      </p>
    </div>
  );
}