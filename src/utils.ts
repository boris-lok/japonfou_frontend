export const validateEmail = (email: string): boolean => {
    return email.match(
        '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
    ) !== null;
}

export const validatePhone = (phone: string): boolean => {
    return phone.match('^([\+]?[(]?[0-9]{3}[)])?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$') !== null;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
