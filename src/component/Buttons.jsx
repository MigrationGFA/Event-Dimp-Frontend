import PropTypes from "prop-types";

export const ButtonSmallPurple = ({
  onClick,
  type = "button",
  children,
  disabled = false,
  className = "",
  width = "w-[202px]",
  bg = "primary3",
  padding= "4",
  height= "14"
}) => {
  return (
    <button
      className={`${width} h-${height} font-body rounded p-${padding} text-primary1 bg-${bg} opacity-80 hover:opacity-100 ${
        disabled ? "opacity-70" : "opacity-100"
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonLongPurple = ({
  onClick,
  type = "button",
  children,
  disabled = false,
  className = "",
  width = "w-[202px]", // Default width
}) => {
  return (
    <button
      className={`${width} font-body h-14 rounded p-4 text-primary1 bg-primary3 opacity-80 hover:opacity-100 ${
        disabled ? "opacity-70" : "opacity-100"
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonSmallWhite = ({
  onClick,
  type = "button",
  children,
  disabled = false,
  className = "",
  width = "w-[202px]",
  padding='4'
}) => {
  return (
    <button
      className={`${width} font-body h-14 rounded p-${padding} text-primary4 bg-primary1 border border-primary3 opacity-80 hover:opacity-100 ${
        disabled ? "opacity-70" : "opacity-100"
      } ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonForTabs = ({
  onClick,
  type = "button",
  disabled = false,
  className = "",
  label,
}) => {
  return (
    <button
      type={type}
      className={`text-primary3 ${className} font-body`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};


// PropTypes for the width prop
ButtonSmallWhite.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string, // New prop
};

ButtonLongPurple.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string, // New prop
};

ButtonSmallPurple.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.string, // New prop
};

ButtonForTabs.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
