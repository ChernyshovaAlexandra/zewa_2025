import { Icon24Gift } from "@vkontakte/icons"
import { Avatar } from "@vkontakte/vkui"
import { Notification, NotificationCell } from "./style"

type NotificationProps = {
    text: string
}

const NotificationContainer: React.FC<NotificationProps> = ({ text }) => {
    return (
        <NotificationCell
            before={
                <Avatar gradientColor="blue" size={36}>
                    <Icon24Gift />
                </Avatar>
            }>
            <Notification>{text}</Notification>
        </NotificationCell>
    )
};


export default NotificationContainer;
