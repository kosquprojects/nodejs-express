(function () {
    getnotify = function(noteStyle, noteShadow, noteOpacity, noteStack, mess_status, mess_body) {
        try {
            var noteStyle = noteStyle; //'warning';
            var noteShadow = noteShadow;
            var noteOpacity = noteOpacity;
            var noteStack = 'stack_bottom_right';
            var width = "300px";

            // If notification stack or opacity is not defined set a default
            var noteStack = noteStack ? noteStack : "stack_top_right";
            var noteOpacity = noteOpacity ? noteOpacity : "1";

            // We modify the width option if the selected stack is a fullwidth style
            function findWidth() {
                if (noteStack == "stack_bar_top") {
                    return "100%";
                }
                if (noteStack == "stack_bar_bottom") {
                    return "70%";
                } else {
                    return "300px";
                }
            }
            // Create new Notification
            new PNotify({
                title: mess_status,
                text: mess_body,
                shadow: noteShadow,
                opacity: noteOpacity,
                addclass: noteStack,
                type: noteStyle,
                stack: Stacks[noteStack],
                width: findWidth(),
                delay: 1400
            });
            if(mess_status === 'Token Expired !' || mess_status === 'Invalid Token !'){
                setTimeout(() => {
                    window.location = '/logout'
                }, 3000);
            }
        } catch (error) {
            alert(error);
        }
    };

    var Stacks = {
        stack_top_right: {
            "dir1": "down",
            "dir2": "left",
            "push": "top",
            "spacing1": 10,
            "spacing2": 10
        },
        stack_bottom_right: {
            "dir1": "down",
            "dir2": "left",
            "push": "bottom",
            "spacing1": 10,
            "spacing2": 10
        }
    }
})();