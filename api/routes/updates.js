(req, res) => {
	let version = 'be'
	switch (req.query.v) {
		case 'be':
			version = 'ifound-rest'
			break
		case 'fe':
			version = 'ifound-maps'
			break
		default:
			res.status(500).send({ error: 'Required param(s) missing.' })
			break
	}
	shell.cd(`/var/www/${version}`)
	if (shell.exec(`/var/www/${version}/update.sh`).code !== 0) {
		res.status(500).send({ error: 'Update failed.' })
	} else {
		res.send({ message: 'Update complete.' })
		if (version === 'fe') setTimeout(() => shell.exec('yarn build'), 1000)
		if (version === 'be') setTimeout(() => shell.exec(`/usr/local/bin/pm2 restart ${version}`), 1000)
	}
}