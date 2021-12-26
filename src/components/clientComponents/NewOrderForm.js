import React, { useState } from "react";
import styled from "styled-components";
import { NatureDropDown, PaperFormat, Subjects } from "./newOrderForm.data";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { getUser } from "../../services/auth";
import toast from "react-hot-toast";
import Loader from "react-loader-spinner";

const NewOrderForm = () => {
  const [budgetRange, setBudgetRange] = useState({ min: 200, max: 5000 });
  let budgetRangeString;
  const [price, setPrice] = useState("");
  const [paperFormat, setPaperFormat] = useState("");
  const [nature, setNature] = useState("");
  const [pages, setPages] = useState("");
  const [deadline, setDeadline] = useState("");
  const [spacing, setSpacing] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [waitingButton, setWaitingButton] = useState(false);
  const client_id = getUser().id;
  const orderFormQuery = `mutation addOrder($client_id: Int!, $budgetRangeString: String, $price: Int!, $paperFormat: String, $nature: String, $pages: String, $deadline: String, $spacing: String, $subject: String, $topic: String, $description: String, $files: String) {
    insert_order_one(object: {budget: $budgetRangeString, client_id: $client_id, doc_description: $description, doc_format: $paperFormat, due_time: $deadline, files: $files, nature: $nature, pages: $pages, price: $price, spacing: $spacing, subject: $subject, topic: $topic}) {
      id
    }
  }`;
  const emptyFields =()=>{
    if(price === "" || paperFormat === "" || nature === "" || pages === "" || deadline === "" || subject === "" || topic === "" || description === "" ) return true;
    return false;
  }

  const submitOrder = async () => {
    if(emptyFields()){toast("Fields with stars cant be left empty!",{style:{background:"#DC143C"}});setWaitingButton(false); return false;}
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: orderFormQuery,
        variables: {
          client_id,
          budgetRangeString,
          price,
          paperFormat,
          nature,
          pages,
          deadline,
          spacing,
          subject,
          topic,
          description,
          files,
        },
      }),
    });

    try {
      const finalRes = await response.json();
      console.log(
        "🚀 ~ file: NewOrderForm.js ~ line 48 ~ submitOrder ~ finalRes",
        finalRes
      );
      toast("Your Order Has Been Placed.", {
        style: { background: "#00FF00" },
      });
      setWaitingButton(false);
    } catch (e) {
      console.log("🚀 ~ file: NewOrderForm.js ~ line 59 ~ submitOrder ~ e", e);
      toast("Problem Creating Order.", { style: { background: "#DC143C" } });
      setWaitingButton(false);
    }
  };
  const budgetToString = () => {
    try {
      budgetRangeString = `${budgetRange.min} - ${budgetRange.max}`;
      return true;
    } catch (e) {
      console.log(
        "🚀 ~ file: NewOrderForm.js ~ line 72 ~ budgetToString ~ e",
        e
      );
      setWaitingButton(false);
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setWaitingButton(true);
    console.log("Submitted form");
    budgetToString()
      ? submitOrder()
      : toast("Input Budget Range", {
          style: {
            background: "#DC143C",
          },
        });
  };
  return (
    <Container>
      <Title>Add Order</Title>
      <form onSubmit={handleSubmit}>
        <RowGrid>
          <ColumnGrid>
            <Label>Budget: </Label>
            <div style={{ width: "80%", marginLeft: "1rem" }}>
              <InputRange
                maxValue={30000}
                minValue={200}
                formatLabel={(value) => `${value} Ksh`}
                value={budgetRange}
                onChange={(value) => setBudgetRange(value)}
                onChangeComplete={(value) => console.log(value)}
              />
            </div>
          </ColumnGrid>
          <ColumnGrid>
            <Label>*Price: </Label>
            <Input
              placeholder="EXAMPLE: 2500"
              type="number"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              value={price}
            />
          </ColumnGrid>

          <ColumnGrid>
            <Label>*Paper Format: </Label>
            <InputSelect
              onChange={(event) => setPaperFormat(event.target.value)}
              value={paperFormat}
            >
              {PaperFormat.map((data) => {
                return (
                  <option
                    value={data.paper_format_id}
                    key={data.paper_format_id}
                  >
                    {data.paper_format}
                  </option>
                );
              })}
            </InputSelect>
          </ColumnGrid>
          <ColumnGrid>
            <Label>*Nature: </Label>
            <InputSelect
              onChange={(event) => {
                setNature(event.target.value);
              }}
              value={nature}
            >
              {NatureDropDown.map((data) => {
                return (
                  <option value={data.named_id} key={data.named_id}>
                    {data.name}
                  </option>
                );
              })}
            </InputSelect>
          </ColumnGrid>

          <ColumnGrid>
            <Label>*Pages: </Label>
            <Input
              placeholder="EXAMPLE: 2 pages"
              onChange={(event) => {
                setPages(event.target.value);
              }}
              value={pages}
            />
          </ColumnGrid>
          <ColumnGrid>
            <Label>*Deadline: </Label>
            <Input
              placeholder="EXAMPLE: 4 Days, 2 Hours"
              onChange={(event) => {
                setDeadline(event.target.value);
              }}
              value={deadline}
            />
          </ColumnGrid>

          <ColumnGrid>
            <Label>Spacing: </Label>
            <Input
              placeholder="EXAMPLE: 1.5"
              onChange={(event) => {
                setSpacing(event.target.value);
              }}
              value={spacing}
            />
          </ColumnGrid>
          <ColumnGrid>
            <Label>*Subject: </Label>
            <InputSelect
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              value={subject}
            >
              {Subjects.map((data) => {
                return (
                  <option
                    value={data.subject_named_id}
                    key={data.subject_named_id}
                  >
                    {data.subject_name}
                  </option>
                );
              })}
            </InputSelect>
          </ColumnGrid>
        </RowGrid>

        <ColumnGrid>
          <Label>*Topic: </Label>
          <Input
            placeholder="EXAMPLE: Introductory Physiology"
            onChange={(event) => {
              setTopic(event.target.value);
            }}
            value={topic}
          />
        </ColumnGrid>

        <ColumnGrid>
          <Label>*Description: </Label>
          <TextAreaInput
            type="text"
            placeholder="INFO: Input a summary of the project description. Max of 700 characters"
            maxLength="700"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
          />
        </ColumnGrid>
        <ColumnGrid>
          <Label>Upload File: </Label>
          <Input type="file" />
        </ColumnGrid>
        <ColumnGrid>
          {waitingButton ? (
            <Loader
              type="Bars"
              color="#00BFFF"
              height={40}
              width={40}
              style={{ marginLeft: "40%" }}
            />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </ColumnGrid>
      </form>
    </Container>
  );
};

export default NewOrderForm;

const Container = styled.div`
  display: block;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(190, 190, 190, 0.22);
  cursor: pointer;
  background-color: ${({ theme }) => theme.primary};
  transition: all ease-in-out 300ms;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: clamp(2rem, 1vw, 1rem);
  font-weight: bold;
  margin-left: 40%;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
`;
const ColumnGrid = styled.div`
  margin-left: 1rem;
  display: block;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.h3`
  margin-top: 1px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
`;
const Input = styled.input`
  width: 70%;
  height: 7vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 1rem;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const InputSelect = styled.select`
  width: 70%;
  height: 7vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 0px 0px 0px 1rem;
  border-radius: 5px;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const TextAreaInput = styled.textarea`
  width: 90%;
  height: 20vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 1rem;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 90%;
  height: 7vh;
  background-color: #3900e6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: clamp(1rem, 2vw, 1rem);
  font-weight: bold;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  :active {
    box-shadow: 4px 0 0 8px rgba(0, 0, 0, 0.2);
  }
`;
