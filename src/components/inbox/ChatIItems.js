import { useSelector } from "react-redux";
import { useGetConversationsQuery } from "../../features/conversations/conversationApi";
import ChatItem from "./ChatItem";
import Error from "../ui/Error"
import moment from "moment/moment";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";


export default function ChatItems() {
    const { user } = useSelector(state => state.auth) || {};
    const { email } = user || {};
    const { data: conversations, isLoading, isSuccess, isError, error } = useGetConversationsQuery(email);

    let content = null;




    if (isLoading) {
        content = <li><span>Loading....</span></li>

    }

    else if (isError) {
        content = <li><Error message={error?.data}></Error></li>
    }

    else if (isSuccess && conversations.length === 0) {
        content = <li><span>No conversation found.</span></li>
    }

    else {
        content = conversations.map(conversation => {
            const { id, message, timestamp } = conversation;
            const { name, email: partnerEmail } = getPartnerInfo(conversation?.users, email)

            return <li key={id}>
                <Link to={`/inbox/${id}`}>
                    <ChatItem
                        avatar={gravatarUrl(partnerEmail, {
                            size: 80
                        })}
                        name={name}
                        lastMessage={message}
                        lastTime={moment(timestamp).fromNow()}
                    >
                    </ChatItem>
                </Link>


            </li>


        })
    }

    return (
        <ul>
            {content}

            {/* <li>
                <ChatItem
                    avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    name="Saad Hasan"
                    lastMessage="bye"
                    lastTime="25 minutes"
                />
            </li> */}
        </ul>
    );
}
