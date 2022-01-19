import React from 'react'
import styled from 'styled-components';

const SearchHeader = () => {
    return (
        <Container>
            <LogoContainer></LogoContainer>
            <SearchContainer>
                <Input placeholder='Search for...' />
            </SearchContainer>
            <CheckOutContainer></CheckOutContainer>
        </Container>
    )
}

export default SearchHeader;

const Container = styled.div`
display: grid;
grid-template-columns: auto auto auto;
`
const LogoContainer = styled.div`

`;

const SearchContainer = styled.div`

`;

const CheckOutContainer = styled.div`

`;
const Input = styled.input`
    width: auto;
    height: 10vh;
    
`;
