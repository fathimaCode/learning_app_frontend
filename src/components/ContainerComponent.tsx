import React, { ReactNode } from "react";

interface containerProps{
    children:ReactNode
    className:string
}
const ContainerComponent:React.FC<containerProps>=({children,className})=>{
return (
    <div className={className}>
     {children}
    </div>
)
}
export default ContainerComponent;