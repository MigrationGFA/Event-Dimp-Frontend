import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import PropTypes from "prop-types";

export const AlertDanger = ({ message, title }) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <p className="font-semibold font-body">{title}!</p>
      <p className="font-medium font-body">{message}</p>
    </Alert>
  );
};

AlertDanger.propTypes = {
  message: PropTypes.node.isRequired,
  title: PropTypes.string,
};
