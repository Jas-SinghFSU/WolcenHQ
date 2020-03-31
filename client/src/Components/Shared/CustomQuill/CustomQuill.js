import React from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./style.css";

let quilIcons = Quill.import("ui/icons");
quilIcons["bold"] = '<i class="fas fa-bold"></i>';
quilIcons["italic"] = '<i class="fas fa-italic"></i>';
quilIcons["underline"] = '<i class="fas fa-underline"></i>';
quilIcons["strike"] = '<i class="fas fa-strikethrough"></i>';
quilIcons["blockquote"] = '<i class="fas fa-quote-right"></i>';
quilIcons["indent"]["+1"] = '<i class="fas fa-indent"></i>';
quilIcons["indent"]["-1"] = '<i class="fas fa-outdent"></i>';
quilIcons["list"]["ordered"] = '<i class="fas fa-list-ol"></i>';
quilIcons["list"]["bullet"] = '<i class="fas fa-list-ul"></i>';
quilIcons["link"] = '<i class="fas fa-link"></i>';
quilIcons["color"] = '<i class="fas fa-palette" size="2x"></i>';
quilIcons["align"][""] = '<i class="fas fa-align-left"></i>';
quilIcons["align"]["center"] = '<i class="fas fa-align-center"></i>';
quilIcons["align"]["right"] = '<i class="fas fa-align-right"></i>';
quilIcons["align"]["justify"] = '<i class="fas fa-align-justify"></i>';

const quillBoxModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" }
    ],
    [{ indent: "-1" }, { indent: "+1" }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ color: [] }]
  ]
};

const doNothingFunction = () => {
  console.error("Must provide an onChange function.");
  return;
};

const CustomQuill = props => {
  return (
    <ReactQuill
      className={props.className}
      value={props.value || ""}
      onChange={props.onChange || doNothingFunction}
      theme={props.theme || "snow"}
      modules={quillBoxModules}
    />
  );
};

export default CustomQuill;
