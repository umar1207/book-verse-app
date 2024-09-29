const Popover = ({ message, isVisible }) => {
    return (
      <div
        className={`fixed top-20 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: isVisible ? 'block' : 'none' }}
      >
        {message}
      </div>
    );
  };
  
  export default Popover;
  