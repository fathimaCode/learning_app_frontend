import { ReactNode } from "react"

interface buttonProps{
    onClick?:()=>void
    className:string
    children:ReactNode
    type?: "button"|"submit"|"reset"
}
const ButtonComponent:React.FC<buttonProps>=({onClick,className,children,type="button"})=>{
return (
    <button className={className} type={type} onClick={onClick}>{children}</button>
)
}
export default ButtonComponent