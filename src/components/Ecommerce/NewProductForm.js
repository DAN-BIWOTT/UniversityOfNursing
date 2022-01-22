import React, { useState } from "react";
import styled from "styled-components";
import {
  LineSpacing,
  NatureDropDown,
  PaperFormat,
  Subjects,
} from "../clientComponents/newOrderForm.data.js";
import "react-input-range/lib/css/index.css";
import toast from "react-hot-toast";
import Loader from "react-loader-spinner";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { NewProduct_query } from "../../graphQl/uonQueries";
import { navigate } from "gatsby";

const NewProductForm = () => {
  const [price, setPrice] = useState("");
  const [paperFormat, setPaperFormat] = useState("");
  const [nature, setNature] = useState("");
  const [pages, setPages] = useState("");
  const [spacing, setSpacing] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let files = "";
  const [waitingButton, setWaitingButton] = useState(false);
  const newProductQuery = NewProduct_query;
  const [selectedFile, setSelectedFile] = useState("");

  const emptyFields = () => {
    if (
      price === "" ||
      paperFormat === "" ||
      nature === "" ||
      pages === "" ||
      subject === "" ||
      title === "" ||
      description === ""
    )
      return true;
    return false;
  };

  const submitOrder = async () => {
    if (emptyFields()) {
      toast("Fields with stars cant be left empty!", {
        style: { background: "#DC143C" },
      });
      setWaitingButton(false);
      return false;
    }
    let fileName = selectedFile.name;
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: newProductQuery,
        variables: {
          price,
          paperFormat,
          nature,
          pages,
          spacing,
          subject,
          title,
          description,
          files,
          fileName,
        },
      }),
    });

    try {
      const finalRes = await response.json();
      console.log(finalRes);
      toast("Product has been posted.", {
        style: { background: "#008000" },
      });
      setWaitingButton(false);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      setWaitingButton(false);
    } catch (e) {
      toast("Problem Posting Product.", { style: { background: "#DC143C" } });
      setWaitingButton(false);
    }
  };

  // uploadFile(selectedFile);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingButton(true);
    if (selectedFile !== "") {
      const httpsReference = "files/".concat(selectedFile.name);
      const fileRef = ref(storage, httpsReference);
      try {
        uploadBytes(fileRef, selectedFile).then((url) => {
          getDownloadURL(fileRef).then((downloadUrl) => {
            files = downloadUrl;
            files !== ""
              ? submitOrder()
              : toast("Please select file", {
                  style: {
                    background: "#DC143C",
                  },
                });
          });
        });
      } catch (error) {
        toast("File Upload Failed.", {
          style: {
            background: "#DC143C",
          },
        });
        return false;
      }
    } else {
      toast("Please Select File", {
        style: {
          background: "#DC143C",
        },
      });
    }
  };

  return (
    <Container>
      <Title>Add Product</Title>
      <form onSubmit={handleSubmit}>
        <RowGrid>
          <ColumnGrid>
            <Label>*Price: </Label>
            <Input
              placeholder="EXAMPLE: $25"
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
            <Label>Spacing: </Label>
            <InputSelect
              onChange={(event) => setSpacing(event.target.value)}
              value={spacing}
            >
              {LineSpacing.map((data) => {
                return (
                  <option value={data.lineSpace} key={data.lineSpace_id}>
                    {data.lineSpace}
                  </option>
                );
              })}
            </InputSelect>
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
          <Label>*Title: </Label>
          <Input
            placeholder="EXAMPLE: Introductory Physiology"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
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
          <p>Upload a single compressed file (.rar,.zip etc) upto 80mb</p>
          <Label>Upload File: </Label>
          <Input
            type="file"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
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

export default NewProductForm;

const Container = styled.div`
  display: block;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(190, 190, 190, 0.22);
  cursor: pointer;
  background-color: #fff;
  transition: all ease-in-out 300ms;
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  &:hover {
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
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  padding: 1rem;
  border-radius: 5px;
  :focus {
    outline: none;
    border: none;
    border-bottom: #1740e1;
    box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  }
`;

const InputSelect = styled.select`
  width: 70%;
  height: 8vh;
  margin-left: 10px;
  font-size: clamp(1rem, 1vw, 1rem);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  padding: 0px 0px 0px 1rem;
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
  padding: 1rem;
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
  border-radius: 5px;
  border: none;
  border-bottom: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(23, 64, 225, 0.2);
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
  background-color: #8e6fe1;
  border: none;
  border-bottom: 1px solid black;
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
