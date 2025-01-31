import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FormComp = ({ title, fields, onSubmit, onClose, show }) => {
  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    const initialFormData = fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.value || "" }),
      {}
    );
    setFormData(initialFormData);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map((field, index) => (
            <Form.Group key={index} className="mb-3">
              <Form.Label>{field.label}</Form.Label>
              {field.type === "select" ? (
                <Form.Select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormComp;
