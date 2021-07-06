import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { setImgArray } from "../actions";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AdImageFunc = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const dispatch = useDispatch();

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    dispatch(setImgArray(fileList));
  };

  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType="picture-card"
        fileList={fileList}
        onPreview={(file) => handlePreview(file)}
        onChange={(e) => handleChange(e)}
        accept="image/jpeg image/png"
      >
        {fileList && fileList.length >= 6 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => handleCancel()}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default AdImageFunc;
