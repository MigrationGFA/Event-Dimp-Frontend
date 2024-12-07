import React, { forwardRef } from "react";
import PropTypes from "prop-types";


const disallowedCharacters = /[<>{};]/;


const handleKeyDown = (e) => {
  if (disallowedCharacters.test(e.key)) {
    e.preventDefault();
  }
};


export const ShortInputWithPlaceholder = forwardRef(
  (
    {
      placeholder = "Enter text...",
      className = "",
      size = "base",
      color = "gray-500",
      weight = "font-normal",
      lineHeight = "leading-7",
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`font-body bg-sec4 rounded border text-${size} placeholder-${color} ${weight} ${lineHeight} ${className} border p-2 outline-none`}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

// LongInputWithPlaceholder Component
export const LongInputWithPlaceholder = forwardRef(
  (
    {
      placeholder = "Enter text...",
      className = "",
      size = "base",
      color = "gray-500",
      weight = "font-normal",
      lineHeight = "leading-7",
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`w-full h-12 font-body rounded border text-${size} placeholder-${color} ${weight} ${lineHeight} ${className} border p-2 outline-none`}
        placeholder={placeholder}
        onKeyDown={handleKeyDown} 
        onChange={onChange}
        {...rest}
      />
    );
  }
);

// MediumInputWithPlaceholder Component
export const MediumInputWithPlaceholder = forwardRef(
  (
    {
      placeholder = "Enter text...",
      className = "",
      size = "base",
      color = "gray-500",
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={`w-full h-12 font-body rounded border p-2 outline-none ${className} text-${size} placeholder-${color}`}
        placeholder={placeholder}
        onKeyDown={handleKeyDown} // Block disallowed characters
        onChange={onChange}
        {...rest}
      />
    );
  }
);

// EditTemplateLongInput Component
export const EditTemplateLongInput = forwardRef(
  (
    {
      placeholder = "Enter text...",
      className = "",
      size = "base",
      color = "gray-500",
      weight = "font-normal",
      lineHeight = "leading-7",
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        className={`w-full h-20 font-body rounded border text-${size} placeholder-${color} ${weight} ${lineHeight} ${className} border p-2 outline-none`}
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown} // Block disallowed characters
        onChange={onChange}
        {...rest}
      />
    );
  }
);

// PropTypes validation
EditTemplateLongInput.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  lineHeight: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

LongInputWithPlaceholder.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  lineHeight: PropTypes.string,
};

MediumInputWithPlaceholder.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  lineHeight: PropTypes.string,
};

ShortInputWithPlaceholder.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  lineHeight: PropTypes.string,
};
