import { Icon } from '@iconify/react'
import React from 'react'
import styled from 'styled-components'

const NewUserBtn = () => {
    return (
        <AddButton>
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
    cursor: pointer;
`
const AddIcon = styled(Icon)`
    color: #FFF;
    font-size: 30;
`
