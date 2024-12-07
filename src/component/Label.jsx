import PropTypes from "prop-types";

export const LabelImportant = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-1 font-body">
      {children} <span className="text-sec8">*</span>
    </label>
  );
};

LabelImportant.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
};
