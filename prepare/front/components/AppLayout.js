import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
    return (
        <div>
            <h1>공통메뉴</h1>
            {children}
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;