import Handler from "../types/handler";
import * as commandBridge from "./commands/commandBridge";
import config from "../data/config";

const commandMap = {
    "versions": 0,
    "setversion": 1,
    "version": 0,
    "versioninfo": 1,
    "random": 0,
    "verseoftheday": 0,
    "votd": 0,
    "headings": 1,
    "versenumbers": 1,
    "languages": 0,
    "setlanguage": 1,
    "language": 0,
    "allusers": 0,
    "users": 0,
    "servers": 0,
    "invite": 0,

    "addversion": 5,
    "av": 5
};

/**
 * Verify whether a command actually exists,
 * according to the translation.
 * 
 * @author Elliott Pardee (vypr)
 * 
 * @param {string} command The command that the user is trying to attempt.
 * @param {string} lang The language of the user.
 */
function isCommand(command, lang) {
    const commands = lang.commands;

    let result = {
        ok: false
    };

    // eval is not in the language files, as it's just a wrapper
    if (command == "eval") {
        result = {
            ok: true,
            orig: "eval"
        };
    } else {
        Object.keys(commands).forEach((originalCommandName) => {
            if (commands[originalCommandName] == command) {
                result = {
                    ok: true,
                    orig: originalCommandName
                };
            }
        });
    }

    return result;
}

function isOwnerCommand(command, lang) {
    const commands = lang.commands;

    switch (command) {
        case commands.puppet:
            return true;
        case commands.announce:
            return true;
        case "eval":
            return true;
    }

    return false;
}

/**
 * A CommandHandler that can handle basic
 * commands and functions. It does not interfere
 * with verse processing.
 * 
 * @author Elliott Pardee (vypr)
 * @extends Handler
 */
export default class CommandHandler extends Handler {
    constructor() {
        super("COMMAND_EVENT");
    }

    /**
     * Process a command accordingly.
     * 
     * @param {string} command The command, without the prefix.
     * @param {array of strings} args The arguments of the command (optional).
     * @param {language object} lang The language of the user.
     * @param {user object} sender The sender of the command.
     * @param {function} callback The callback.
     */
    processCommand(command, args = null, lang, sender, callback) {
        if (!Array.isArray(args)) {
            this.processCommand(command, null, lang);
        }

        const rawLanguage = lang.getRawObject();
        const commands = rawLanguage.commands;
        const properCommand = isCommand(command, rawLanguage);

        if (properCommand.ok) {
            if (!isOwnerCommand(properCommand.orig, rawLanguage)) {
                if (properCommand.orig != commands.headings && properCommand.orig != commands.versenumbers) {
                    const requiredArguments = commandMap[properCommand.orig];

                    // let's avoid a TypeError!
                    if (args == null) {
                        args = {
                            length: 0
                        };
                    }

                    if (args.length != requiredArguments) {
                        const response = rawLanguage.argumentCountError
                            .replace("<command>", command)
                            .replace("<count>", requiredArguments);

                        throw new Error(response);
                    }

                    commandBridge.runCommand(properCommand.orig, args, rawLanguage, sender, (result) => {
                        return callback(result);
                    });
                } else {
                    // headings/versenumbers can take 1 or no argument
                }
            } else {
                try {
                    if (sender.id == config.owner) {
                        commandBridge.runOwnerCommand(command, args, (result) => {
                            return callback(result);
                        });
                    }
                } catch (e) {
                    const response = rawLanguage.commandNotFoundError.replace("<command>", command);
                    throw new Error(response);
                }
            }
        } else {
            const response = rawLanguage.commandNotFoundError.replace("<command>", command);
            throw new Error(response);
        }
    }
}
