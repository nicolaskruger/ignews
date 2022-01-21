import { FC, useEffect, useState } from "react"

export const Async: FC = () => {

    const [isButtonVisible, setIsButtonVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsButtonVisible(true)
        }, 1000)
    }, [])
    return (
        <div>
            <div>Hello World</div>
            {isButtonVisible && <button>botao</button>}
            {!isButtonVisible && <button>button</button>}
        </div>
    )
}