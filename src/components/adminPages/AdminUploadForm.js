import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { getUser } from "../../services/auth";
import { sendNotification } from "../../utils/chats";
import { storage } from "../../utils/firebase";

const AdminUploadForm = ({ orderId }) => {
  let files;
  const [waitingButton, setWaitingButton] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const adminFileQuery = `mutation adminAddFile($file: String,$fileName: String,$orderId: Int!) {
  insert_file(objects: {file: $file, fileName: $fileName, order_id: $orderId, sender: "admin"}) {
    affected_rows
  }
}`;

  let notification = {
    clientId:0,
    orderId: 0,
    created_at: 0,
    sender: "",
    msg: "",
  };
  const saveFiles = async() => {
      console.log("This is at save files",files);
      let fileName = selectedFile.name;
      let file = files
    const response = await fetch(`${process.env.GATSBY_HASURA_URI}`, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": `${process.env.GATSBY_HASURA_ADMIN_SECRET}`,
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        query: adminFileQuery,
        variables: {
          orderId,
          fileName,
          file,
        },
      }),
    });
    const finalRes = await response.json();
    console.log(finalRes);
    setWaitingButton(false);
    notification.clientId = getUser().id;
          notification.orderId = orderId;
          notification.created_at = Date.now();
          notification.sender = `From Admin`;
          notification.msg = `Order: ${orderId} : Admin has uploaded a file.`;
          sendNotification(notification);
    toast("File Upload Successful!", {
        style: {
          background: "#3b8334",
        },
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaitingButton(true);
    if (selectedFile !== "") {
      const httpsReference = "files/".concat(selectedFile.name);
      const fileRef = ref(storage, httpsReference);
      try {
        uploadBytes(fileRef, selectedFile).then((url) => {
          getDownloadURL(fileRef).then((downloadUrl) => {
            console.log("🚀 ~ file: AdminUploadForm.js ~ line 44 ~ getDownloadURL ~ downloadUrl", downloadUrl)
            files = downloadUrl;
            console.log("🚀 ~ file: AdminUploadForm.js ~ line 48 ~ getDownloadURL ~ files", files)
            if(files !== "")saveFiles();
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
        setWaitingButton(false)
      toast("Please Select a File to Upload", {
        style: {
          background: "#DC143C",
        },
      });

    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Label>Upload size no more than 80mb</Label>
        <Input type="file"
            onChange={(event) => setSelectedFile(event.target.files[0])}/>
        {waitingButton ? (
            <Loader
              type="Bars"
              color="#00BFFF"
              height={40}
              width={40}
              style={{ marginLeft: "40%" }}
            />
          ) : (
            <Button type="submit">Upload</Button>
          )}
      </Form>
    </div>
  );
};

export default AdminUploadForm;

const Button = styled.button`
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: clamp(1rem, 1vw, 1rem);
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  background-color: #8e6fe1;
  border-radius: 10px;
  border: none;
  color: #fff;
  height: 6vh;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 7vh;
  margin-left: 0px;
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

const Form = styled.form`
  bottom: 0px;
  margin-top: 1rem;
`;
const Label = styled.label`
  padding-left: 2rem;
  font-size: medium;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
