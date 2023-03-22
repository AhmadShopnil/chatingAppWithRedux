// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessageQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
    const { id } = useParams()
    const { data: messages, isSuccess, isLoading, isError, error } = useGetMessageQuery(id);

    let content = null;

    if (isLoading) {
        content = <li><span>Loading....</span></li>
    }

    else if (isError) {
        content = <div ><Error message={error?.data}></Error></div>
    }

    else if (isSuccess && messages?.length === 0) {
        content = <div><span>No Messages found.</span></div>
    }
    else {
        content = <div>
            <ChatHead
                avatar="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                name="Akash Ahmed"
            />
            <Messages messages={messages} />
            <Options />
        </div>
    }


    return (
        <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
                {content}

                {/* <Blank /> */}
            </div>
        </div>
    );
}
