import React from "react"
import PropTypes from "prop-types"

const Nav = (props) => {
  return (
    <React.Fragment>
      Menu: {props.menu}
    </React.Fragment>
  )
}

Nav.propTypes = {
  menu: PropTypes.string
};

export default Nav
