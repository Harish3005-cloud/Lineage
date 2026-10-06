/**
 * Loading state component for async data.
 */
export default function LoadingState({ message = 'Loading...', fullPage = false }) {
  return (
    <div className="loading-screen" style={fullPage ? { minHeight: '100vh' } : {}}>
      <div className="spinner spinner-lg"></div>
      <p>{message}</p>
    </div>
  );
}
