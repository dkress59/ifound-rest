const logToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.log(...logs)
}

exports.logToConsole = logToConsole

const logErrorToConsole = (...logs) => {
	if (process.env.NODE_ENV === 'development')
		console.error(...logs)
}

exports.logErrorToConsole = logErrorToConsole