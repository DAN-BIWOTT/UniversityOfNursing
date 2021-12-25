import React, { useState } from 'react'
import styled from 'styled-components'
import DetailMain from '../../components/adminPages/DetailMain'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'

const OrderDetail = ({location}) => {
    const [itemOrderId, setItemOrderId] = useState((location.state === undefined)? "":location.state.orderId)
    return (
        <Container>
            <Sidebar permission="admin"/>
            <Nav/>
            <DetailMain orderId={itemOrderId}/>
        </Container>
    )
}

export default OrderDetail

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem 4rem;
`