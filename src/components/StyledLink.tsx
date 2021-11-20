import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from '@emotion/styled';
//----------------------------------------------------------

interface IProps extends LinkProps { }

const StyledLink: React.FC<IProps> = ({ children, ...rest }) => {
    return (
        <Link {...rest}>
            {children}
        </Link>
    )
}

//-------------------- Styles --------------------------

const Link = styled(RouterLink)`
    text-decoration: none;
    color: inherit;
    
    &:hover {
        text-decoration: underline;
    }
`;

export default StyledLink;