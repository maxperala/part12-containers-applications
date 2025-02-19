import userUtils from "../utils/userUtils";
import PropTypes from "prop-types";

const LoggedIn = ({user, setUser, showNotification}) => {

    const onLogOut = () => {
        userUtils.logout(setUser);
        showNotification("Logged out")
    }
    return (
        <div>
            <p>Logged in as {user.name}</p>
            <button onClick={onLogOut}>Logout</button>
        </div>
    )
}


LoggedIn.propTypes = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}



export default LoggedIn;