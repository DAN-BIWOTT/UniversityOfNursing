import React, { useState } from 'react'
import styled from 'styled-components'
import DetailMain from '../../components/adminPages/DetailMain'
import Nav from '../../components/main/Nav'
import Sidebar from '../../components/sidebar/sidebar'

const OrderDetail = ({location}) => {
    const [ItemOrderId, setItemOrderId] = useState(initialState)
    setItemOrderId(location.state.orderId)
    return (
        <Container>
            <Sidebar/>
            <Nav/>
            {/* <DetailMain orderId={location.state.orderId}/> */}
            <DetailMain orderId={ItemOrderId}/>
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