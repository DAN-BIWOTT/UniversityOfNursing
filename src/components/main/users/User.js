import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const User = ({ data }) => {
  console.log("🚀 ~ file: User.js ~ line 6 ~ User ~ data", data);

  const { budget, due_time, id, pages, subject, price, topic, created_at } =
    data;
  const date = `${new Date(created_at).getDate()}/${new Date(
    created_at
  ).getMonth()}/${new Date(created_at).getFullYear()}`;

  return (
    <Container>
      <Property>
        <PropertyImg src="https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        <PropertyText>
          <PropertyStreet>
            <OrderLink to={`/adminPages/OrderDetail`} state={{ orderId: id }}>
              {id}
            </OrderLink>
          </PropertyStreet>
          <Subtitle>{/* {firstName} {lastName} */}</Subtitle>
        </PropertyText>
      </Property>
      <Subject>{subject}</Subject>
      <Topic>{topic}</Topic>
      <UserWrapper>
        <Text>{pages}</Text>
        <Subtitle>Pages or word</Subtitle>
      </UserWrapper>
      <UserWrapper>
        <Text>{price}/=</Text>
        <Subtitle>Budget {budget}</Subtitle>
      </UserWrapper>
      <UserWrapper>
        <Text>{due_time}</Text>
        <Subtitle>From: {date}</Subtitle>
      </UserWrapper>
      {/* <Status>
                <Text>Time left</Text>
                {(() => {
                    switch (level) {
                        case 101: return <StatusIndicator color="#F17E7E" />;
                        case 202: return <StatusIndicator color="#FFD056" />;
                        case 303: return <StatusIndicator color="#75C282" />;
                        default: return <StatusIndicator color="#AAA5A5" />;
                    }
                })()}
            </Status> */}
    </Container>
  );
};

export default User;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(190, 190, 190, 0.22);
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  transition: all ease-in-out 300ms;
  &:hover {
    /* box-shadow: 0px 10px 8px -8px rgba(138, 153, 192, 0.6); */
    background-color: ${({ theme }) => theme.secondary};
  }
`;
const Text = styled.h1`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textColor};
  margin: 0;
`;

const Subtitle = styled(Text)`
  font-size: 0.6rem;
  color: #b2bfe1;
  margin-top: 2px;
`;

const Property = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;

const PropertyText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const PropertyImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;
const PropertyStreet = styled(Text)`
  font-size: 1rem;
`;
const Subject = styled(Text)`
  width: 15%;
`;
const Topic = styled(Text)`
  width: 10%;
`;
const UserWrapper = styled.div`
  width: 15%;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
`;
const StatusIndicator = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  margin-left: 1rem;
  position: absolute;
  right: 7rem;
`;
const OrderLink = styled(Link)`
  width: 10rem;
  font-size: 1rem;
  font-weight: 700;
  background-color: transparent;
  color: #6b6b6b;
  border-radius: 5rem;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all ease-in-out 300ms;
  &:hover {
    box-shadow: 0px 0px 7px rgba(128, 74, 216, 0.6);
  }
`;
