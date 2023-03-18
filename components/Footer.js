export default function Footer({ data }) {
  const isDataEmpty = data.length === 0;
  const containerClassName = isDataEmpty ? 'fixed bottom-0' : 'flex-grow';

  return(
    <div className={`w-full ${containerClassName}`}>
      <footer className="bg-blue-300 border-t-2 border-solid border-black h-16 text-center text-dark-gray-500 w-full flex-shrink-0">
        <p> &copy; Code Fellows 2023</p>
      </footer>
    </div>
  );
}