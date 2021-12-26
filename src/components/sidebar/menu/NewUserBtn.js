import { Icon } from '@iconify/react'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const NewUserBtn = () => {
    return (
        <AddButton as={Link} to="/clientPages/NewOrder">
            <AddIcon icon={`mdi-light:plus`} inline={false} />
        </AddButton>
    )
}

export default NewUserBtn

const AddButton = styled.a`
    background-color: ${({theme})=>theme.colorGreen};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    position: absolute;
    top: 6rem;
    right: 7rem;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
    cursor: pointer;
    &:active{
        box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    }
    &:hover{
        box-shadow: 0px 7px 12px 0px rgba(0,0,0,0.2);
    }
`
const AddIcon = styled(Icon)`
    color: #FFF;
    font-size: clamp(4rem,4vw,4rem);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
`
