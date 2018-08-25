import { exec } from 'child_process'
import { promisify } from 'util'
const execPromise = promisify(exec)
export default {
    args: '<command>',
    options: [],
    /**
     * Runs a batch command
     * @param {ContentMessage} msg The universal msg object
     * @param {{ command: string}} - A batch command
     */
    async action(msg, { command }) {
        if (msg.static().config.operators.includes(msg.param.user_id)) {
            let result
            try { result = await execPromise(`chcp 65001 && ${command}`) }
            catch (err) { 
                msg.send(`utility: batch: error occured, stacktrace:\n${err.stack}`)
                return
            }
            msg.send(`utility: batch: operation done, result:\n${result.stdout}`)
        }
    }
}