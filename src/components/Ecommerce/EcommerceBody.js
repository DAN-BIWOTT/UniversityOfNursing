import React from 'react'
import styled from 'styled-components';

const EcommerceBody = () => {
    return (
        <Container>
            <HeaderSpan>All Papers</HeaderSpan>
            <PapersContainer>
                <PaperCard></PaperCard>
            </PapersContainer>
        </Container>
    )
}

export default EcommerceBody;

const Container = styled.div``;

const HeaderSpan = styled.h1``;
const PapersContainer = styled.div`
display: grid;
grid-template-columns: auto auto auto;
`

const PaperCard = styled.div`
width: 395px;
height: 260px;
background-color: grey;
`