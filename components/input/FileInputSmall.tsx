import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useState } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FileInputSmall = ({ ...props }: UploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file?.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file?.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file?.url!.substring(file?.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action={process.env.NEXT_PUBLIC_CLOUDINARY_URL}
        listType="picture-card"
        fileList={fileList}
        multiple={false}
        className="!tw-w-full"
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}
        data={{ upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET }}
        {...props}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
