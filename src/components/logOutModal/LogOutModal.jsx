import {useNavigate} from "react-router-dom";
import Modal from "@/components/modal/Modal";
import {Button, Text} from "@/components/ui";
import {Heading} from "@/components/ui/Heading/Heading";
import {useAuthRedux} from "@/hooks/useAuthRedux";
import {useDeviceType} from "@/hooks/useDeviceType";
import styles from "./LogOutModal.module.css";

const LogOutModal = ({onClose}) => {
    const navigate = useNavigate();
    const {logout, isSignOutLoading} = useAuthRedux();

    const deviceType = useDeviceType();

    const titleText = deviceType.isMobile ? "Log out" : "Are you logging out?";

    const handleCancel = () => {
        onClose();
    };

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            onClose();
            navigate("/");
        }
    };

    return (
        <Modal onClose={onClose}>
            <div className={styles.content}>
                <Heading level={1} size="lg" className={styles.title}>
                    {titleText}
                </Heading>

                <Text className={styles.text}>
                    You can always log back in at any time.
                </Text>

                <div className={styles.buttonGroup}>
                    <Button
                        variant={Button.variants.PRIMARY}
                        onClick={handleLogOut}
                        type="button"
                        className={styles.logoutButton}
                        href={null}
                        to={null}
                        isLoading={isSignOutLoading}
                        disabled={isSignOutLoading}
                    >
                        Log out
                    </Button>
                    <Button
                        variant={Button.variants.SECONDARY}
                        onClick={handleCancel}
                        type="button"
                        className={styles.cancelButton}
                        href={null}
                        to={null}
                        isLoading={false}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LogOutModal;
