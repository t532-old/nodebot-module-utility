export default {
    args: '[txt...]',
    options: [],
    /**
     * Returns the text directly to the user
     * @param {ContentMessage} msg The universal msg object
     * @param {{ txt: string[] }} txt The texts user sends
     */
    async action(msg, { txt }) { msg.send(txt.filter(i => msg.static().injectionChecker.test(i) === false).join(' ')) }
}