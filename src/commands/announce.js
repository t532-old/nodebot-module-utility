import { safeLoad } from 'js-yaml'
import { readFileSync } from 'fs'
const { operators } = safeLoad(readFileSync('config.yml'))
export default {
    args: '<announcement> [groups...]',
    options: ['include', 'except'],
    /**
     * Runs a batch command
     * @param {ContentMessage} msg The universal msg object
     * @param {{ announcement: string, groups: string[] }} - the announcement info
     * @param {string[]} type - the filter type
     */
    async action(msg, { announcement, groups }, [ type ]) {
        if (operators.includes(msg.param.user_id)) {
            const groupList = (await msg.static().groupList()).map(i => i.group_id.toString())
            for (let i of groupList)
                if (
                    (type === 'include' && groups.includes(i)) ||
                    (type === 'except' && !groups.includes(i)) ||
                    !type
                ) {
                    msg.static().group(i, announcement)
                    msg.static().log.modLog('utility[announce]', `sent announcement ${JSON.stringify(announcement)} to group ${i}`)
                }
        }
    }
}