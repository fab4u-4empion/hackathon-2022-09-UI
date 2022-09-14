import { Header } from "@vkontakte/vkui";

export const TextSeparator = ({text}) => {
    return ( 
        <div className="textSeparator">
            <div className="line"></div>
            <div className="text">
                {text}
            </div>
        </div>
    );
}
 