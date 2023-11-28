import { connect } from "react-redux";
import { gameNavList } from "../games/GameNavList";
import { startSaveUserPage, updateLogin } from "../../actions/auth";
import { history } from "../../routers/AppRouter";

const subscribers = {}

export const subscribeToKey = ({ key, func }) => {
    subscribers[key] = func;
    console.log("subscribed to key " + key + "function = " + func);
}

export const keystrokeClearinghouse = () => {
    let shifted = false;
    const handleKeyUp = (e) => {
        const key = e.key;
        console.log("key up = " + key);
        if (key === 'Shift') {
            shifted = false;
        }
    }


    const handleKeyDown = (e) => {
        // console.log("key down = " + key);
        let path = window.location.href;
        // console.log("path = " + path);
        // e.preventDefault();
        const key = e.key;
        // console.log("e.keys = " + Object.keys(e));
        e.preventDefault();

        let newIndex = 0;
        switch (key) {
            case 'Shift':
                shifted = true;
                break;
            case 'l':
                //ell
                console.log("ell pressed");
                const subscribed = subscribers.l;
                console.log("subscribed = " + subscribed);
                break;
            case 'Tab':
                console.log("That's a tab!");
                for (var i = 0; i < gameNavList.length; i++) {
                    // console.log(`gameNavList[${i}] = ${JSON.stringify(gameNavList[i])}`)
                    if (path.endsWith(gameNavList[i].path)) {
                        // console.log("current index = " + i);
                        newIndex = i;
                    }
                }
                // console.log("newIndex = " + newIndex);
                // console.log("gameNavList.length = " + gameNavList.length);
                if (shifted) {
                    newIndex--;
                } else {
                    newIndex++;
                }
                if (newIndex >= gameNavList.length) {
                    newIndex = 0;
                }
                if (newIndex < 0)
                    newIndex = gameNavList.length - 1;
                // console.log("newIndex = " + newIndex);
                console.log("new path = " + gameNavList[newIndex].path);
                // startSaveUserPage(gameNavList[newIndex].path);
                history.push(gameNavList[newIndex].path)
            default:
                if (e.ctrlKey) {
                    console.log("ctrl " + key + " pressed");
                }
                else {
                    console.log(key + " pressed");
                }

        }

    }

    document.addEventListener('keypress', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
    };

}

// const mapDispatchToProps = (dispatch) => ({
//     updateLogin: (data) => dispatch(updateLogin(data)),
// });

// export default connect(undefined, mapDispatchToProps)(keystrokeClearinghouse);
