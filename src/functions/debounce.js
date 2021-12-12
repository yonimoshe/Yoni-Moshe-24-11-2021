export const debounce = (fn, wait) => {
                let token;
                return (...args) => {
                    if(token) {
                    clearTimeout(token);
                    }
                    
                    token = setTimeout(() => {
                    fn(...args);
                    }, wait);
                }
            }