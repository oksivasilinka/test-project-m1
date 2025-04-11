import  {ReactNode} from "react";

type SubTitleProps = {
    children: ReactNode
}

export const SubTitle = ({children}: SubTitleProps) => (
    <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)