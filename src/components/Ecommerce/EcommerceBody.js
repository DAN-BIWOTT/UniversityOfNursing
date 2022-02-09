import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { AllProducts_query } from "../../graphQl/uonQueries";
import SingleProductBody from "./SingleProductBody";

const EcommerceBody = () => {
  const AllOProductsQuery = AllProducts_query;
    useEffect(() => {
        getAllOrders()
    }, []);
    const [product, setProduct] = useState([])
    const getAllOrders = async()=>{
        const response = await fetch(`${process.env.GATSBY_HASURA_URI}`,{
            method:"POST",
            headers:{
                "x-hasura-admin-secret":`${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
                "Content-Type":"Application/Json"
            },
            body: JSON.stringify({
                query: AllOProductsQuery,
            })
        }
        );
        const finalResp = await response.json();
        //console.log(finalResp)
        //console.log(finalResp.data)
        //console.log(finalResp.data.product)
        setProduct(finalResp.data.product)
        //console.log(product)
    }
  return (
    <Container>
      <HeaderSpan>All Papers</HeaderSpan>
      <PapersContainer>
        {product.map((data) => {
          return (
            <PaperCard key={data.id}>
              <SingleProductBody data={data} />
              <PaperFooter>
                <PaperPrice>${data.price}</PaperPrice>
              </PaperFooter>
            </PaperCard>
          );
        })}
      </PapersContainer>
    </Container>
  );
};

export default EcommerceBody;

const Container = styled.div`
  margin-top: 22vh;
  margin-bottom: 3rem;
  margin-left: 3rem;
`;

const HeaderSpan = styled.h1``;
const PapersContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const PaperCard = styled.div`
  width: 395px;
  height: 45vh;
  border-radius: 5px;
  position: relative;
`;


const PaperFooter = styled.div`
  position: absolute;
  bottom: 0px;
  height: 8vh;
  background-color: white;
  width: 100%;
  border-radius: 0px 0px 5px 5px;
`;


const PaperPrice = styled.span`
  color: #000;
  padding-left: 2rem;
  margin-right: 2rem;
  margin-top: 2.2rem;
  font-size: clamp(1rem, 2.2vw, 2rem);
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serify;
`;
