import React from "react";

interface labelProps{
text:string,
className:string
}
const LabelComponent:React.FC<labelProps>= ({text,className})=>{
return (
    <span className={className}>
        {text}
    </span>
);
}

export default LabelComponent;