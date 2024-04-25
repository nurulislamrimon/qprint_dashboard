"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({
  handleChange,
  value,
}: {
  handleChange: (value: string) => void;
  value: string;
}) => {
  const toolbarOptions = [
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const quill = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      modules={quill}
      className="border-none"
      value={value}
      onChange={handleChange}
      theme="snow"
    />
  );
};

export default TextEditor;
