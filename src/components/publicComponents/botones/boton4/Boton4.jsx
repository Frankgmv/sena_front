import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Boton4.css";

const Boton4 = ({ link, type, id, name }) => {
    return (
        <div>
            <Link to={link}>
                <button type={type} className="button" id={id}>
                    {name}
                </button>
            </Link>
        </div>
    );
};

Boton4.propTypes = {
    link: PropTypes.string, // Required string for the route Link
    type: PropTypes.oneOf(["button", "submit", "reset"]), // Enforce specific button types
    id: PropTypes.string.isRequired, // Required string for the button ID
    name: PropTypes.string.isRequired, // Required string for the button text
};

Boton4.defaultProps = {
    type: "button",
    name: "Fill name property",
};
export default Boton4;
