export default function waitGrecaptcha() {
    return new Promise<void>(resolve => {
        window.grecaptcha.ready(() => {
            resolve()
        })
    })
}
