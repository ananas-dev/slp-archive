import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { mutate } from "swr";

const SlpUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [fileName, setFileName] = useState("Upload a Slippi File");
  const [message, setMessage] = useState("");

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    setFileName(event.target.files[0].name)
  };


  const upload = () => {
    let currentFile = selectedFiles[0];
    const formData = new FormData();
    formData.append("file",currentFile)
    axios.post("api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {
        mutate("/api/files")
        setFileName("Upload a Slippi File");
        setMessage(response.data.message);
      })
      .catch((e) => {
        setFileName("Upload a Slippi File")
        setMessage("Could not upload the file!")
      })
    setSelectedFiles(undefined);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Form>
          <Form.Row>
            <Col md="auto">
              <Form.File 
                id="custom-file"
                label= {fileName}
                custom
                onChange={selectFile}
                accept=".slp"
              />
            </Col>
            <Col>
              <Button
                variant="success"
                disabled={!selectedFiles}
                onClick={upload}>
                  Upload
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
      <Row>
        <Alert
          variant="light">
            {message}
        </Alert>
      </Row>
    </Container>
  );
};

export default SlpUpload;