import React, { useRef, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import "./styles/App.css";

function App() {
  const filesElement = useRef(null);
  const [files, setFiles] = useState([]);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append("file", file);
    }
    const res = await fetch(`http://localhost:4000/products`, {
      method: "POST",
      body: dataForm,
    });
    const data = await res.json();
    setFiles(data);
  };

  return (
    <div className="main-div">
      <h1 className="title">Upload Your .csv File</h1>
      <h1><AiOutlineArrowDown /></h1>
      <div className="div-input-file">
        <input className="input-file" type="file" multiple ref={filesElement} />
        <button className="input-file-btn" onClick={sendFile}>Send file</button>
      </div>

      <div className="div-map-products">
        {files.map((item) => (
          <div className="div-products">
            <strong>
              <h4 style={{color: "green"}}>Produto</h4>
              {item.product}
            </strong>
            <strong>
              <h4 style={{color: "rgb(194, 57, 57)"}}>Preço</h4>
              {item.product_price}
            </strong>
            <strong>
              <h4 style={{color: "yellow"}}>Quantidade</h4>
              {item.product_quantity}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
