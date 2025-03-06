import toast from 'react-hot-toast';

const newToast = (type, message, duration) => {
    let newToast;
    switch (type) {
        case 'success':
            newToast = toast.success(message, {
                position: 'top-right',
            });
            break;
        case 'error':
            newToast = toast.error(message, {
                position: 'top-right',
            });
            break;
    }
};

export { newToast };
